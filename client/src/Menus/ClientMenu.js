import React from 'react';
import { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import ClientList from './ComponentesClientes/ClientList';
const { Search } = Input;



function ClientMenu() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  const onSearch = (value) => console.log(value);

  return (
    
      <div className="row">
          <Button>Añadir Cliente</Button>
          <Search
            placeholder="Buscar Cliente"
            onSearch={onSearch}
            style={{
                width: 200,
            }}
          />

          <ClientList/>
      </div>
  );
}

export default ClientMenu;