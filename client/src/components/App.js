import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShopOutlined, HomeOutlined } from '@ant-design/icons';
import Home from '../Forms/Home';
import MenuInventario from '../Forms/InventarioMenu';

function App() {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#CDABA2", 
                    "colorPrimaryBorder": "#4da8cf",
                    "colorPrimaryBorderHover": "#abdefa",
                    "colorSuccess": "#b86fd6",
                    "colorWarning": "#ff9966",
                    "colorError": "#eb636b",
                    "colorInfo": "#77ddec",
                    "colorBgContainer": "#E7D5C7", 
                    "colorBgElevated": "#f5e5d0", 
                    "colorBgLayout": "#F8EDE3" 
                } 
                //algorithm: theme.darkAlgorithm
            }}
        >
            <AppLayout />
        </ConfigProvider>
    );
}

function AppLayout() {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideMenu />
            <Content />
        </Layout>
    );
}

function SideMenu() {

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { Sider } = Layout;

    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu
                onClick={({ key }) => { navigate(key) }}
                items={[
                    { label: "Home", key: "/", icon: <HomeOutlined /> },
                    { label: "Inventario", key: "/inventario", icon: <ShopOutlined /> }
                ]}>
            </Menu>
        </Sider>
    );
}

function Content() {

    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return <Layout>
        <Header
            style={{
                padding: 0,
                textAlign: 'center',
                background: colorBgContainer
            }}
        >
            <Routes>
                <Route path="/" element={<div><h1 style={{fontSize: 50}}>Tienda J&B</h1></div>}></Route>
                <Route path="/inventario" element={<div><h1 style={{fontSize: 50}}>Inventario</h1></div>}></Route>
            </Routes>
        </Header>

        <Content>
            <Routes>
                <Route path="/" element={<div><Home /></div>}></Route>
                <Route path="/inventario" element={<div><MenuInventario /></div>}></Route>
            </Routes>
        </Content>

        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Tienda J&B ©2023 Created by Team Lagartos
        </Footer>
    </Layout>;
}

export default App;