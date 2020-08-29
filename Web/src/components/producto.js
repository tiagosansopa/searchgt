import React from 'react';
import one from '../1.jpg';
import style from './product.module.css'

const Producto = ({nombre, precio}) => {
    return(
        <div className={style.product} >
            <h3>{nombre}</h3>
            <p> Q {precio}</p>
            <img src={one} alt=""></img>
        </div>
    )
}

export default Producto;

