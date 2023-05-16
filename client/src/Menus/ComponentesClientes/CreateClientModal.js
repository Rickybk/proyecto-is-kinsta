import { Modal, Button } from 'antd';
import { useState } from 'react';

const CreateClientModal = ({handleOk,setRefresh}) => {

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
                {"Crear"}
            </Button>
            <Modal
                title={"¿Está seguro de crear el contacto de Cliente?"}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOkModal}
                width="25%"
                destroyOnClose="true"
            >

            </Modal>
        </>

    );
}

export default CreateClientModal;