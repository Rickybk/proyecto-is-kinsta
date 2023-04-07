import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = ({ getImgUrlUpload, imagenUrl }) => {

  var imgUrl = imagenUrl;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(imagenUrl !== "Sin imagen" ? [{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: imagenUrl
  }] : []);


  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Subir
      </div>
    </div>
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = () => {
    imgUrl = "Sin imagen";
    getImgUrlUpload(imgUrl);
  };

  const beforeUpload = async (file) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (isLt2M) {
      await uploadImage(file);
    } else {
      imgUrl = "Peso exedido";
      getImgUrlUpload(imgUrl);
    }
    return false;
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data['imgUrl'] !== "Error") {
        imgUrl = response.data['imgUrl'];
        getImgUrlUpload(imgUrl);
      } else {
        setFileList([]);
        handleCancel();
        message.error('No se pudo subir la imagen, intente nuevamente.');
      }

    } catch (error) {
      setFileList([]);
      message.error('No se pudo subir la imagen, intente nuevamente.');
      console.log(`Error uploading file: ${error}`);
    }
  };

  return (
    <>
      <Upload
        id="upload"
        listType="picture-card"
        defaultFileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        accept="image/png, image/jpeg"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default App;