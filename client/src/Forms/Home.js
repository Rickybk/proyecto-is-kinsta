import tienda from '../Imagenes/J&B Logo.png';
import './Home.css';

function Casa(){
    return(
        <div className='division'>
            <img src={tienda} className="img-tienda" alt="tienda" />
        </div>
    );
}

export default Casa;