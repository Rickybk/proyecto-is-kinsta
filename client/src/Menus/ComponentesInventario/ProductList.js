import { useEffect, useState, useRef } from "react";
import { List, Input,Affix,Select } from 'antd';
import Producto from './CuadroProducto';
import ProductModal from './ProductModal';
import './ListaBotones.css';

const {Option} = Select;

const ProductList = ({ setRefresh, isRefresh }) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const [sort, setSort] = useState('default');
    const [categoria, setCategoria] = useState([]);
    const [elegido, setElegido] = useState(1);
    //Para el Affix
    const myRef = useRef(null);
    const [y, setY] = useState(0);


    useEffect(() => {
        if (isRefresh) {
            const miElemento = myRef.current;
            if (miElemento) {
            const rect = miElemento.getBoundingClientRect();
            setY(rect.top);
            }
            fetchCategoria();
            if(elegido !== null && elegido !== undefined){
                handleCategoria(elegido);
            }else{
                fetchData();
            }      
            setRefresh(false);    
        }    
        
    }, [elegido, setElegido, setRefresh, isRefresh]);

    async function fetchData() {
        //"http://localhost:8080/store/allproducts"
        //`${process.env.REACT_APP_SERVERURL}/store/allproducts/`
        const response = await fetch("http://localhost:8080/store/allproducts");
        const jsonData = await response.json();
        setProducts(jsonData);
    }

    async function fetchCategoria(){
        const response = await fetch("http://localhost:8080/store/categories");
        const jsonData = await response.json();
        setCategoria([{id_categoria: 1, nombre_categoria: "TODOS"}, ...jsonData]);
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

    async function handleCategoria(value){
        setElegido(value);
        if(value === 1){
            await fetchData();
        } else {
        const response = await fetch("http://localhost:8080/store/productsCategoria/" + value);
        const jsonData = await response.json();
        setProducts(jsonData);
        }
    }

    function handleForm(value){
        setElegido(value);
    }

    return (
        <>
            <div className="botones" ref={myRef}>
                <ProductModal setRefresh={setRefresh} elegido={elegido} setElegido={handleForm}/>
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
                    placeholder="Ordenar por..."
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
                <Select
                    showSearch
                    style={{
                    width: 200,
                    }}
                    value={elegido}
                    placeholder="Seleccionar Categoria"
                    optionFilterProp="children"
                    onChange={handleCategoria}
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                >  
                    {categoria.map(cat =>(
                        <Option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.nombre_categoria}
                        </Option>
                    ))}
                </Select>
            </div>


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
                            idCategoria={item.id_categoria}
                            fechaCaducidad={item.fecha_caducidad}
                            descripcion={item.descripcion}
                            setRefresh={setRefresh} 
                            setElegido={setElegido}
                        />
                    </List.Item >
                )}
            /> 
        </>
    );
}

export default ProductList;