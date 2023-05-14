import { Button, Modal, message } from 'antd';
import SaleForm from './SaleForm'
import ConfirmSaleModal from './ConfirmSaleModal';

const values = {
    id_producto: "",
    cantidad: "",
    cliente: "",
    precio_unitario: "",
}

var fiado = false;

function setFiado(esFiado) {
    fiado = esFiado;
}

const SaleModal = ({ setRefresh, nombreProducto, idProducto, precioUnitario, cantidad, visible, onClose, closeModal }) => {

    const handleOk = async () => {
        if (validData()) {
            saveData();
            //Falta que el amigo Jose tenga listo el back.
            //const respuesta = await uploadDB();
            console.log(values);
            setRefresh(true);
            message.success("Venta realizada exitosamente");
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
        if (fiado && !document.getElementById("cliente").value) {
            valid = false;
        }
        return valid;
    }

    const saveData = () => {
        values.id_producto = idProducto;
        values.cantidad = document.getElementById("cantidad").value;
        values.precio_unitario = precioUnitario;
        if (fiado) {
            values.cliente = document.getElementById("cliente").value;
        }
    }

    const uploadDB = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/store/products/buy/` + idProducto, {
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
            title="Realizar venta"
            style={{
                top: 0,
                left: "37%",
            }}
            open={visible}
            onCancel={onClose}
            width="25%"
            footer={[
                <ConfirmSaleModal
                    handleOk={handleOk}
                    isModalOpen={false}
                    setRefresh={setRefresh} />,
                <Button key="cancel" onClick={handleCancel}>
                    Cancelar
                </Button>
            ]}
            destroyOnClose="true"
        >
            <SaleForm
                nombreProducto={nombreProducto}
                precioUnitario={precioUnitario}
                cantidadMax={cantidad}
                fiado={fiado}
                setFiado={setFiado} />
        </Modal>
    );
};

export default SaleModal;