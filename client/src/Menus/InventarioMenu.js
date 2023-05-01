import './InventarioMenu.css';
import React from 'react';
import { useState } from 'react';
import ProductList from './ComponentesInventario/ProductList'

function MenuInventario() {

  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  return (
    <div>
      <div className="row">
        <ProductList setRefresh={setRefresh} isRefresh={isRefresh}/>
      </div>
    </div>
  );
}

export default MenuInventario;