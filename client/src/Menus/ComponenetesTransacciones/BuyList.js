import { Table, Popconfirm, Button, message, Form, Typography, Input} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';



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
    onid_loteDown={validation} 
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
                message: `llene el campo por favor!`,
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

 
    const [editingid_lote, setEditingid_lote] = useState('');
    const isEditing = (record) => record.id_lote === editingid_lote;
    const edit = (record) => {
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
        fetchBuys();
    },[]);

    async function fetchBuys() {
        const response = await fetch("http://localhost:8080/store/products/allbuy/1");
        const jsonData = await response.json();
        setDataSource(jsonData);
    }

    const handleDelete = async (id_lote) => {
        // Borrar bd
        await deleteProductDB(id_lote);
        // Borrar de la lista
        const newData = dataSource.filter((item) => item.id_lote !== id_lote);
        setDataSource(newData);
        message.success("La compra se elimino correctamente");
    };
    const deleteProductDB = async (id_lote) => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        const res = await fetch("http://localhost:8080/store/products/buy/" + id_lote, {
            method: "DELETE"
        });
        return res;
    }

    const save = async (id_lote) => {
        // base DB
        try {
        const row = await form.validateFields();
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
            render: (fecha) => dayjs(fecha).format('YYYY-MM-DD')
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
                onClick={() => save(record.id_lote)}
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
                <Typography.Link disabled={editingid_lote !== ''} onClick={() => edit(record)}>
                    <Button name="editar" ><EditOutlined /></Button>
                </Typography.Link>

                <Typography.Link >
                    <Popconfirm title={"¿Estas seguro de eliminar esta compra?"} onConfirm={()=>handleDelete(record.id_lote)}>
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