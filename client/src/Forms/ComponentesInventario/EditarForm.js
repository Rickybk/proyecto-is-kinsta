import { Modal, Form, Button, Input, InputNumber, message } from 'antd'
import UpdateModal from './UpdateModal';
import Upload from './Upload';

const { TextArea } = Input;

//Lo usamos para guardar los valores de los inputs de los forms
const values = {
    imagen: "",
    nombreProducto: "",
    costoUnitario: "",
    precio: "",
    descripcion: ""
}

var imgUrl = "Sin cambios";

const getImgUrlForm = (data) => {
    imgUrl = data;
}

const EditarModal = ({ visible, onClose, idProducto, nombre, imagen, precio, costo, descripcion, setRefresh }) => {

    function validData() {
        var valid = true;
        if(imgUrl === "Peso exedido"){
            valid = false;
        }
        if (!document.getElementById("nombre").value) {
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
        if(imgUrl === "Sin cambios"){
            values.imagen = imagen;
        }else{
            values.imagen = imgUrl;
        }
        values.nombreProducto = document.getElementById("nombre").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.descripcion = document.getElementById("descripcion").value;
    }

    const handleOk = async () => {
        if (validData()) {
            saveData();
            await updateProduct();
            onClose();
        } else {
            if(imgUrl === "Peso exedido"){
                message.error('El peso maximo de la imagen debe ser de 2MB!');   
            }else{
                message.warning('Los campos obligatorios deben llenarse');
            }
            
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
                imagen={imagen}
                costo={costo}
                precio={precio}
                descripcion={descripcion} />
        </Modal>
    );
}


const EditarForm = ({ nombre, imagen, costo, precio, descripcion }) => {

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
                <InputNumber
                    className="inputs"
                    prefix="Bs."
                    id="costoU"
                    min={1}
                    maxLength='6'
                    precision={2}
                    step={0.5}
                    style={{ width: '100%' }}
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
                <InputNumber
                    className="inputs"
                    prefix="Bs."
                    id="precio"
                    min={1}
                    precision={2}
                    step={0.5}
                    style={{ width: '100%' }}
                    maxLength='6'
                    onKeyDown={numberInputKeyDown} />
            </Form.Item>

            <Form.Item
                label="Descripcion"
                labelCol={{ span: 24 }}
                name="descripcion"
                initialValue={descripcion}
                rules={[{ required: false, },
                ]}
            >
                <TextArea id="descripcion" className="inputs" rows={3}
                    placeholder='Ingrese una descripcion del producto'
                    maxLength={100}
                />
            </Form.Item>
        </Form>
    );
}

export default EditarModal;