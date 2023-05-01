import { Button, Modal, message } from 'antd';
import BuyEditForm from './BuyEditForm'
import ConfirmBuyEditModal from './ConfirmBuyEditModal';

const values = {
    cantidad: "",
    fechaCaducidad: "",
    costoUnitario: "",
    total: "",
}

const BuyEditModal = ({ setRefresh, nombreProducto, idProducto, visible, onClose, closeModal }) => {

    const handleOk = async () => {
        if (validData()) {
            saveData();
            const respuesta = await uploadDB();
            setRefresh(true);
            message.success("Transaccion editada exitosamente");
            closeModal();
        } else {
            message.warning('Todos los campos obligatorios deben llenarse correctamente');
        }
    };

    function validData() {
        var valid = true;
        if (!document.getElementById("cantidad").value) {
            valid = false;
        }
        if (!document.getElementById("costoU").value) {
            valid = false;
        }
        if (!document.getElementById("fechaCad").value) {
            valid = false;
        }
        if (!document.getElementById("total").value) {
            valid = false;
        }

        return valid;
    }

    const saveData = () => {
        values.cantidad = document.getElementById("cantidad").value;
        values.costoUnitario = document.getElementById("costoU").value;
        values.fechaCaducidad = document.getElementById("fechaCad").value;
        values.fechaCaducidad = document.getElementById("total").value;

        if (!values.fechaCaducidad) {
            values.fechaCaducidad = null;
        }
    }

    const uploadDB = async () => {
        //Ruta para server en localhost: "http://localhost:8080/store/products"
        //Ruta para server deployado: `${process.env.REACT_APP_SERVERURL}/store/products/`
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        });
        const jsonData = await res.json();
        if (jsonData.data === 1) {
            return 1;
        }
    }

    const handleCancel = () => {
        closeModal();
    };

    return (
        <Modal
            title="Editar transaccion"
            style={{
                top: 0,
                left: "37%",
            }}
            open={visible}
            onCancel={onClose}
            width="25%"
            footer={[
                <ConfirmBuyEditModal
                    handleOk={handleOk}
                    isModalOpen={false}
                    setRefresh={setRefresh} 
                />,
                <Button key="cancel" onClick={handleCancel}>
                    Cancelar
                </Button>
            ]}
            destroyOnClose="true"
        >
            <BuyEditForm nombreProducto = {nombreProducto} />
        </Modal>
    );
};

export default BuyEditModal;