import React, { useState,useEffect }  from 'react';
import one from '../1.jpg';
import style from './busqueda.module.css'
import {Row,Col,ButtonGroup,Button} from 'react-bootstrap'

const Busqueda = () => {
    const getCat = async () => {
        const response = await fetch ('http://localhost:3001/product');
        const data = await response.json();
        setCat(data);
      }
    
      function handleChange(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.NOMBRE.indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.NOMBRE.indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangePrecio(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.PRECIO.toString().indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.PRECIO.toString().indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangeMarca(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.MARCA.indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.MARCA.indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangeUbicacion(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.UBICACION.indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.UBICACION.indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangeRating(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.RATING.toString().indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.RATING.toString().indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangeCategoria(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.CATEGORIA.indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.CATEGORIA.indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }

      function handleChangeColor(e) {
        if(e.target.value.length>0){
          setCat(cat.filter(p => {
            if(p.COLOR.indexOf(e.target.value)!=-1)
              return p ;
          } ));
          console.log(cat.filter(p => {
            if(p.COLOR.indexOf(e.target.value)!=-1)
              return p ;
          } ));
        }
        else{
          getCat();
        }
      }
    
      const getCategorias = async () => {
        const response = await fetch ('http://localhost:3001/category');
        const data = await response.json();
        setCategorias(data);
      }
    
      const [cat, setCat] = useState([]);
    
      const [categorias, setCategorias] = useState([]);
    
      useEffect (()=>{
        getCat();
        getCategorias();
      },[]);
    return(
        <Row>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} className={style.busquedawrapper}>
            <h5>Resultados</h5>
            <div className={style.busquedainner}>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">Left</Button>
                  <Button variant="secondary">Middle</Button>
                  <Button variant="secondary">Right</Button>
                </ButtonGroup>
                <h5>Nombre</h5>
                <input name="search" onChange={handleChange}></input>
                <h5>Marca</h5>
                <input name="search" onChange={handleChangeMarca}></input>
                <h5>Categoria</h5>
                <input name="search" onChange={handleChangeCategoria}></input>
                <h5>Precio</h5>
                <input name="search" onChange={handleChangePrecio}></input>
                <h5>Ubicacion</h5>
                <input name="search" onChange={handleChangeUbicacion}></input>
                <h5>Rating</h5>
                <input name="search" onChange={handleChangeRating}></input>
                <h5>Color</h5>
                <input name="search" onChange={handleChangeColor}></input>
            </div>
        </Col>
        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div className="main-wrapper">
                <div className="main-inner">
                    {cat.map(c => (
                        <div className={style.product}>  
                        <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}> 
                          <h3>{c.NOMBRE}</h3>
                          <p>Q {c.PRECIO}</p>
                          <p>Marca: {c.MARCA}</p>
                          <p>Color: {c.COLOR}</p>
                          <p>Categoria: {c.CATEGORIA}</p>
                          <p>Rating: {c.RATING}</p> 
                          <p>Ubicacion: {c.UBICACION}</p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                          <img src={one} alt=""></img>
                        </Col>
                        </Row>
                        </div>
                    ))}
                </div>
            </div>
        </Col>
        </Row> 
    )
}

export default Busqueda;

