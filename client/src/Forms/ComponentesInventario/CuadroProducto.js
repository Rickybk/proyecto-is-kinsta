import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Button} from 'antd';
import EditarModal from './EditarForm'
import DeleteModal from './DeleteModal';
import React, { useState } from 'react';
import defaultLogo from '../../Imagenes/Logo Peq.png'


function Productos({ title, imagen, precio, cantidad, idProducto, costo, descripcion, setRefresh }) {
  
  const [modalEditar, setEditar] = useState(false);
  const [modalBorrar, setBorrar] = useState(false);

  const abrirModalEdit = () => {
    setEditar(true);
  }

  const abrirModalBorrar = () => {
    setBorrar(true);
  }

  const cerrarModalEdit = () => {
    setEditar(false);
  }

  const cerrarModalBorrar = () => {
    setBorrar(false);
  }

  return (
    <Card
      style={{
        width: 200,
        textAlign: 'center'
      }}
      cover={
        <img
          style={{
            width: 100,
            height: 150,
            objectFit: 'cover',
            margin: 'auto',
            marginTop: '20px'
          }}
          alt="Algo salio mal..."
          src={imagen === "Sin imagen" ? defaultLogo : imagen}
        />
      }
      actions={[
        <><Button name="modalEditar" onClick={abrirModalEdit}><EditOutlined /></Button>
          <EditarModal
            visible={modalEditar}
            onClose={cerrarModalEdit}
            idProducto={idProducto} 
            nombre={title}
            imagen={imagen}
            precio={precio}
            costo={costo}
            descripcion={descripcion}
            setRefresh={setRefresh}
          />
        </>,
        <>
          <Button name="modalBorrar" onClick={abrirModalBorrar}><DeleteOutlined /></Button>
          <DeleteModal
            visible={modalBorrar}
            onClose={cerrarModalBorrar}
            idProducto={idProducto}
            nombreProducto={title}
            setRefresh={setRefresh} 
            cerrarModal={cerrarModalBorrar}  
          />
        </>
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