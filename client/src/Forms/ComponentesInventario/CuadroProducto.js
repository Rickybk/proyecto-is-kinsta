import { EditOutlined, PlusOutlined, SettingOutlined , DeleteOutlined} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import ProductModal from './ProductModal';
import PropTypes from "prop-types";



/*
function Card({ imageSource, title, text, url }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."}
        </p>
        <a
          href={url ? url : "#!"}
          target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Go to {title}
        </a>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

card = () =>{
      
}
*/

function Productos({title,text,imagen,precio}){  
  return(
  <Card
    style={{
      width: 200,
    }}
    cover={
      <img
        alt="example"
        src={imagen}
      />
    }
    actions={[
      <EditOutlined key="edit" onClick={ProductModal}/>,
      <PlusOutlined/>,
      <DeleteOutlined />
    ]}
    title={title}
  >
    <p>{text}</p>
    <p>{precio}</p>
  </Card>
  );
};

export default Productos;