import { Form, Input } from 'antd';
import CategoryForm from './CategoryModal';


    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validation = (e) => {
        
        const key = e.key;
        if (!(/^[A-Z a-z]+$/.test(key) || key === 'Backspace' || key === 'Delete' ||key === 'Tab' || key=== 'ArrowLeft' || key=== 'ArrowRight'  ))
        {
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
                id="categoryForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre de la Categoria"
                    labelCol={{ span: 24 }}
                    name="nombre"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre de la Categoria!',
                        },
                        {
                            min: 3,
                            message: 'El nombre de la categoria debe tener al menos 3 caracteres!',
                        },
                        {
                            max: 39,
                            message: 'El nombre de la categoria no puede tener más de 40 caracteres!',
                        },
                    
                    ]}
                >
                    
                    <Input id="nombre"
                        className="inputs"
                        placeholder='Ingrese nombre de la categoria'
                        maxLength='40'
                        type='text'
                        onKeyDown={validation}
                        onSubmit={clearInput}
                    />
                </Form.Item>

            </Form>
        </>
    );

export default CategoryForm;