import React from 'react';
import two from '../2.jpg';
import style from './category.module.css'

const Categorias = ({nombre}) => {
    return(
        <div className={style.category} >
            <h3>{nombre}</h3>
            <img src={two} alt=""></img>
        </div>
    )
}

export default Categorias;