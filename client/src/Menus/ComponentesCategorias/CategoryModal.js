import { Button, Modal, message, Input } from 'antd';
import { useState } from 'react';

const values = {
    nombreCategoria: "",  
}
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
const CategoryModal = ({ setRefresh }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (validData()) {
            saveData();
            const respuesta=await uploadDB();
            setRefresh(true);
            if(respuesta===1){
                await message.error("La categoría "+ values.nombreCategoria +" ya existe ");
                
            } else {
                message.success("Categoría creada exitosamente");
                
            } 
            
        } else {
            message.warning('Todos los campos obligatorios deben llenarse correctamente');
        }
    };

    function validData() {
        var valid = true;
        var nombre = document.getElementById("nombre").value;
        if (!nombre || nombre.length < 3) {
            valid = false;
        }
        
        return valid;
    }

    const saveData = () => {
        
        values.nombreCategoria = document.getElementById("nombre").value;
        
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        const res = await fetch("http://localhost:8080/store/products", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const jsonData = await res.json();
        if(jsonData.data === 1){
            return 1;   
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Añadir Categoria
            </Button>
            <Modal
                title="Añadir Categoría"
                style={{
                    top: 0,
                    left: "36%",
                }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width="25%"
                destroyOnClose="true"
            >
                
            <Input id="nombre"
                        className="inputs"
                        placeholder='Ingrese nombre de la categoria'
                        maxLength='40'
                        type='text'
                        onKeyDown={validation}
                        onSubmit={clearInput}
                    />
            </Modal>

            
        </>
    );
};

export default CategoryModal;