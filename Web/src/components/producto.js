import React from 'react';
import one from '../back.jpg';
import style from './product.module.css'
import swal from "sweetalert";

const Producto = ({id, nombre, precio,marca,color,ubicacion}) => {

    function handleClick(){
        swal("Insertado", id + " " + nombre + " " + precio + " " + marca+ " " +color+ " " +ubicacion, "info");
      }


    return(
        <div className={style.product} onClick={handleClick} >
            <h3>{nombre}</h3>
            <p>Precio: Q {precio}</p>
            <img className={style.img} src={`http://localhost:3001/static/img${id}.jpg`} alt={nombre}></img>
        </div>
    )
}

export default Producto;

