import ProductModal from './ProductModal';
import {Input,Affix} from 'antd'
import { useState } from 'react';
import './ListaBotones.css';

const {Search} = Input


function Botons({setRefresh}){
    const onSearch = () => {
        console.log("hola");
    }

    return(

        <div className="botones">
            <ProductModal setRefresh={setRefresh}/>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                onSearch={onSearch}
                style={{width:200}}
            />
        </div>
    );
}

export default Botons;