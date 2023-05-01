import { EditOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import EditarModal from './ProductModal'
import DeleteModal from './DeleteModal';
import BuyModal from '../ComponenetesTransacciones/BuyModal';
import React, { useState } from 'react';
import defaultLogo from '../../Imagenes/Logo Peq.png'


function Productos({ title, imagen, precio, cantidad, idProducto, idCategoria, descripcion, setRefresh ,setElegido}) {

  const [modalEditar, setEditar] = useState(false);
  const [modalBorrar, setBorrar] = useState(false);
  const [buyModal, setBuy] = useState(false);

  const openBuyModal = () => {
    setBuy(true);
  }

  const abrirModalEdit = () => {
    setEditar(true);
  }

  const abrirModalBorrar = () => {
    setBorrar(true);
  }

  const closeBuyModal = () => {
    setBuy(false);
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
        width: 210,
        textAlign: 'center'
      }}
      cover={
        <img
          style={{
            width: 110,
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
        <>
          <Button name="modalBorrar" onClick={openBuyModal}><DollarOutlined/></Button>
          <BuyModal
            visible={buyModal}
            onClose={closeBuyModal}
            idProducto={idProducto}
            nombreProducto={title}
            setRefresh={setRefresh}
            closeModal={closeBuyModal}
          />
        </>,
        <>
          <EditarModal
            idProducto={idProducto}
            nombreProducto={title}
            imagen={imagen}
            precio={precio}
            idCategoria={idCategoria}
            descripcion={descripcion}
            setRefresh={setRefresh}
            setElegido={setElegido}
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
      title={<b>{title}</b>}
    >
      <p><b>Precio U: </b>{precio} Bs.</p>
      <p><b>Cantidad: </b>{cantidad} U.</p>
      <p></p>
    </Card>
  );
};

export default Productos;