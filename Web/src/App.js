import React, { useState,useEffect }  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import style from './App.module.css';
import logo from './search.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Cat from "./components/cat"
import Main from "./components/main";
import Busqueda from "./components/busqueda";

const App = () => {
  
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
  
  function handleKeyPress(event) {
    if(event.key === 'Enter'){
      window.location.href = "/search";
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

  return (
    <Router>
    <div className={style.back}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}><img className={style.img} src={logo} alt="Logo" /></Link>
          <input name="search" className={style.search} onChange={handleChange} onKeyPress={handleKeyPress} ></input>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Registro</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/cat"}>Categorias</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
          <Route exact path='/'>
              <Main cat={cat}/>
          </Route>
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} /> 
          < Route path="/search" component={Busqueda} />
          <Route path="/cat" >
            <Cat cat={categorias}/>
          </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
