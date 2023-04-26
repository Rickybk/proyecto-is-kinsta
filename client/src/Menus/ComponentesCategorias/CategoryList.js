import { Space,Button,Table} from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

const { Column} = Table;
const data = [
    {
        key: '1',
        Nombre: 'Enlatados'
    },
    {
        key: '2',
        Nombre: 'Lacteos'
    },
    {
        key: '3',
        Nombre: 'Postres'
    },
];

const CategoryList = () => (
    <Table dataSource={data}>
        <Column title="Nombre" dataIndex="Nombre" key="nombreCategoria" />
        <Column
            title="Acciones"
            key="acciones"
            render={(_, record) => (
                <Space size="middle">
                    <Button name="modalEditarCat" ><EditOutlined /></Button>
                    <Button name="modalEliminarCat" ><DeleteOutlined /></Button>
                </Space>
            )}
        />
    </Table>
);
export default CategoryList;