import './InventarioMenu.css';
import React from 'react';
import Botons from './ComponentesInventario/ListaBotones';
import Productos from './ComponentesInventario/CuadroProducto';
import { useState, useEffect } from 'react';

function MenuInventario(){

    const [archivo,setArchivo] = useState([]);
    const [prevData, setPrevData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch("http://localhost:8080/store/allproducts");
        const jsonData = await response.json();
        // Verificar si los datos son diferentes
        if (JSON.stringify(prevData) !== JSON.stringify(jsonData)) {
          // Hacer algo cuando los datos cambian
          setPrevData(archivo);
          setArchivo(jsonData);
          console.log('cambia');
        }
      }
      fetchData();
    },[archivo,prevData]);

    return(
        <div>
            <div><Botons/></div>
            <div className="row">
              {
                archivo.map((dato) => (
                  <div key={dato.id_producto}>
                          {console.log(dato)}
                          <Productos idProducto={dato.id_producto} imagen={dato.imagen} title={dato.nombre_producto}  precio={dato.precio_unitario} cantidad={dato.total}/>
                    </div> 
                ))      
              }
            </div>
        </div>
    );
}

export default MenuInventario;