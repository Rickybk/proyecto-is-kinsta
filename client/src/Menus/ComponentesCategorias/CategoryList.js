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
  const inputNode = inputType === 'text' ? <Input /> : <Input />;
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


const CategoryList = ({setRefresh}) => {
    const [form] = Form.useForm();

    const handleDelete = (key) => {
        // Borrar bd
        // Borrar de la lista
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        message.success("La categoría se eliminó correctamente");
    };

    const [data, setData] = useState([
        {
            key: '1',
            name: 'Enlatados',
        },
        {
            key: '2',
            name: 'Lácteos',
        },
        {
            key: '3',
            name: 'Postres',
        },
        {
            key: '4',
            name: 'Dulces',
        },
        {
            key: '5',
            name: 'Refrescos',
        },
        {
            key: '6',
            name: 'Bebidas Alcoholicas',
        },
    ]);
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
    const save = async (key) => {
        try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            setData(newData);
            setEditingKey('');
        } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
        console.log('Error en la validación:', errInfo);
        }
        message.success("La categoría se modificó correctamente");
    };




    const columns = [
        {
        title: 'Nombre',
        dataIndex: 'name',
        width: '25%',
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
                <Popconfirm title="¿Está seguro de querer cancelar?" onConfirm={cancel}>
                    <Button name="cancelar" >Cancelar</Button>
                </Popconfirm>
            </span>
            ) : (
            <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <Button name="editar" ><EditOutlined /></Button>
                </Typography.Link>

                <Typography.Link >
                    <Popconfirm title={"¿Está seguro de querer eliminar la categoría?"} onConfirm={()=>handleDelete(record.key)}>
                    <Button name="eliminar" ><DeleteOutlined /></Button>
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
            components={{
            body: {
                cell: EditableCell,
            },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
            onChange: cancel,
            }}
        />
        </Form>
  );

}
export default CategoryList;