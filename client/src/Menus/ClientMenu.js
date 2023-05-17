import React from 'react';
import { useState } from 'react';
import { Button, Input } from 'antd';
import ClientList from './ComponentesClientes/ClientList';
const { Search } = Input;



function ClientMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
    
      <div className="row" style={{display:'flex'}}>
          <ClientList setRefresh={setRefresh} isRefresh={isRefresh}/>
      </div>
  );
}

export default ClientMenu;