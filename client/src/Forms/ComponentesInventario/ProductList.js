import { useEffect, useState } from "react";
import { List, Input,Affix } from 'antd';
import Producto from './CuadroProducto';
import ProductModal from './ProductModal';
import './ListaBotones.css';

const ProductList = ({ setRefresh, isRefresh }) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    async function fetchData() {
        //"http://localhost:8080/store/allproducts"
        //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
        const response = await fetch("http://localhost:8080/store/allproducts");
        const jsonData = await response.json();
        setProducts(jsonData);
    }

    useEffect(() => {
        if (isRefresh) {
            fetchData();
            setRefresh(false);
        }
    }, [setRefresh, isRefresh]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearch(value);
      
        if (value === '') {
          fetchData();
        }else{
            const filteredData = products.filter((item) => item.nombre_producto.toLowerCase().includes(search.toLowerCase()));
            setProducts(filteredData);
        }
      };


    return (
        <>
            <Affix>
            <div className="botones">
                <ProductModal setRefresh={setRefresh}/>
                <Input
                    placeholder="Buscar Producto"
                    allowClear
                    enterButton="Buscar"
                    value={search}
                    onChange={handleInputChange}
                    style={{ width: 200,
                            left: 10
                    }}
                />
            </div>
            </Affix>

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
        </>
    );
}

export default ProductList;