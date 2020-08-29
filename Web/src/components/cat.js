import React, { Component } from "react";
import logo from './cat.jpg';
import Categorias from './categorias';

const Cat = (props) => {
    return (
            <div className="main-wrapper">
                <div className="main-inner">
                    <h1>Categorias</h1>
                    <div className="categorias">
                        {props.cat.map(c => (
                        <Categorias key={c.ID} nombre={c.NOMBRE} ></Categorias>
                        ))}
                    </div>
                </div>
            </div>
        );
}
export default Cat;