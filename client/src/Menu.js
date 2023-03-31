import { HomeOutlined,ShopOutlined,ContactsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Menu.css';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
    getItem('Tienda J&B','tnd',null,[
      getItem('Home','home',<HomeOutlined />),
      getItem('Inventario', 'inventario',<ShopOutlined/>),
      getItem('Proovedores','proovedores',<ContactsOutlined />)    
      
    ],'group')
    
];

const MenuDesplegable = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      className="menu"
    />
  );
};
export default MenuDesplegable;