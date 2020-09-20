import React, { useState,useEffect } from 'react';
import style from './profile.module.css'
import {Row,Col,Tab,Nav} from 'react-bootstrap'
import swal from "sweetalert";
import Select from 'react-select';
import GoogleMapReact from 'google-map-react';
import Locationpin from "./locationpin"
import axios from 'axios';

const Profile = (props) => {

  const geteId = () => {
    let id = localStorage.getItem("eID");
    seteId(id);
    getUbicacion();
  }

  const location = {
    address: 'Ubicacion 1',
    lat: 14.601535,
    lng: -90.514437
  }

  const getUbicacion= async () => {
    const send = {};
    send['eID'] = localStorage.getItem("eID");
    const rawResponse = await fetch('http://localhost:3001/company/ubicacion', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(send)
  });
    const data = await rawResponse.json();
    let capitals = data.map(function(obj) { 
      obj['value'] = obj['ID']; 
      obj['label'] = obj['NOMBRE']; 
      delete obj['ID']; 
      delete obj['NOMBRE']; 
      return obj; 
    }); 
    console.log("hola",capitals);
    setUbicacion(capitals);
  }


  const getMarca = async () => {
    const response = await fetch ('http://localhost:3001/brand');
    const data = await response.json();
    let capitals = data.map(function(obj) { 
      obj['value'] = obj['ID']; 
      obj['label'] = obj['MARCA']; 
      delete obj['ID']; 
      delete obj['MARCA']; 
      return obj; 
    }); 
    console.log(capitals);
    setMarca(capitals);
  }

  const getCategorias = async () => {
    const response = await fetch ('http://localhost:3001/category');
    const data = await response.json();
    let capitals = data.map(function(obj) { 
      obj['value'] = obj['ID']; 
      obj['label'] = obj['NOMBRE']; 
      delete obj['ID']; 
      delete obj['NOMBRE'];
      return obj; 
  }); 
    console.log(capitals);
    setCategorias(capitals);
  }

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarca] = useState([]);
  const [eId, seteId] = useState(0);
  const [ubicaciones, setUbicacion] = useState([]);
  

  useEffect (()=>{
    getMarca();
    getCategorias();
    geteId();
    
  },[]);

  async function handleSubmit (event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    const send = {};
    data.append('file', event.target.imagen.files[0]);
    
    for (var [key, value] of data.entries()) { 
      send[key] = value;
    }

    send["ide"] = localStorage.getItem("eID");
    delete send.imagen;

    const rawResponse2 = await fetch('http://localhost:3001/company/product', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(send)
    });
    const content = await rawResponse2.json();
    
    console.log("Antes subir imagen");

    
    axios.post('http://localhost:3001/product/img', data, {
      onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
          ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
      }
  }).then(res => {
      console.log(res);
  }).catch(err => console.log(err))


    console.log("despues subir imagen");
    
    if(content.status==1){
        swal("Insertado", send.nombre+ " "+ send.precio+ " "+ send.color, "success");
    }
    else{
        swal("Error en correo o contraseña", send.nombre+ " "+ send.precio+ " "+ send.color, "error");
    }


    document.getElementById("create-course-form").reset();
    
    
  }

  async function handleSubmitEmpresa (event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const send = {};
    
    for (var [key, value] of data.entries()) { 
        send[key] = value;
    }
    console.log("empresa",send);
    const rawResponse = await fetch('http://localhost:3001/company/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(send)
    });
      const content = await rawResponse.json();
      if(content.status==1){
        swal("Insertado", send.nombre+ " "+ send.usuario, "success");
    }
    else{
        swal("Error ", send.nombre+ " "+ send.usuario, "error");
    }
    document.getElementById("create-course-form").reset();
    
  }

  async function handleSubmitPassword (event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const send = {};
    
    for (var [key, value] of data.entries()) { 
        send[key] = value;
    }
    send["usuario"] = localStorage.getItem("user");
    console.log("password",send);
    const rawResponse = await fetch('http://localhost:3001/company/password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(send)
    });
      const content = await rawResponse.json();
      if(content.status==1){
        swal("Exito","Password actualizado exitosamente", "success");
    }
    else{
        swal("Error ", "Error al actualizar password", "error");
    }
    document.getElementById("create-course-form").reset();
    
  }

  const tipo = props.tipo;
    return(
      <div className={style.profilewrapper}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Detalles Perfil</Nav.Link>
            </Nav.Item>
            {tipo == 0 &&
              <Nav.Item>
                <Nav.Link eventKey="third">Agregar Empresa</Nav.Link>
              </Nav.Item>
            }
            {tipo == 1 &&
              <Nav.Item>
                <Nav.Link eventKey="forth">Agregar Reseña</Nav.Link>
              </Nav.Item>
            }
            {tipo == 2 &&
            <Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Agregar Producto</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">Agregar Ubicacion</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">Cambiar Password</Nav.Link>
              </Nav.Item>
              </Nav.Item>
            }
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className={style.container}>
            <Tab.Pane eventKey="first">
              Este es el 
              {props.user}
              {props.tipo}
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <form onSubmit={handleSubmit} id="create-course-form">
                  <h3>Agregar Producto</h3>

                  <div className="form-group">
                      <label>Nombre</label>
                      <input  id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                  </div>

                  <div className="form-group">
                      <label>Marca</label>
                      <Select name="idmarca" id="idmarca" options={marcas} className="form-control">
                      </Select>
                  </div>

                  <div className="form-group">
                      <label>Categoria</label>
                      <Select name="idcategoria" id="idcategoria" options={categorias} className="form-control">
                      </Select>
                  </div>

                  <div className="form-group">
                      <label>Precio</label>
                      <input  id="precio" name="precio" className="form-control" placeholder="Precio" />
                  </div>

                  <div className="form-group">
                      <label>Color</label>
                      <input  id="color" name="color" className="form-control" placeholder="Color" />
                  </div>

                  <div className="form-group">
                      <label>Ubicacion</label>
                      <Select name="idubicacion" id="idubicacion" options={ubicaciones} className="form-control">
                      </Select>
                  </div>

                  <div className="form-group">
                      <label>Imagen</label>
                      <input type="file" name="imagen"/>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Guardar Producto</button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <form onSubmit={handleSubmit} id="create-course-form">
                  <h3>Agregar Ubicacion</h3>

                  <div className="form-group">
                      <label>Nombre</label>
                      <input  id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                  </div>

                  <div className={style.map}>
                    <h2 className={style.maph2}>Agregue la ubicacion en el mapa</h2>

                    <div className={style.googlemap}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCmy_hgQk0UpmjRKYtkdpWpSDTrNVgXXWQ' }}
                        defaultCenter={location}
                        defaultZoom={17}
                      >
                        <Locationpin 
                          lat={location.lat}
                          lng={location.lng}
                          text={location.address}
                        />
                      </GoogleMapReact>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Guardar Ubicacion</button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <form onSubmit={handleSubmitEmpresa} id="create-course-form">
                  <h3>Agregar Empresa</h3>
                  <div className="form-group">
                      <label>Nombre</label>
                      <input  id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="form-group">
                      <label>Correo</label>
                      <input  id="usuario" name="usuario" className="form-control" placeholder="Correo" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Guardar Empresa</button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="sixth">
              <form onSubmit={handleSubmitPassword} id="create-course-form">
                  <h3>Cambiar Password</h3>
                  <div className="form-group">
                      <label>Password Nuevo</label>
                      <input  id="password" name="password" className="form-control" placeholder="" />
                  </div>
                  <div className="form-group">
                      <label>Confirmar Password</label>
                      <input  id="password2" name="password2" className="form-control" placeholder="" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Cambiar password</button>
              </form>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    )
}

export default Profile;

