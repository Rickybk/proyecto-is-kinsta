import { Layout, Menu, ConfigProvider, Affix } from 'antd';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShopOutlined, DollarCircleOutlined, TagsOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import MenuInventario from '../Menus/InventarioMenu';
import Categoria from '../Menus/Categoria';
import MenuTransaccionesCompras from '../Menus/TransaccionesMenu';
import MenuTransaccionesVentas from '../Menus/TransaccionesVenta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faUsers } from '@fortawesome/free-solid-svg-icons'
import SupplierMenu from '../Menus/SupplierMenu';
import ClientMenu from '../Menus/ClientMenu';
import Logo from '../Imagenes/logo-sider2.png';
import './App.css'

function App() {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "fontSize": 15.5,
                    "colorPrimary": "#6b2c4b",
                    "colorInfo": "#ed153d",
                    "colorBgContainer": "#ecdde1",
                    "colorBgElevated": "#edd5d5",
                    "colorWarning": "#ff9966",
                    "colorError": "#eb636b",
                    "colorTextPlaceholder": "#666666",
                }
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
            <Sider classname="sider" theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className='div-logo'>
                    <img src={Logo} className='logo-sider' />
                </div>
                <Menu
                    mode="inline"
                    style={{
                        //fontSize: 16,
                        height: '100vh'
                    }}
                    onClick={({ key }) => { navigate(key) }}
                    items={[
                        { label: "Inventario", key: "/", icon: <ShopOutlined /> },
                        { label: "Categoría", key: "/categorias", icon: <TagsOutlined /> },
                        {
                            label: "Transacciones",
                            key: "/transacciones",
                            icon: <DollarCircleOutlined />,
                            children: [
                                { label: "Venta", key: "/venta", icon: <ShoppingCartOutlined /> },
                                { label: "Compra", key: "/compra", icon: <DollarCircleOutlined /> }
                            ]
                        },
                        { label: "Clientes", key: "/clientes", icon: <FontAwesomeIcon icon={faUsers} /> },
                        { label: "Proveedores", key: "/proveedores", icon: <FontAwesomeIcon icon={faTruck} /> }
                    ]}>

                </Menu>
            </Sider>
        </Affix>
    );
}

function Content() {

    const { Footer } = Layout;

    return <Layout>

        <Routes>
            <Route path="/" element={<div><MenuInventario /></div>}></Route>
            <Route path="/categorias" element={<div><Categoria /></div>}></Route>
            <Route path="/compra" element={<div><MenuTransaccionesCompras /></div>}></Route>
            <Route path="/venta" element={<div><MenuTransaccionesVentas /></div>}></Route>
            <Route path="/clientes" element={<div><ClientMenu /></div>}></Route>
            <Route path="/proveedores" element={<div><SupplierMenu /></div>}></Route>
        </Routes>

        <Footer style={{textAlign: 'center'}}>
            Tienda J&B ©2023 Created by Team Lagartos
        </Footer>

    </Layout>;
}

export default App;