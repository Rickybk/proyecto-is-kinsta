import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm'
import CreateModal from './CreateModal';
import { EditOutlined } from '@ant-design/icons';

const values = {
    imagen: "Sin imagen",
    nombreProducto: "",
    precio: "",
    idCategory: 2,
    descripcion: ""
}

const getImgUrlForm = (data) => {
    values.imagen = data;
}

const setIdCategoria = (id_categoria) => {
    values.idCategory = id_categoria;
}

const ProductModal = ({ setRefresh, imagen, idProducto, idCategoria, nombreProducto, precioU, descripcion }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        if(imagen){
            values.imagen = imagen;
        }
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
            values.imagen = "Sin imagen";
            values.idCategory = 2;
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
        values.nombreProducto = document.getElementById("nombre").value;
        values.precio = document.getElementById("precio").value;
        values.descripcion = document.getElementById("descripcion").value;
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        var res;
        if (idProducto) {
            res = await fetch("http://localhost:8080/store/products/" + idProducto, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });
        } else {
            res = await fetch("http://localhost:8080/store/products/" + values.idCategory, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });
        }

        const jsonData = await res.json();
        if (jsonData.data === 1) {
            return 1;
        }
    }

    const handleCancel = () => {
        values.image = "Sin imagen";
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
                    imagen={values.imagen}
                    descripcion={descripcion}
                    nombreProducto={nombreProducto}
                    setIdCategoria={setIdCategoria}
                    idCategoria={idCategoria}
                    precioU={precioU}
                />
            </Modal>
        </>
    );
};

export default ProductModal;