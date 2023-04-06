import {Modal,Form,Button,Input,InputNumber,Upload,message} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;


//Lo usamos para guardar los valores de los inputs de los forms
const values = {
    imagen: "",
    nombreProducto: "",
    costoUnitario: "",
    precio: "",
    descripcion: ""
}


const EditarModal = ({visible,onClose,idProducto}) =>{

    function validData() {
        var valid = true;
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
        values.nombreProducto = document.getElementById("nombre").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.precio = document.getElementById("precio").value;
        values.descripcion = document.getElementById("descripcion").value;
    }


    const handleOk = () => {
        if (validData()) {
            saveData();
            updateProduct();
            document.getElementById("editForm").reset();
        } else {
            message.warning('Todos los campos deben llenarse');
        }
    };

    /**Actualizar Producto**/
    const updateProduct = async () => {
        // const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products`
        const url = "http://localhost:8080/store/products/" + idProducto;
        console.log(url);
         const res = await fetch(url, {
             method: "PUT",
             body: JSON.stringify(values),
             headers: { "Content-Type": "application/json" }
         });
         const data = await res.json();
         console.log(data);
     }


    return(
        <Modal
            title="Editar Producto"
            style={{
                top: 0,
                left: "37%",
            }}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            width="25%"
            footer={[
                <Button id="boton" form="editForm" key="edit" type="primary" onClick={handleOk}>
                    Editar
                </Button>,
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>
            ]}
            destroyOnClose="true"
        >
            <EditarForm />
        </Modal>
    );
}


const EditarForm = () =>{

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
                || (eventCode.includes("numpad") && eventCode.length === 7)))
        ) {
            e.preventDefault();
        }
    };
    return(
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
                {/*<Upload/>*/}
                <Upload
                    action="/upload.do"
                    listType="picture-card"
                    maxCount={1}
                    accept="image/png, image/jpeg"
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
            </Upload>
            </Form.Item>

            <Form.Item
                label="Nombre del Producto"
                labelCol={{ span: 24 }}
                name="nombre"
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
                    minLength='3'
                    maxLength='40'
                    type='text'
                    onSubmit={clearInput}
                />
            </Form.Item>

            <Form.Item
                label="Costo Unitario"
                labelCol={{ span: 24 }}
                name="costoUnitario"
                initialValue={1}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el costo unitario del producto!'
                    },
                ]}
            >
                <InputNumber className="inputs" type="number" id="costoU" min={1}
                    onKeyDown={numberInputKeyDown} />
            </Form.Item>

            <Form.Item
                label="Precio Unitario"
                labelCol={{ span: 24 }}
                name="precioUnitario"
                initialValue={1}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el precio unitario del producto!'
                    },
                ]}
            >
                <InputNumber className="inputs" type='number' id="precio" min={1}
                    onKeyDown={numberInputKeyDown} />
            </Form.Item>

            <Form.Item
                label="Descripcion"
                labelCol={{ span: 24 }}
                name="descripcion"
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