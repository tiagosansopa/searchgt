import React from 'react';
import one from '../1.jpg';
import style from './product.module.css'

const Producto = ({id, nombre, precio,imagen}) => {
    return(
        <div className={style.product} >
            <h3>{nombre}</h3>
            <p> Q {precio}</p>
            <img className={style.imagens} src={`http://localhost:3001/static/img${id}.jpg`} alt={nombre}></img>
        </div>
    )
}

export default Producto;

