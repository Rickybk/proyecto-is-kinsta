import React from 'react';
import SupplierList from './ComponentesProveedores/SupplierList';
import { useState } from 'react';
import { Button } from 'antd';

function SupplierMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
      
      <div className="row">
          <Button type='primary'>Añadir Proveedor</Button>
          <SupplierList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
  );
}

export default SupplierMenu;