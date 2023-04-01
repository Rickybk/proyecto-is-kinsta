import { ShopOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Icon} from 'antd';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
const { Sider } = Layout;

function getItem(label, key, icon, link) {
    return {
        label,
        key,
        icon,
        link,
    };
}

const items = [
    getItem('Home',"/",<HomeOutlined />),
    getItem('Inventario','/Inventario', <ShopOutlined /> ),
];

const SideMenu = () => {

    //Para poder navegar entre rutas
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(154, 21, 34, 0.1)',
                    }}
        />
            <Menu className='menu' theme='dark'  mode="inline" items={items} 
                          onClick={({key}) =>{navigate(key)}}>
            </Menu>
        </Sider>
    );
};
export default SideMenu;