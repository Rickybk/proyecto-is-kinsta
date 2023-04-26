import { Space, Table, Popconfirm, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteBuyModal from './DeleteBuyModal'
import { useState } from 'react';

const { Column } = Table;

const BuyList = ({ setRefresh }) => {

    const [deleteModal, setDelete] = useState(false);

    const openDeleteModal = () => {
        setDelete(true);
    }

    const closeDeleteModal = () => {
        setDelete(false);
    }

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ]);

    const handleDelete = (key) => {
        // Borrar bd
        // Borrar de la lista
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success("La compra se elimino correctamente");
    };

    return (
        <Table dataSource={dataSource}>
            <Column title="Producto" dataIndex="lastName" key="nompreProducto" />
            <Column title="Cantidad" dataIndex="age" key="cantidad" />
            <Column title="Costo (Bs.)" dataIndex="address" key="address" />
            <Column title="Fecha de caducidad" dataIndex="address" key="address" />
            <Column title="Total" dataIndex="address" key="address" />
            <Column
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button name="modalEditarCat" ><EditOutlined /></Button>

                        <Popconfirm title="¿Estas seguro de eliminar esta compra?" onConfirm={() => handleDelete(record.key)}>
                            <Button name="modalEliminarCat" onClick={openDeleteModal}><DeleteOutlined /></Button>
                        </Popconfirm>
                        <DeleteBuyModal
                            isModalOpen={deleteModal}
                            closeDeleteModal={closeDeleteModal}
                            setRefresh={setRefresh}
                            record={record.key}
                        />
                    </Space>
                )}
            />
        </Table>
    );

};
export default BuyList;