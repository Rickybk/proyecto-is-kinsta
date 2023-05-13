import {Button,Table,message,Form,Popconfirm,Typography,Input} from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { useState } from 'react';

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

const SupplierList = ({setRefresh}) => {
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

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'CBN',
            referenceNumber: '78653456',
            description: 'Proveedor de bebidas',
        },
        {
            key: '2',
            name: 'EMBOL',
            referenceNumber: '78654287',
            description: 'Proveedor de bebidas',
        },
        {
            key: '3',
            name: 'Lays',
            referenceNumber: '67875432',
            description: 'Proveedor de frituras',
        },
        {
            key: '4',
            name: 'Lucana',
            referenceNumber: '69785432',
            description: 'Proveedor de frituras',
        },
        {
            key: '5',
            name: 'Pil Andina',
            referenceNumber: '77654321',
            description: 'Proveedor de lacteos',
        },
        {
            key: '6',
            name: 'Sofía',
            referenceNumber: '68754321',
            description: 'Proveedor de embutidos',
        },
    ]);

    const handleDelete = (key) => {
        // Borrar de la lista
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success("El proveedor se eliminó correctamente");
    };

    const save = async (key) => {
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
        message.success("Los datos del proveedor se modificaron correctamente");
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Número de referencia',
            dataIndex: 'referenceNumber',
            width: '25%',
            editable: true,
        },
        {
            title: 'Descrpción',
            dataIndex: 'description',
            width: '32%',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                    <Popconfirm title="¿Está seguro de guardar los cambios?" onConfirm={() => save(record.key)}>
                        <Button name="guardar" >Guardar</Button>
                    </Popconfirm>
                    <Button name="cancelar" onClick={cancel}>Cancelar</Button>
                </span>
            ) : (
                <span>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <Button name="editar" ><EditOutlined /></Button>
                    </Typography.Link>

                    <Typography.Link >
                        <Popconfirm title={"¿Está seguro de querer eliminar al proveedor?"} onConfirm={() => handleDelete(record.key)}>
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
                inputType: col.dataIndex === 'text',
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

