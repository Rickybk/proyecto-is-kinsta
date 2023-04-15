import ProductModal from './ProductModal';
import './ListaBotones.css';

function Botons({setRefresh}){
    return(
        <div className="botones">
            <ProductModal setRefresh={setRefresh}/>
        </div>
    );
}

export default Botons;