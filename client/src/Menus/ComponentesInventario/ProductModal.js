import { Button, Modal, message, Select } from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm'
import CreateModal from './CreateModal';
import { EditOutlined } from '@ant-design/icons';

const values = {
    image: "",
    nombreProducto: "",
    precio: "",
    id_categoria: 2,
    descripcion: ""
}

var imgUrl = "Sin imagen";

const getImgUrlForm = (data) => {
    imgUrl = data;
}

const setIdCategoria = (id_categoria) => {
    values.id_categoria = id_categoria;
}

const ProductModal = ({ setRefresh, imagen, idProducto, nombreProducto, precioU, descripcion }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (validData()) {
            saveData();
            const respuesta = await uploadDB();
            setRefresh(true);
            if (respuesta === 1) {
                await message.error("El producto " + values.nombreProducto + " ya existente ");
            } else {
                if (idProducto) {
                    message.success("Producto actualizado exitosamente");
                } else {
                    message.success("Producto creado exitosamente");
                    document.getElementById("productForm").reset();
                }
            }
            imgUrl = "Sin imagen";
        } else {
            message.warning('Todos los campos obligatorios deben llenarse correctamente');
        }
    };

    function validData() {
        var valid = true;
        var nombre = document.getElementById("nombre").value;
        if (!nombre || nombre.length < 3) {
            valid = false;
        }
        if (!document.getElementById("precio").value) {
            valid = false;
        }
        return valid;
    }

    const saveData = () => {
        values.image = imgUrl;
        values.nombreProducto = document.getElementById("nombre").value;
        values.precio = document.getElementById("precio").value;
        values.descripcion = document.getElementById("descripcion").value;
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        const res = await fetch("http://localhost:8080/store/products/" + values.id_categoria, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const jsonData = await res.json();
        if (jsonData.data === 1) {
            return 1;
        }
    }

    const handleCancel = () => {
        imgUrl = "Sin imagen";
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type={idProducto ? "default" : "primary"} onClick={showModal}>
                {idProducto ? <EditOutlined /> : "Añadir Producto"}
            </Button>
            <Modal
                title={idProducto ? "Editar Producto" : "Añadir Producto"}
                style={{
                    top: 0,
                    left: "37%",
                }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width="25%"
                footer={[
                    <CreateModal
                        handleOk={handleOk}
                        isModalOpen={false}
                        setRefresh={setRefresh}
                        isEdit={idProducto ? true : false}
                    />,
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>
                ]}
                destroyOnClose="true"
            >
                <ProductForm
                    getImgUrlForm={getImgUrlForm}
                    imagen={imagen ? imagen : imgUrl}
                    descripcion={descripcion}
                    nombreProducto={nombreProducto}
                    setIdCategoria={setIdCategoria}
                    precioU={precioU}
                />
            </Modal>
        </>
    );
};

export default ProductModal;