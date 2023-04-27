import React from 'react';
import CategoryList from './ComponentesCategorias/CategoryList'
import CategoryModal from './ComponentesCategorias/CategoryModal';
import { useState } from 'react';

function Categoria() {

  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
      
      <div className="row">
          <CategoryModal setRefresh={setRefresh} />
          <CategoryList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
  );
}

export default Categoria;
