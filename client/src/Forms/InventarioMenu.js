import './InventarioMenu.css';
import React from 'react';
import Botons from './ComponentesInventario/ListaBotones';
import { useState } from 'react';
import {Affix} from 'antd'
import ProductList from './ComponentesInventario/ProductList'

function MenuInventario() {

  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  return (
    <div>
      {/*
      <Affix offsetTop={50}>
        <div><Botons setRefresh={setRefresh}/></div>
    </Affix>*/}
      <div className="row">
        <ProductList setRefresh={setRefresh} isRefresh={isRefresh}/>
      </div>
    </div>
  );
}

export default MenuInventario;