import React from 'react';
import SupplierList from './ComponentesProveedores/SupplierList';
import { useState } from 'react';
import SupplierModal from './ComponentesProveedores/SupplierModal';

function SupplierMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
      
      <div className="row">
           <SupplierModal setRefresh={setRefresh}></SupplierModal>
          <SupplierList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
  );
}

export default SupplierMenu;