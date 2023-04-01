import Casa from '../Home.js';
import ModalProducto from '../Forms/FormProductModal'
import { ShopOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, link) {
    return {
        label,
        key,
        icon,
        link,
    };
}

const items = [
    getItem('Home', "/", <HomeOutlined />),
    getItem('Inventario', '/Inventario', <ShopOutlined />),
];

var comp = null;

const SideMenu = () => {

    //Para poder navegar entre rutas
    const navigate = useNavigate();

    function mostrarComp(key) {
        console.log(key)
        switch (key) {
            case "/":
                comp = <Casa />;
                break;
            case "/Inventario":
                comp = <ModalProducto />;
                break;
            default:
                comp = null;
                break;
        }
    }

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu  mode="inline" items={items}
                        onClick={({ key }) => { navigate(key); mostrarComp(key) }}>
                    </Menu>
                </Sider>

                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >

                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        {comp}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Tienda J&B ©2023 Created by Team Lagartos
                    </Footer>
                </Layout>
            </Layout>
        
    );
};
export default SideMenu;