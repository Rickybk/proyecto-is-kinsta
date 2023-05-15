import { Table, Popconfirm, Button, message, Form, Typography, Input, DatePicker, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import moment from "moment";


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =  inputType === "number" ? (
    <Form.Item
      style={{ margin: 0, backgroundColor: 'white' }}
      name={dataIndex}
      rules={[

        {
          validator: (_, value) => {
            const isValidNumber = /^[0-9]+([.][0-9]+)?$/.test(value);
            if (isValidNumber) {
              return Promise.resolve();
            }
            return Promise.reject('Por favor ingrese un valor valido');
          },
        },
      ]}


    >
      <InputNumber
        style={{ width: '100%', margin: '0 auto', textAlign: 'center'}}
        prefix="Bs."
        className="inputNumber"
        id="precio"
        min={1}
        maxLength={9}
        precision={2}
        step={0.5}
        onKeyDown={DecimalInput} />
    </Form.Item>
  ) : (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `Por favor llene el campo  ${title}!`,
        },
      ]}
    >
      <InputNumber
        min={1}
        style={{
          backgroundColor: "#fff6ed",
          width: '100%', margin: '0 auto', textAlign: 'center'
        }}
        onKeyDown={validation}
        maxLength={6}
      />

    </Form.Item>
  );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0, backgroundColor: "#ffffff"
          }}
          rules={[
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const DecimalInput = (e) => {

  const key = e.key;
  if (!(/^[0-9.]+$/.test(key)
    || key === 'Backspace'
    || key === 'Delete'
    || key === 'Tab'
    || key === 'ArrowLeft'
    || key === 'ArrowRight')) {
    e.preventDefault();
  }
};

const validation = (e) => {

  const key = e.key;
  if (!(/^[0-9]+$/.test(key)
    || key === 'Backspace'
    || key === 'Delete'
    || key === 'Tab'
    || key === 'ArrowLeft'
    || key === 'ArrowRight')) {
    e.preventDefault();
  }
};

const validationf = (e) => {

  const key = e.key;
  if (!(/^[0-9-]+$/.test(key)
    || key === 'Backspace'
    || key === 'Delete'
    || key === 'Tab'
    || key === 'ArrowLeft'
    || key === 'ArrowRight')) {
    e.preventDefault();
  }
};

const ClientList = ({ }) => {

  const [form] = Form.useForm();


  const [editingid_lote, setEditingid_lote] = useState('');
  const isEditing = (record) => record.id_lote === editingid_lote;
  const edit = (record) => {
    record.fecha_caducidad = record.fecha_caducidad ? dayjs(record.fecha_caducidad).format('YYYY-MM-DD') : "";
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
    if (row.fecha_caducidad === '') {
      row.fecha_caducidad = null;
    }
    //Ruta para server en localhost: "http://localhost:8080/store/products/buy/"
    //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/buy/`
    res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/buy/` + id_lote, {
      method: "PUT",
      body: JSON.stringify(row),
      headers: { "Content-Type": "application/json" }
    });

    //fetchBuys();
    if (res.status === 200) {
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

      message.success("La compra se modificó correctamente");
    } else {
      message.warning('Problemas de comunicaion con el server');
    }

  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre_producto',
      width: '15%',
      editable: false,
    },
    {
      title: 'Número Teléfono/Celular',
      dataIndex: 'cantidad',
      width: '15%',
      editable: true,
    },
    
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>

            <Popconfirm
              title="¿Estas seguro el contacto del cliente?"
              onConfirm={async () => {
                try {
                  await save(record.id_lote);
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
export default ClientList;