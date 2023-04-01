import { Button, Modal, message} from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm'

//Lo usamos para guardar los valores de los inputs de los forms
const values = {
    imagen: "",
    nombreProducto: "",
    cantidad: "",
    costoUnitario: "",
    precio: "",
    categoria: "",
    fechaCaducidad: "",
    descripcion: ""
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
        values.nombreProducto = document.getElementById("nombre").value;
        values.cantidad = document.getElementById("cantidad").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.categoria = document.getElementById("categoria").value;
        values.fechaCaducidad = document.getElementById("fechaCad").value;
        values.descripcion = document.getElementById("descripcion").value;
    }

    const uploadDB = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products`, {
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
                <ProductForm />
            </Modal>
        </>
    );
};

export default ProductModal;