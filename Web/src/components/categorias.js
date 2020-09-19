import React from 'react';
import two from '../2.jpg';
import style from './category.module.css'

const Categorias = ({nombre}) => {
    function handleClick(){
        window.location.href = "/search";
      }
    return(
        <div className={style.category} onClick={handleClick}>
            <h3>{nombre}</h3>
            <img src={two} alt=""></img>
        </div>
    )
}

export default Categorias;