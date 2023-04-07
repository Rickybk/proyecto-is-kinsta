import { useEffect, useState } from "react";
import { List } from 'antd';
import Producto from './CuadroProducto';

const ProductList = ({setRefresh, isRefresh}) => {

    const [products, setProducts] = useState([]);

    /*useEffect(() => {
        fetch("http://localhost:8080/store/allproducts")
            .then((res) => {
                return res.json;
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log("Error en fetch: ", error);
            });
    }, []);*/

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8080/store/allproducts");
            const jsonData = await response.json();
            setProducts(jsonData);
        }
        if(isRefresh){
            fetchData();
            setRefresh(false);
        } 
    }, [setRefresh, isRefresh]);

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 6
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
                        descripcion={item.descripcion}
                        setRefresh={setRefresh} />
                </List.Item>
            )}
        />
    );
}

export default ProductList;