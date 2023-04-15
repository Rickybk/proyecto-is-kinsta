import { Modal, Form, DatePicker, Button, Input, InputNumber, message } from 'antd'
import UpdateModal from './UpdateModal';
import Upload from './Upload';
import moment from 'moment';
import dayjs from 'dayjs';

const { TextArea } = Input;


//Lo usamos para guardar los valores de los inputs de los forms
const values = {
    imagen: "",
    nombreProducto: "",
    cantidad: "",
    costoUnitario: "",
    precio: "",
    fechaCaducidad: '',
    descripcion: ""
}

var imgUrl = "Sin cambios";

const getImgUrlForm = (data) => {
    imgUrl = data;
}

const EditarModal = ({ visible, onClose, idProducto, nombre, cantidad, imagen, precio, costo, fechaCaducidad, descripcion, setRefresh }) => {

    function validData() {
        var valid = true;
        var nombre = document.getElementById("nombre").value;
        if (!nombre || nombre.length < 3) {
            valid = false;
        }
        if (!document.getElementById("costoU").value) {
            valid = false;
        }
        if (!document.getElementById("precio").value) {
            valid = false;
        }
        if (!document.getElementById("cantidad").value) {
            valid = false;
        }
        return valid;
    }

    const saveData = () => {
        if(imgUrl === "Sin cambios"){
            values.imagen = imagen;
        }else{
            values.imagen = imgUrl;
        }
        values.nombreProducto = document.getElementById("nombre").value;
        values.cantidad = document.getElementById("cantidad").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.fechaCaducidad = document.getElementById("fechaCad").value;
        values.descripcion = document.getElementById("descripcion").value;
    }


    const handleOk = async () => {
        if (validData()) {
            saveData();
            const respuesta = await updateProduct();
            if(respuesta===1){
                await message.error("El producto "+ values.nombreProducto +" ya existente ");
            } else {
                message.success("Producto actualizado exitosamente");
                onClose();
            } 
            
        } else {
                message.warning('Los campos obligatorios deben llenarse correctamente');     
        }
    };

    /**Actualizar Producto**/
    const updateProduct = async () => {
        // `${process.env.REACT_APP_SERVERURL}/store/products/` + idProducto
        //"http://localhost:8080/store/products/" + idProducto
        const url = "http://localhost:8080/store/products/" + idProducto;
        console.log(url);
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const jsonData = await res.json();
        if(jsonData.data === 1){
            return 1;   
        }
    }
 

    return (
        <Modal
            title="Editar Producto"
            style={{
                top: 0,
                left: "37%",
            }}
            open={visible}
            onCancel={onClose}
            width="25%"
            footer={[
                <UpdateModal
                    handleOk={handleOk}
                    isModalOpen={false}
                    onClose={onClose}
                    setRefresh={setRefresh} />,
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>
            ]}
            destroyOnClose="true"
        >
            <EditarForm
                nombre={nombre}
                cantidad={cantidad}
                imagen={imagen}
                costo={costo}
                precio={precio}
                fechaCaducidad={fechaCaducidad}
                descripcion={descripcion} />
        </Modal>
    );
}


const EditarForm = ({ nombre, cantidad, imagen, costo, precio, fechaCaducidad, descripcion }) => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const clearInput = () => {
        console.log("Funcion clear");
        document.getElementById("nombre").value = "";
    }

    const numberInputKeyDown = (e) => {
        const eventCode = e.code.toLowerCase();
        if (!(e.code !== null
            && (eventCode.includes("digit")
                || eventCode.includes("arrow")
                || eventCode.includes("home")
                || eventCode.includes("end")
                || eventCode.includes("backspace")
                || eventCode.includes("period")
                || eventCode.includes("tab")
                || (eventCode.includes("numpad") && eventCode.length === 7)))
        ) {
            e.preventDefault();
        }
    };
    console.log("aaaaa   "+nombre);
    console.log("aaaaa   "+fechaCaducidad);
    return (
        <Form
            id="editForm"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Añadir Imagen"
                labelCol={{ span: 24 }}
                name="img"
                rules={[{ required: false, }
                ]}
            >
                <Upload getImgUrlUpload={getImgUrlForm} imagenUrl={imagen}/>
            </Form.Item>

            <Form.Item
                label="Nombre del Producto"
                labelCol={{ span: 24 }}
                name="nombre"
                initialValue={nombre}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el nombre del Producto!',
                    },
                    {
                        min: 3,
                        message: 'El nombre del producto debe tener al menos 3 caracteres!',
                    },
                    {
                        max: 39,
                        message: 'El nombre del producto no puede tener más de 40 caracteres!',
                    },
                ]}
            >
                <Input id="nombre"
                    className="inputs"
                    placeholder='Ingrese nombre del producto'
                    maxLength='40'
                    type='text'
                    onSubmit={clearInput}
                />
            </Form.Item>

            <Form.Item
                    label="Cantidad"
                    labelCol={{ span: 24 }}
                    name="cantidad"
                    initialValue={cantidad}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor la cantidad del producto!'
                        },
                    ]}
                >
                    <Input
                        style={{ width: '100%' }}
                        prefix="U."
                        className="inputs"
                        id="cantidad"
                        min={1}
                        type='number'
                        onInput={(e)=>e.target.value=e.target.value.slice(0,6)}
                        onKeyDown={numberInputKeyDown} />
                </Form.Item>


            <Form.Item
                label="Costo Unitario"
                labelCol={{ span: 24 }}
                name="costoUnitario"
                initialValue={costo}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el costo unitario del producto!'
                    },
                ]}
            >
                <Input
                    className="inputs"
                    prefix="Bs."
                    id="costoU"
                    min={1}
                    type='number'
                    precision={2}
                    step={0.5}
                    style={{ width: '100%' }}
                    onInput={(e)=>e.target.value=e.target.value.slice(0,6)}
                    onKeyDown={numberInputKeyDown} />
            </Form.Item>

            <Form.Item
                label="Precio Unitario"
                labelCol={{ span: 24 }}
                name="precioUnitario"
                initialValue={precio}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el precio unitario del producto!'
                    },
                ]}
            >
                <Input
                    className="inputs"
                    prefix="Bs."
                    id="precio"
                    min={1}
                    type='number'
                    precision={2}
                    step={0.5}
                    style={{ width: '100%' }}
                    onInput={(e)=>e.target.value=e.target.value.slice(0,6)}
                    onKeyDown={numberInputKeyDown} />
            </Form.Item>

            <Form.Item
                    label="Seleccionar Fecha de Caducidad"
                    labelCol={{ span: 24 }}
                    name="fechaCaducidad"
                    initialValue={fechaCaducidad ? dayjs(fechaCaducidad, 'YYYY-MM-DD') : ''}
                    rules={[{ required: false, },
                    ]}
                >

                    <DatePicker
                        style={{ width: '100%' }}
                        id="fechaCad"
                        className="inputs"
                        placeholder='Inserte la fecha'
                        disabledDate={(current) => {
                            return moment().add(-1, 'days') >= current;
                        }}
                    />
                </Form.Item>

            <Form.Item
                label="Descripción"
                labelCol={{ span: 24 }}
                name="descripcion"
                initialValue={descripcion}
                rules={[{ required: false, },
                    {
                        max: 99,
                        message: 'La descripción no puede tener más de 100 caracteres!',
                    },
                
                ]}
            >
                <TextArea id="descripcion" className="inputs" rows={3}
                    placeholder='Ingrese una descripción del producto'
                    maxLength={100}
                    style={{resize: 'none'}}
                />
            </Form.Item>
        </Form>
    );
}

export default EditarModal;