import { Button, DatePicker, InputNumber, Input, Select, Upload, Modal } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const App = () => {

    const values = {
        imagen: "",
        nombreProducto: "",
        cantidad: "",
        costoUnitario: "",
        precio: "",
        categoria: "",
        fechaCaducidad: "",
        descripcion: ""
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        saveData();
        uploadDB();
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
        console.log(values.nombreProducto);
        console.log(values.descripcion);
    }

    const uploadDB = async () => {
        console.log(values);
        console.log(JSON.stringify(values));
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {"Content-Type": "application/json; charset=utf-8",
            }
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
                    left: 695
                }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
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
                    placeholder='Inserte nombre del Producto'
                    minLength='3'
                />

                <p>Cantidad</p>
                <InputNumber id="cantidad" min={1} defaultValue={1} />

                <p><b>Costo Unitario</b></p>
                <InputNumber id="costoU" min={0} defaultValue={0} />

                <p>Precio</p>
                <InputNumber id="precio" min={0} defaultValue={0} />

                <p>Seleccionar Categoria</p>
                <Select id="categoria" placeholder='Seleccione la categoría'
                    value={values.categoria}

                >
                    {/**Recuperar de la BD las categorias**/}
                </Select>

                <p>Fecha de Caducidad</p>
                <DatePicker id="fechaCad"
                    placeholder='Inserte la fecha'
                    disabledDate={(current) => {
                        return moment().add(-1, 'days') >= current;
                    }}
                />

                <p>Descripcion</p>
                <TextArea id="descripcion" rows={3}
                    placeholder='Ingrese una descripcion del producto'
                />

            </Modal>
        </>
    );
};

export default App;