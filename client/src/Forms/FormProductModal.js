import { Button, DatePicker, InputNumber, Input, Select, Upload, Modal } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './FormProductModal.css'

const { TextArea } = Input;

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

const ModalProducto = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        saveData();
        uploadDB();
        vaciar();
        setIsModalOpen(false);
    };

    const saveData = () => {
        values.nombreProducto = document.getElementById("nombre").value;
        values.cantidad = document.getElementById("cantidad").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.categoria = document.getElementById("categoria").value;
        values.fechaCaducidad = document.getElementById("fechaCad").value;
        values.descripcion = document.getElementById("descripcion").value;
        console.log(values.fechaCaducidad);
    }

    const vaciar = () => {
        document.getElementById("nombre").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("costoU").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("fechaCad").value = "";
        document.getElementById("descripcion").value = "";
    }

    const uploadDB = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {"Content-Type": "application/json"}
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
                    <Button key="create" type="primary" onClick={handleOk}>
                        Crear
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>
                ]}
            >

                <p>Subir Imagen</p>
                <Upload action="/upload.do" listType="picture"
                    accept="image/png, image/jpeg"
                    maxCount={1}
                    value={values.imagen}
                    name="imagen"
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>

                <p>Nombre del Producto</p>
                <Input id="nombre"
                    className="inputs"
                    placeholder='Inserte nombre del Producto'
                    minLength='3'
                    maxLength='40'
                    type='text'
                    required
                />

                <p>Cantidad</p>
                <InputNumber className="inputs" type='number' id="cantidad" min={1} defaultValue={1} />

                <p>Costo Unitario</p>
                <InputNumber className="inputs" id="costoU" min={0} addonBefore="+" addonAfter="Bs" defaultValue={0} />

                <p>Precio</p>
                <InputNumber className="inputs" id="precio" min={0} addonBefore="+" addonAfter="Bs" defaultValue={0} />

                <p>Seleccionar Categoria</p>
                <Select className="inputs" id="categoria" placeholder='Seleccione la categoría'
                    value={values.categoria}

                >
                    {/**Recuperar de la BD las categorias**/}
                </Select>

                <p>Fecha de Caducidad</p>
                <DatePicker id="fechaCad"
                    className="inputs"
                    placeholder='Inserte la fecha'
                    disabledDate={(current) => {
                        return moment().add(-1, 'days') >= current;
                    }}
                />

                <p>Descripcion</p>
                <TextArea id="descripcion" className="inputs" rows={3}
                    placeholder='Ingrese una descripcion del producto'
                    maxLength={100}
                />

            </Modal>
        </>
    );
};

export default ModalProducto;