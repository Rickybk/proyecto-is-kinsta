import { useEffect, useState } from "react";
import { List, Pagination } from 'antd';
import Producto from './CuadroProducto';

const ProductList = ({ setRefresh, isRefresh }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            //"http://localhost:8080/store/allproducts"
            //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/store/allproducts/`);
            const jsonData = await response.json();
            setProducts(jsonData);
        }
        if (isRefresh) {
            fetchData();
            setRefresh(false);
        }
    }, [setRefresh, isRefresh]);

    return (
        
            <List
                grid={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6
                }}
                pagination={{
                    onChange: page =>{
                        console.log(page);
                    },pageSize:15,
                }}
                dataSource={products}
                renderItem={(item) => (
                    <List.Item>
                        <Producto
                            idProducto={item.id_producto}
                            imagen={item.imagen}
                            title={item.nombre_producto}
                            costo={item.costo_unitario}
                            precio={item.precio_unitario}
                            cantidad={item.total}
                            fechaCaducidad={item.fecha_caducidad}
                            descripcion={item.descripcion}
                            setRefresh={setRefresh} />
                    </List.Item >
                )}
            /> 
    );
}

export default ProductList;