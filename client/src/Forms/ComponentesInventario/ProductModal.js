import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm'

const values = {
    image: "",
    nombreProducto: "",
    cantidad: "",
    costoUnitario: "",
    precio: "",
    fechaCaducidad: "",
    descripcion: ""
}

var imgUrl = "";

const getImgUrlForm = (data) => {
    imgUrl = data;
}

const ProductModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (validData()) {
            saveData();
            uploadDB();
            document.getElementById("productForm").reset();
        } else {
            message.warning('Todos los campos deben llenarse');
        }
    };

    function validData() {
        var valid = true;
        if (imgUrl === undefined) {
            valid = false;
        }
        if (!document.getElementById("nombre").value) {
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
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products`
        const res = await fetch("http://localhost:8080/store/products", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        console.log(data);
    }

    const handleCancel = () => {
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
                    <Button id="boton" form="productForm" key="create" type="primary" onClick={handleOk}>
                        Crear
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>
                ]}
                destroyOnClose="true"
            >
                <ProductForm getImgUrlForm={getImgUrlForm} />
            </Modal>
        </>
    );
};

export default ProductModal;