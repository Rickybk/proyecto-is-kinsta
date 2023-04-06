import { Form, DatePicker, InputNumber, Input } from 'antd';
import moment from 'moment';
import Upload from '../ComponentesInventario/Upload';

const { TextArea } = Input;



const FormProducto = ({ getImgUrlForm }) => {

    var imgUrl = "";

    const getImgUrlUpload = (data) => {
        imgUrl = data;
        console.log("Url desde form: ", imgUrl);
        getImgUrlForm(imgUrl);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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

    const clearInput = () => {
        console.log("Funcion clear");
        document.getElementById("nombre").value = "";
    }

    return (
        <>
            <Form
                id="productForm"
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
                    <Upload getImgUrlUpload={getImgUrlUpload} />
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
                    label="Cantidad"
                    labelCol={{ span: 24 }}
                    name="cantidad"
                    initialValue={1}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor la cantidad del producto!'
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="U."
                        className="inputs"
                        id="cantidad"
                        min={1}
                        onKeyDown={numberInputKeyDown} />
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
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="Bs."
                        className="inputs"
                        id="costoU"
                        min={1}
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
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="Bs."
                        className="inputs"
                        id="precio"
                        min={1}
                        onKeyDown={numberInputKeyDown} />
                </Form.Item>

                <Form.Item
                    label="Seleccionar Fecha de Caducidad"
                    labelCol={{ span: 24 }}
                    name="fechaCaducidad"
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
        </>
    );
};

export default FormProducto;