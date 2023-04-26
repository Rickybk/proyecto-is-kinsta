import { Modal, Button } from 'antd';
import { useState } from 'react';

const DeleteBuyModal = ({ setRefresh, isModalOpen, closeDeleteModal, record }) => {

    const handleCancel = () => {
        closeDeleteModal();
    };

    const handleOkModal = async () => {
        closeDeleteModal();
        console.log(record);
        setRefresh(true);
    }

    return (
        <Modal
            title="¿Está seguro de que quiere eliminar la compra?"
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
    );
}

export default DeleteBuyModal;