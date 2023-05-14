import { Table, Popconfirm, Button, message, Form, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import moment from "moment";

import EditableCell from "./EditableCell";

const BuyList = ({}) => {

  const [form] = Form.useForm();


  const [editingid_lote, setEditingid_lote] = useState('');
  const isEditing = (record) => record.id_lote === editingid_lote;
  const edit = (record) => {
    record.fecha_compra = record.fecha_compra ? dayjs(record.fecha_compra).format('YYYY-MM-DD') : "";
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingid_lote(record.id_lote);

  };

  const cancel = () => {
    setEditingid_lote('');
  };

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/allbuy/1`);
      const jsonData = await response.json();
      for (var clave in jsonData){
        jsonData[clave]['fecha_caducidad'] = moment(jsonData[clave]['fecha_caducidad']).add(1,'day');
        jsonData[clave]['fecha_compra'] = moment(jsonData[clave]['fecha_compra']).add(1,'day');
      }
      setDataSource(jsonData);
    }
    fetchData();
  },[]);

  const handleDelete = async (id_lote) => {
    const res = await deleteProductDB(id_lote);
    if (res.status === 200) {
      const newData = dataSource.filter((item) => item.id_lote !== id_lote);
      setDataSource(newData);
      message.success("La compra se elimino correctamente");
    } else {
      message.warning('Problemas de comunicaion con el server');
    }

  };
  
  const deleteProductDB = async (id_lote) => {
    //Ruta para server en localhost: "http://localhost:8080/store/products/buy/"
    //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/buy/`
    const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/buy/` + id_lote, {
      method: "DELETE"
    });
    return res;
  }

  const save = async (id_lote) => {
    var res;
    const row = await form.validateFields();

    let numero = (row.costo_total/row.cantidad).toFixed(2);
    row.costo_unitario = numero;
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log(row);
    //Ruta para server en localhost: "http://localhost:8080/store/products/buy/"
    //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/buy/`
    //res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/buy/` + id_lote, {
    //  method: "PUT",
      //body: JSON.stringify(row),
      //headers: { "Content-Type": "application/json" }
    //});

    //if (res.status === 200) {
      try {

        const newData = [...dataSource];
        const index = newData.findIndex((item) => id_lote === item.id_lote);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setDataSource(newData);
          setEditingid_lote('');

        } else {            
          newData.push(row);
          setDataSource(newData);
          setEditingid_lote('');
        }
      } catch (errInfo) {
        console.log('Error en la validación:', errInfo);
      }

      //message.success("La compra se modificó correctamente");
    //} else {
      //message.warning('Problemas de comunicaion con el server');
    //}

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
      dataIndex: 'cantidad',
      width: '10%',
      editable: true,
    },
    {
      title: 'Precio unitario(Bs.)',
      dataIndex: 'costo_unitario',
      width: '13%',
      editable: false,
    },
    {
      title: 'Fecha de venta',
      dataIndex: 'fecha_compra',
      width: '12%',
      editable: false,
      render: (fecha) => dayjs(fecha).format('YYYY-MM-DD')
    },
    {
      title: 'Precio total(Bs.)',
      dataIndex: 'costo_total',
      width: '12%',
      editable: true,
    },
    {
        title: 'Cliente',
        dataIndex: 'cliente',//completar luego
        width: '15%',
        editable: true,
    },
    {
        title: 'Pago',
        dataIndex: 'id_lote',//completar luego
        width: '10%',
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
              title="¿Estas seguro de editar la compra?"
              onConfirm={async () => {
                try {
                  await save(record.id_lote);
                } catch (error) {
                  //console.error(error);
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
            <Typography.Link disabled={editingid_lote !== ''} onClick={() => edit(record)}>
              <Button name="editar" ><EditOutlined /></Button>
            </Typography.Link>

            <Typography.Link >
              <Popconfirm title={"¿Estas seguro de eliminar esta compra?"} onConfirm={() => handleDelete(record.id_lote)}>
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
          col.dataIndex === "costo_total"
            ? "number"
            : col.dataIndex === "fecha_caducidad"
            ? "date"
            : col.dataIndex === "id_lote"
            ? "pago"
            : col.dataIndex === "cliente"
            ? "cliente"
            : col.dataIndex === "fecha_compra"
            ? "date"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });




  return (
    <Form form={form} component={false}>
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
      />
    </Form>
  );

};
export default BuyList;