import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';

function ProveedorMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
      
      <div className="row">
          <Button>Añadir Proveedor</Button>
      </div>
  );
}

export default ProveedorMenu;