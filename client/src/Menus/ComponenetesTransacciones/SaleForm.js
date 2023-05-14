import { Form, Input, InputNumber, Radio } from 'antd';
import { useState } from 'react';

const SaleForm = ({ nombreProducto, precioUnitario, cantidadMax, fiado, setFiado}) => {

    const [cantidad, setCantidad] = useState(0);
    const [value, setValue] = useState(1);
    const [enable, setEnable] = useState(fiado);

    const numberInputKeyDown = (e) => {
        const key = e.key;
        if (!(/^[0-9]+$/.test(key) || key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'ArrowLeft' || key === 'ArrowRight')) {
            e.preventDefault();
        }
    };

    const onChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === 1) {
            setFiado(false);
            setEnable(false);
        } else {
            setFiado(true);
            setEnable(true);
        }
    };

    return (
        <>
            <Form
                id="saleForm"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 12 }}
                    name="nombreProducto"
                >
                    <p>Producto: {nombreProducto}</p>
                    <p>Precio unitario: {precioUnitario}</p>
                </Form.Item>

                <Form.Item
                    label="Cantidad"
                    labelCol={{ span: 24 }}
                    name="cantidad"
                    initialValue={0}
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
                        id="cantidad"
                        min={0}
                        max={cantidadMax}
                        maxLength={6}
                        onKeyDown={numberInputKeyDown}
                        onChange={setCantidad}
                    />
                </Form.Item>

                <Form.Item
                    label="Forma de pago"
                    labelCol={{ span: 24 }}
                    name="costoTotal"
                    initialValue={1}
                    rules={[{required: true,},]}
                >
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Al contado</Radio>
                        <Radio value={2}>Fiado</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Cliente"
                    labelCol={{ span: 24 }}
                    name="fechaCaducidad"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor seleccione un cliente!'
                        },
                    ]}
                >
                    <Input
                        id="cliente"
                        disabled={!enable}
                        style={{ width: '100%' }}
                        placeholder="Buscar cliente"
                    />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    name="costoTotal"
                >
                    <p>Costo total: {Math.round((precioUnitario * cantidad) * 100) / 100} Bs.</p>
                </Form.Item>

            </Form>
        </>
    );
};

export default SaleForm;