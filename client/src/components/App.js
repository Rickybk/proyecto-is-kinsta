import { Layout, Menu, ConfigProvider, theme ,Affix} from 'antd';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShopOutlined, HomeOutlined, DollarCircleOutlined } from '@ant-design/icons';
import Home from '../Forms/Home';
import MenuInventario from '../Forms/InventarioMenu';

function App() {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#83563f", 
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
    const [top, setTop] = useState(0);

    return (
        <Affix offsetTop={top}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu
                style={{fontSize:16,
                }}
                onClick={({ key }) => { navigate(key) }}
                items={[
                    { label: "TIENDA J&B",icon: <image href=''/>,disabled:true },
                    { label: "Home", key: "/", icon: <HomeOutlined /> },
                    { label: "Inventario", key: "/inventario", icon: <ShopOutlined /> },
                    { label: "Transacciones", key: "/", icon: <DollarCircleOutlined /> }
                ]}>
                
            </Menu>
        </Sider>
        </Affix>
    );
}

function Content() {

    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [top, setTop] = useState(0);


    return <Layout>
        <Affix offsetTop={top}>
        <Header
            style={{
                padding: 0,
                textAlign: 'center',
                background: colorBgContainer
            }}
            className='header'
        >
            <Routes>
                <Route path="/" element={<div><h1 style={{fontSize: 50}}>Tienda J&B</h1></div>}></Route>
                <Route path="/inventario" element={<div><h1 style={{fontSize: 50}}>Inventario</h1></div>}></Route>
            </Routes>
        </Header>
        </Affix>

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