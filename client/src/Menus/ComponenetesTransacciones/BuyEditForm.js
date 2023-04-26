import { Form, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const BuyEditForm = ({ nombreProducto}) => {

    const [costoTotal, setCostoTotal] = useState(0);

    const numberInputKeyDown = (e) => {
        
        const key = e.key;
        if (!(/^[0-9]+$/.test(key) || key === 'Backspace' || key === 'Delete' ||key === 'Tab' || key=== 'ArrowLeft' || key=== 'ArrowRight'  ))
        {
            e.preventDefault();
        }
    };

    const DecimalInput = (e) => {
       
        const key = e.key;
        if (!(/^[0-9.]+$/.test(key) || key === 'Backspace' || key === 'Delete' ||key === 'Tab' || key=== 'ArrowLeft' || key=== 'ArrowRight' ))
        {
            e.preventDefault();
        }
    };

    const calcularTotal = e =>  {
        var cantidad = document.getElementById("cantidad").value;
        console.log(cantidad);
        var costoU = document.getElementById("costoU").value;
        console.log(costoU);
        setCostoTotal(cantidad * costoU);
    }

    return (
        <>
            <Form
                id="buyEditForm"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    name="nombreProducto"
                >
                    <p>{nombreProducto}</p>
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
                        maxLength={6}
                        onKeyDown={numberInputKeyDown}
                        onKeyUp={calcularTotal} 
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
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="Bs."
                        className="inputs"
                        id="costoU"
                        min={1}
                        maxLength={6}
                        precision={2}
                        step={0.5}
                        onKeyDown={DecimalInput}
                        onKeyUp={calcularTotal} 
                    />
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
                        onKeyDown={(e) => {
                            const maxCharacters = 10;
                            const currentValue = e.target.value || '';
                            const key = e.key;
                          
                            // Permite solo números y guión (-) y permite borrar incluso después de alcanzar el número máximo de caracteres
                            if (!(/^[0-9-]+$/.test(key) || key === 'Backspace' || key === 'Delete')) {
                              e.preventDefault();
                            }
                          
                            // Verifica que la longitud del texto no exceda el número máximo de caracteres
                            if (currentValue.length >= maxCharacters && key !== 'Backspace' && key !== 'Delete') {
                              e.preventDefault();
                            }
                          }}
                        />
                </Form.Item>

                <Form.Item
                    label="Total"
                    labelCol={{ span: 24 }}
                    name="total"
                    initialValue={1}
                    rules={[{ required: false, },                     
                    
                    ]}
                >
                </Form.Item>

            </Form>
        </>
    );
};

export default BuyEditForm;