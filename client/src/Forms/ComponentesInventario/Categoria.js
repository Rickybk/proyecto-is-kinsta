import { Button} from 'antd';
import CategoryList from './CategoryList'
import { useState } from 'react';

function Categoria() {

  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
      setIsRefresh(status);
  }

  return (
      
      <div className="row">
          <Button type="primary">Añadir Categoría</Button>
          <CategoryList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
  );
}

export default Categoria;
