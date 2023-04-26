import { useEffect, useState } from "react";
import { List, Input,Affix,Select } from 'antd';
import Producto from './CuadroProducto';
import ProductModal from './ProductModal';
import './ListaBotones.css';

const ProductList = ({ setRefresh, isRefresh }) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('default');
    
    useEffect(() => {
        if (isRefresh) {
            fetchData();
            setRefresh(false);
        }
    }, [setRefresh, isRefresh]);

    async function fetchData() {
        //"http://localhost:8080/store/allproducts"
        //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
        const response = await fetch("http://localhost:8080/store/allproducts");
        const jsonData = await response.json();
        setProducts(jsonData);
    }

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

      const handleSort = (value) => {
        setSort(value); // Actualizar el estado del criterio de ordenamiento
        let sortedData = [...products]; // Hacer una copia de la lista de productos
        if (value === 1) {
            sortedData.sort((a, b) => a.nombre_producto.localeCompare(b.nombre_producto)); // Ordenar por nombre de producto en orden ascendente
        } else if (value === 2) {
            sortedData.sort((a, b) => b.nombre_producto.localeCompare(a.nombre_producto)); // Ordenar por nombre de producto en orden descendente
        } else if (value === 3) {
            sortedData.sort((a, b) => a.precio_unitario - b.precio_unitario); // Ordenar por precio de producto en orden ascendente
        } else if (value === 4) {
            sortedData.sort((a, b) => b.precio_unitario - a.precio_unitario); // Ordenar por precio de producto en orden descendente
        }
        setProducts(sortedData); // Actualizar la lista de productos con la lista ordenada
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
                <Select
                    showSearch
                    style={{
                    width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    onChange={handleSort}
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                    {
                        value: 1,
                        label: 'A-Z',
                    },
                    {
                        value: 2,
                        label: 'Z-A',
                    },
                    {
                        value: 3,
                        label: 'Menor Precio',
                    },
                    {
                        value: 4,
                        label: 'Mayor Precio',
                    }
                    ]}
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