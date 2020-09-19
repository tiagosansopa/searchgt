import React from 'react';
import one from '../1.jpg';
import style from './product.module.css'

const Producto = ({nombre, precio,imagen}) => {
    return(
        <div className={style.product} >
            <h3>{nombre}</h3>
            <p> Q {precio}</p>
            <img src={`data:image/jpg;base64, ${imagen}`} alt={imagen}></img>
        </div>
    )
}

export default Producto;

