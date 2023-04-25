import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm'
import CreateModal from './CreateModal';

const values = {
    image: "",
    nombreProducto: "",
    cantidad: "",
    costoUnitario: "",
    precio: "",
    fechaCaducidad: "",
    descripcion: ""
}

var imgUrl = "Sin imagen";

const getImgUrlForm = (data) => {
    imgUrl = data;
}

const ProductModal = ({ setRefresh }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (validData()) {
            saveData();
            const respuesta=await uploadDB();
            setRefresh(true);
            if(respuesta===1){
                await message.error("El producto "+ values.nombreProducto +" ya existente ");
            } else {
                message.success("Producto creado exitosamente");
                document.getElementById("productForm").reset();
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
        if (!document.getElementById("cantidad").value) {
            valid = false;
        }
        if (!document.getElementById("costoU").value) {
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
        values.cantidad = document.getElementById("cantidad").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.fechaCaducidad = document.getElementById("fechaCad").value;
        values.descripcion = document.getElementById("descripcion").value;

        if (!values.fechaCaducidad) {
            values.fechaCaducidad = null;
        }
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        const res = await fetch("http://localhost:8080/store/products", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const jsonData = await res.json();
        if(jsonData.data === 1){
            return 1;   
        }
    }

    const handleCancel = () => {
        imgUrl = "Sin imagen";
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Añadir Producto
            </Button>
            <Modal
                title="Añadir Producto"
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
                        //onClose={onClose}
                        setRefresh={setRefresh} />,
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>
                ]}
                destroyOnClose="true"
            >
                <ProductForm getImgUrlForm={getImgUrlForm} imagen={imgUrl} />
            </Modal>
        </>
    );
};

export default ProductModal;