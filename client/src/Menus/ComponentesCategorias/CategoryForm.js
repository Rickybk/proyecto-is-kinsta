import { Form,Input } from 'antd';
import { useEffect, useState } from "react";

const CategoryForm = ({nombreCategoria}) => {

    const [categoria, setCategoria] = useState([]);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchCategoria();
    },[]);

    async function fetchCategoria() {
        const response = await fetch("http://localhost:8080/store/categories");
        const jsonData = await response.json();
        setCategoria(jsonData);
    }

    const validation = (e) => {
        
        const key = e.key;
        if (!(/^[A-Z a-z À-ÿ\u00f1\u00d1]+$/.test(key) 
            || key === 'Backspace' 
            || key === 'Delete' 
            || key === 'Tab' 
            || key=== 'ArrowLeft' 
            || key=== 'ArrowRight' ))
        {
            e.preventDefault();
        }
    };

    return (
        <>
            <Form
                id="categoryForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                

                <Form.Item
                    label="Nombre de la categoría"
                    labelCol={{ span: 24 }}
                    name="nombre"
                    initialValue={nombreCategoria ? nombreCategoria : ""}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre de la categoría!',
                        },
                        {
                            min: 3,
                            message: 'El nombre de la categoría tener al menos 3 caracteres!',
                        },
                        {
                            max: 39,
                            message: 'El nombre de la categoría no puede tener más de 30 caracteres!',
                        },

                    ]}
                >
                    <Input id="nombre"
                        className="inputs"
                        placeholder='Ingrese nombre de la categoría'
                        maxLength='30'
                        type='text'
                        onKeyDown={validation}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default CategoryForm;