import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
const data = [
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
];

const BuyList = () => (
    <Table dataSource={data}>
        <Column title="Producto" dataIndex="lastName" key="nompreProducto" />
        <Column title="Cantidad" dataIndex="age" key="cantidad" />
        <Column title="Costo (Bs.)" dataIndex="address" key="address" />
        <Column title="Fecha de caducidad" dataIndex="address" key="address" />
        <Column title="Total" dataIndex="address" key="address" />
        <Column
            title="Action"
            key="action"
            render={(_, record) => (
                <Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                </Space>
            )}
        />
    </Table>
);
export default BuyList;