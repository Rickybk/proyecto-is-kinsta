import './InventarioMenu.css';
import React from 'react';
import Botons from './ComponentesInventario/ListaBotones';
import { useState } from 'react';
import ProductList from './ComponentesInventario/ProductList'

function MenuInventario() {

  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  return (
    <div>
      <div><Botons setRefresh={setRefresh}/></div>
      <div className="row">
        <ProductList setRefresh={setRefresh} isRefresh={isRefresh}/>
      </div>
    </div>
  );
}

export default MenuInventario;