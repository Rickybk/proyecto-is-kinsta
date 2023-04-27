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
    const inputNode = inputType === 'text' ? <Input/> : 
    <Input 
    style={{
      backgroundColor:"#fff6ed"
    }}
    onKeyDown={validation} 
    maxLength={30}/>;
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
                message: `Ingrese el nombre de la categoría!`,
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
  const validation = (e) => {
        
    const key = e.key;
    if (!(/^[A-Z a-z À-ÿ\u00f1\u00d1]+$/.test(key) 
        || key === 'Backspace' 
        || key === 'Delete' 
        || key === 'Tab' 
        || key=== 'ArrowLeft' 
        || key=== 'ArrowRight' ))
    {
        e.preventDefault();
    }
};

const BuyList = ({ setRefresh }) => {

    const [form] = Form.useForm();

 
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
        name: '',
        ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        fetchBuys();
    },[]);

    async function fetchBuys() {
        const response = await fetch("http://localhost:8080/store/products/allbuy/1");
        const jsonData = await response.json();
        setDataSource(jsonData);
    }

    const handleDelete = (key) => {
        // Borrar bd
        // Borrar de la lista
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success("La compra se elimino correctamente");
    };
    const save = async (key) => {
        // base DB
        try {
        const row = await form.validateFields();
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            setDataSource(newData);
            setEditingKey('');
        } else {
            newData.push(row);
            setDataSource(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
        console.log('Error en la validación:', errInfo);
        }
        message.success("La compra se modificó correctamente");
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
            width: '15%',
            editable: true,
        },
        {
            title: 'Costo unitario(Bs.)',
            dataIndex: 'costo_unitario',
            width: '15%',
            editable: false,
        },
        {
            title: 'Fecha de caducidad',
            dataIndex: 'fecha_caducidad',
            width: '15%',
            editable: true,
        },
        {
            title: 'Costo total',
            dataIndex: 'costo_total',
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
                <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
                >
                <Popconfirm title="¿Está seguro de guardar los cambios?" onConfirm={save}>
                    <Button name="guardar" >Guardar</Button>
                </Popconfirm>
                </Typography.Link>
                <Button name="cancelar" onClick={cancel}>Cancelar</Button>
            </span>
            ) : (
            <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <Button name="editar" ><EditOutlined /></Button>
                </Typography.Link>

                <Typography.Link >
                    <Popconfirm title={"¿Estas seguro de eliminar esta compra?"} onConfirm={()=>handleDelete(record.key)}>
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
            inputType: col.dataIndex === 'text',
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