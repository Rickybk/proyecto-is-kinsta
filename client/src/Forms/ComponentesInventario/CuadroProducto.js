import { EditOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import { Card, Button, Modal } from 'antd';
import EditarModal from './EditarForm'
import React, { useState } from 'react';


function Productos({title,imagen,precio,cantidad,idProducto}){  
  const [modalEditar,setEditar] = useState(false);
  const [modalLote,setLote] = useState(false);
  const [modalBorrar,setBorrar] = useState(false);

  const abrirModal = (e) =>{
    const {name,value} = e.target  
    switch(name){
      case 'modalEditar':
        setEditar(true);
        break;
      case 'modalLote':
        setLote(true);
        break;
      case 'modalEditar':
          setBorrar(true);
          break;
      default:
          break;
    }  
  }

  const cerrarModalEdit = (e) =>{
    setEditar(false);
  }

  return(
  <Card
    style={{
      width: 200,
      textAlign:'center'
    }}
    cover={
      <img
        alt="example"
        src={imagen}
      />
    }
    actions={[
      <><Button  name="modalEditar" onClick={abrirModal}><EditOutlined /></Button>
        <EditarModal visible={modalEditar} onClose={cerrarModalEdit} idProducto={idProducto} />
      </>,
        <DeleteOutlined />
    ]}
    title={title}
  >
    <p><b>Precio Unitario: </b>{precio} Bs.</p>
    <p><b>Cantidad: </b>{cantidad} u</p>
    <p></p>
  </Card>
  );
};

export default Productos;