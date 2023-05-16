import React from 'react';
import { useState } from 'react';
import { Button, Input } from 'antd';
import ClientList from './ComponentesClientes/ClientList';
import ClientModal from './ComponentesClientes/ClientModal'
const { Search } = Input;



function ClientMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  const onSearch = (value) => console.log(value);

  return (
    
      <div className="row">
          <div style={{
          }}>
            <ClientModal>Añadir Cliente</ClientModal>
            <Search
              placeholder="Buscar Cliente"
              onSearch={onSearch}
              style={{
                  width: 200,
              }}
            />
          </div>
          <ClientList setRefresh={setRefresh} isRefresh={isRefresh}/>
      </div>
  );
}

export default ClientMenu;