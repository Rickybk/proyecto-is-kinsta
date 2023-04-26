import { Modal, Button } from 'antd';
import { useState } from 'react';

const UpdateModal = ({ handleOk, setRefresh }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkModal = async () => {
        await handleOk();
        handleCancel();
        setRefresh(true);
    }

    return (
        <>
            <Button onClick={showModal}>
                Editar
            </Button>
            <Modal
                title="¿Está seguro de modificar la información del producto?"
                open={isModalOpen}
                onCancel={handleCancel}
                width="25%"
                footer={[
                    <Button id="boton" form="editForm" key="edit" type="primary" onClick={handleOkModal}>
                        Ok
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>
                ]}
                destroyOnClose="true"
            >

            </Modal>
        </>

    );
}

export default UpdateModal;