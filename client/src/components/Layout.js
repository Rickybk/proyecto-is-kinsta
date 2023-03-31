import { ShopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';

import ProductModal from './ProductModal'

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Inventario', '1', <ShopOutlined />),
];

const App = () => {

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
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
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
                    <ProductModal />
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
export default App;