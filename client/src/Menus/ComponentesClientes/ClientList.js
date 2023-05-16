import { Table, Popconfirm, Button, message, Form, Typography, Input} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

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
  const inputNode = inputType === 'text' ? <Input /> :
  <Input
            style={{
                backgroundColor: "#fff6ed"
            }}
            maxLength={30}
            autoComplete='Off'
            onCopy={(Event)=>{
                Event.preventDefault();
            }}
            onPaste={(Event)=>{
                Event.preventDefault();
            }}
            onDrop={(Event)=>{
                Event.preventDefault();
            }}
            />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Por favor ingrese los datos requeridos!`,
            },
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

const ClientList = ({ setRefresh, isRefresh }) => {

  const [form] = Form.useForm();

  const [editingId_Client, setEditingId_Client] = useState('');
  const isEditing = (record) => record.id_cliente === editingId_Client;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingId_Client(record.id_cliente);

  };

  const cancel = () => {
    setEditingId_Client('');
  };

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/clients/`);
      const jsonData = await response.json();
      setDataSource(jsonData);
    }
    fetchData();
  },[]);

  const handleDelete = async (idCliente) => {
    const res = await deleteClient(idCliente);
    if (res.status === 200) {
      const newData = dataSource.filter((item) => item.id_cliente !== idCliente);
      setDataSource(newData);
      message.success("El contacto del cliente se elimino correctamente");
    } else {
      message.warning('Problemas de comunicacion con el server');
    }

  };
  
  const deleteClient = async (idCliente) => {
    const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/clients/` + idCliente, {
      method: "DELETE"
    });
    return res;
  }

  const save = async (idCliente) => {
    var res;
    const row = await form.validateFields();
    console.log(row);
    res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/clients/` + idCliente, {
      method: "PUT",
      body: JSON.stringify(row),
      headers: { "Content-Type": "application/json" }
    });

    console.log(res);
    if (res.status === 200) {
      try {

        const newData = [...dataSource];
        const index = newData.findIndex((item) => idCliente === item.id_cliente);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setDataSource(newData);
          setEditingId_Client('');
        } else {
          newData.push(row);
          setDataSource(newData);
          setEditingId_Client('');
        }
        message.success("El cliente se modificó correctamente");
      } catch (errInfo) {
        console.log('Error en la validación:', errInfo);
      }
    } else {
      message.warning('Problemas de comunicacion con el server');
    }

  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre_cliente',
      width: '15%',
      editable: true,
    },
    {
      title: 'Número Teléfono/Celular',
      dataIndex: 'num_cliente',
      width: '15%',
      editable: true,
    },
    
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>

            <Popconfirm
              title="¿Estas seguro el contacto del cliente?"
              onConfirm={async () => {
                try {
                  await save(record.id_cliente);
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
            <Typography.Link disabled={editingId_Client !== ''} onClick={() => edit(record)}>
              <Button name="editar" ><EditOutlined /></Button>
            </Typography.Link>

            <Typography.Link >
              <Popconfirm title={"¿Estas seguro de eliminar esta compra?"} onConfirm={() => handleDelete(record.id_cliente)}>
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
          col.dataIndex === "nombreCliente"
            ? "nombreCliente"
            : col.dataIndex === "numCliente"
              ? "numero"
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
        style={{width:'80%'}}
      />
    </Form>
  );

};
export default ClientList;