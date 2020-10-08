import React from "react";

import Producto from "./producto"


const Main = (props) => {
    
    return (
        <div className="main-wrapper">
            <div className="main-inner">
                <h1>Productos</h1>
                <div className="productos">
                {props.cat.map(c => (
                    <Producto key={c.ID} id={c.ID} nombre={c.NOMBRE} precio={c.PRECIO} marca={c.MARCA} color={c.COLOR} ubicacion={c.UBICACION}></Producto>
                ))}
                </div>
            </div>
        </div>
    );
    
}

export default Main;