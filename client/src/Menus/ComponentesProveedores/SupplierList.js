import {Button,Table,message,Form,Popconfirm,Typography,Input, InputNumber} from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import './SupplierList.css';

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
  const inputNode = inputType === 'text' ? 
  (
    <Form.Item
        className="SupplierInput"
        style={{ margin: 0, backgroundColor: '#fff6ed' }}
        name={dataIndex}
        rules={[
            {
                required: true,
                message: `Ingrese el nombre del proveedor!`,
            },
        ]}
    >
      <Input
        style={{ width: '100%'}}
        className="SupplierInput"
        id="descripcion"
        maxLength={20}
        onKeyDown={validationText} 
        />
    </Form.Item>
  ) : inputType=== "number" ?(
    <Form.Item
        className="SupplierInput"
      style={{ margin: 0, backgroundColor: "#ffffff" }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `Ingrese el ${title}!`,
        },
      ]}
    >
      <InputNumber
        min={4000000}
        id='telf'
        className="SupplierInput"
        style={{
          backgroundColor: "#ffffff",
          width: '100%', margin: '0 auto', textAlign: 'center'
        }}
        onKeyDown={validationNumber}
        minLength={7}
        maxLength={8}
      />

    </Form.Item>
  ): inputType=== "text2" ?(
    <Form.Item
        className="SupplierInput"
      style={{ margin: 0, backgroundColor: '#fff6ed' }}
      name={dataIndex}
      rules={[
        {
            required: false,
        },
      ]}
    >
      <Input
        style={{ width: '100%', backgroundColor:'#fff6ed'}}
        className="SupplierInput"
        id="descripcion"
        maxLength={40}
        />
    </Form.Item>
  ):(
    <Form.Item
        className="SupplierInput"
      style={{ margin: 0, backgroundColor: '#fff6ed' }}
      name={dataIndex}
      rules={[
        {
            required: false,
        },
      ]}

    >
      <Input
        style={{ width: '100%', backgroundColor:'#fff6ed'}}
        className="SupplierInput"
        id="descripcion"
        maxLength={40}
        />
    </Form.Item>
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const validationNumber = (e) => {
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
const validationText = (e) => {
    const key = e.key;
    if (!(/^[A-Z a-z À-ÿ - # % $ ' -]+$/.test(key)
        || key === 'Backspace'
        || key === 'Delete'
        || key === 'Tab'
        || key === 'ArrowLeft'
        || key === 'ArrowRight')) {
        e.preventDefault();
    }
};

const SupplierList = ({setRefresh, isRefresh}) => {
    const [form] = Form.useForm();
    const aux = useState(isRefresh);
    const [editingId_Proveedor, setEditingId_Proveedor] = useState('');
    const isEditing = (record) => record.id_proveedor === editingId_Proveedor;
    const edit = (record) => {
        form.setFieldsValue({
        name: '',
        referenceNumber:'',
        description:'',
        ...record,
        });
        setEditingId_Proveedor(record.id_proveedor);
    };

    const cancel = () => {
        setEditingId_Proveedor('');
    };

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/providers/`);
          const jsonData = await response.json();
          setDataSource(jsonData);
        }
        fetchData();
      },[aux, dataSource, setDataSource]);


      const handleDelete = async (idProvider) => {
        const res = await deleteProvider(idProvider);
        if (res.status === 200) {
          const newData = dataSource.filter((item) => item.id_proveedor !== idProvider);
          setDataSource(newData);
          message.success("El contacto del proveedor se eliminó correctamente");
        } else {
          message.warning('Problemas de comunicación con el server');
        }
    
      };
      
      const deleteProvider = async (idProvider) => {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/providers/` + idProvider, {
          method: "DELETE"
        });
        return res;
      }
    
      const updateProviderDB = async (id_proveedor, row) => {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/providers/` + id_proveedor, {
            method: "PUT",
            body: JSON.stringify(row),
            headers: { "Content-Type": "application/json" }
        });
        return res;
    }

    const save = async (idProvider) => {
        try {
            const row = await form.validateFields();
            const res = await updateProviderDB(idProvider, row);
            const jsonData = await res.json();
            if (jsonData.data === 1) {
                message.error("El proveedor " + row['nombre_proveedor'] + " ya existe ");
            } else {
                const newData = [...dataSource];
                const index = newData.findIndex((item) => idProvider === item.id_proveedor);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setDataSource(newData);
                    setEditingId_Proveedor('');
                } else {
                    newData.push(row);
                    setDataSource(newData);
                    setEditingId_Proveedor('');
                }
                message.success("Los datos del proveedor se modificaron correctamente");
            }
        } catch (errInfo) {
            console.log('Error en la validación:', errInfo);
        }
        

    };

    
    const columns = [
        {
            title: 'Nombre del proveedor',
            dataIndex: 'nombre_proveedor',
            width: '25%',
            editable: true,
        },
        {
            title: 'Número de Teléfono/Celular',
            dataIndex: 'num_proveedor',
            width: '15%',
            editable: true,
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion_proveedor',
            width: '32%',
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
                    <Popconfirm title="¿Está seguro de guardar los cambios?" onConfirm={() => save(record.id_proveedor)}>
                        <Button name="guardar" >Guardar</Button>
                    </Popconfirm>
                    <Button name="cancelar" onClick={cancel}>Cancelar</Button>
                </span>
            ) : (
                <span>
                    <Typography.Link disabled={editingId_Proveedor !== ''} onClick={() => edit(record)}>
                        <Button name="editar" ><EditOutlined /></Button>
                    </Typography.Link>

                    <Typography.Link >
                        <Popconfirm title={"¿Está seguro de querer eliminar al proveedor?"} onConfirm={() => handleDelete(record.id_proveedor)}>
                            <Button name="eliminar"><DeleteOutlined /></Button>
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
                inputType 
                :col.dataIndex === 'num_proveedor' ? 'number'
                :col.dataIndex === 'descripcion_proveedor' ? 'text2'
                :col.dataIndex === 'nombre_proveedor' ? 'text':'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
        <Table
            style={{
                marginRight: "10%",
                marginTop: "2%"
            }}
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
                onChange: page => {
                }, pageSize: 10,
            }}
        />
        </Form>
  );
}
export default SupplierList;


