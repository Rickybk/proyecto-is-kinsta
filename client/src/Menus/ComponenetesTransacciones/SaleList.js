import { Table, Popconfirm, Button, message, Form, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import moment from "moment";

import EditableCell from "./EditableCell";

const { Search } = Input;

const SaleList = ({ setRefresh, isRefresh }) => {

  const aux = useState(isRefresh);
  const [search, setSearch] = useState('');

  const [form] = Form.useForm();


  const [editingid_venta, setEditingid_venta] = useState('');
  const isEditing = (record) => record.id_venta === editingid_venta;
  const edit = (record) => {
    record.fecha_compra = record.fecha_compra ? dayjs(record.fecha_compra).format('YYYY-MM-DD') : "";
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingid_venta(record.id_venta);

  };

  const cancel = () => {
    setEditingid_venta('');
  };

  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCliente, setDataSourceCliente] = useState([]);


  useEffect(() => {
    if (isRefresh) {
      fetchData();
      setRefresh(false);
  }
  } ,[aux, dataSource, setDataSource]);


  useEffect(() => {
    if (isRefresh) {
      fetchData2();
      setRefresh(false);
  }
  } ,[]);

  async function fetchData() {
    //http://localhost:8080/store/products/allsales/1
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/allsales/1`);
    const jsonData = await response.json();
    for (var clave in jsonData){
      jsonData[clave]['fecha_venta'] = moment(jsonData[clave]['fecha_venta']).add(1,'day');
      jsonData[clave]['tipo_venta'] = jsonData[clave]['tipo_venta'] === 1 ? 'Contado' : 'Credito';
    }
    setDataSource(jsonData);
  }
  async function fetchData2() {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/clients/`);
    const jsonData = await response.json();
    setDataSourceCliente(jsonData);
  }

  const handleDelete = async (id_venta) => {
    const res = await deleteProductDB(id_venta);
    if (res.status === 200) {
      const newData = dataSource.filter((item) => item.id_venta !== id_venta);
      setDataSource(newData);
      message.success("La venta se elimino correctamente");
    } else {
      message.warning('Problemas de comunicaion con el server');
    }

  };
  
  const deleteProductDB = async (id_venta) => {
    const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/sales/` + id_venta, {
      method: "DELETE"
    });
    return res;
  }

  const save = async (id_venta) => {
    var res;
    const row = await form.validateFields();
    let tipoVenta = 2;
    if(row.tipo_venta === 'Contado'){
      tipoVenta = 1;
    }
    const elementoEncontrado = dataSource.find(item => item.id_venta === id_venta);
    let precioUnitario;
    if (elementoEncontrado) {
      precioUnitario = elementoEncontrado.precio_unitario;
      row.precio_total=precioUnitario*row.cantidad_venta;
    }
    res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/sales/` + id_venta+`/`+tipoVenta, {
      method: "PUT",
      body: JSON.stringify(row),
      headers: { "Content-Type": "application/json" }
    });

    if (res.status === 200) {
      try {

        const newData = [...dataSource];
        const index = newData.findIndex((item) => id_venta === item.id_venta);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setDataSource(newData);
          setEditingid_venta('');

        } else {            
          newData.push(row);
          setDataSource(newData);
          setEditingid_venta('');
        }
      } catch (errInfo) {
        console.log('Error en la validación:', errInfo);
      }

      message.success("La venta se modificó correctamente");
    } else {
      message.warning('Problemas de comunicaion con el server');
    }

  };

  const getTipoVenta = (value) => {
    if (value === 1 || value === 'Contado') {
      return 'Contado';
    } else if (value === 2 || value === 'Credito') {
      return 'Credito';
    } else {
      return 'La base de datos tiene un valor corupto';
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  
    if (value === '') {
      fetchData();
    } else {
      const filteredData = dataSource.filter((item) =>
        item.nombre_producto.toLowerCase().includes(value.toLowerCase())
      );
      setDataSource(filteredData);
    }
  };


  const columns = [
    {
      title: 'Producto',
      dataIndex: 'nombre_producto',
      width: '15%',
      editable: false,
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad_venta',
      width: '10%',
      editable: true,
    },
    {
      title: 'Precio unitario(Bs.)',
      dataIndex: 'precio_unitario',
      width: '13%',
      editable: false,
    },
    {
      title: 'Fecha de venta',
      dataIndex: 'fecha_venta',
      width: '12%',
      editable: false,
      render: (fecha) => dayjs(fecha).format('YYYY-MM-DD')
    },
    {
      title: 'Precio total(Bs.)',
      dataIndex: 'precio_total',
      width: '12%',
      editable: false,
    },
    {
        title: 'Cliente',
        dataIndex: 'nombre_cliente',
        width: '15%',
        editable: true,
    },
    {
      title: 'Tipo venta',
      dataIndex: 'tipo_venta',
      width: '10%',
      render: (value) => getTipoVenta(value),
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>

            <Popconfirm
              title="¿Estas seguro de editar la venta?"
              onConfirm={async () => {
                try {
                  await save(record.id_venta);
                } catch (error) {
                  console.error(error);
                  message.error("Por favor asegúrese que los valores en los campos sean correctos");
                }
              }}
              placement="bottom"
            >
              <Button name="guardar" >Guardar</Button>
            </Popconfirm>

            <Button name="cancelar" onClick={cancel}>Cancelar</Button>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingid_venta !== ''} onClick={() => edit(record)}>
              <Button name="editar" ><EditOutlined /></Button>
            </Typography.Link>

            <Typography.Link >
              <Popconfirm title={"¿Estas seguro de eliminar esta venta?"} onConfirm={() => handleDelete(record.id_venta)}>
                <Button name="eliminar"
                ><DeleteOutlined /></Button>
              </Popconfirm>
            </Typography.Link>
          </span>

        )
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "precio_total"
            ? "number"
            : col.dataIndex === "fecha_venta"
            ? "date"
            : col.dataIndex === "tipo_venta"
            ? "pago"
            : col.dataIndex === "nombre_cliente"
            ? "cliente2"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        dataSourceCliente,
        editing: isEditing(record),
      }),
    };
  });




  return (
    <div
      style={{width: '90%'}}
    >
      <Search
              className='search'
              placeholder="Buscar producto"
              bordered={false}
              onChange={handleInputChange}
              style={{
                display:'flex',
                  width: 200,
                  border: '2px solid #d9d9d9',
                  borderRadius: 8,
                  backgroundColor: 'white' 
                  
              }}
              maxLength='20'
            />
      
        <Form form={form} component={false}
        >
          <Table className='tabla'
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
            style={{width:'100%',
                    left:'-20%'
           }}
          />
        </Form>
    </div>
  );

};
export default SaleList;