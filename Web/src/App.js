import React, { Component,useState,useEffect }  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import style from './App.module.css';
import logo from './search.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import history from "./history.js";

import Login from "./components/login";
import SignUp from "./components/signup";
import Cat from "./components/cat"
import Main from "./components/main";
import Busqueda from "./components/busqueda";
import Profile from "./components/profile";

class App extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      cat: [],
      categorias: [],
      isLoggedIn:false,
      tipo:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  
  async getCat() {
    const response = await fetch ('http://localhost:3001/product');
    const data = await response.json();
    console.log("NY");
    console.log(data);
    this.setState((state) => {
      return {cat: data}
    });
  }

  async getCategorias(){
    const response = await fetch ('http://localhost:3001/category');
    const data = await response.json();
    this.setState((state) => {
      return {categorias: data}
    });
  }

  handleChange(e) {
    if(e.target.value.length>0){
      this.setState((state) => {
      return {cat: state.cat.filter(p => {
        if(p.NOMBRE.indexOf(e.target.value)!=-1)
          return p ;
      } )}
    });
    }
    else{
      this.getCat();
    }
  }
  
  handleKeyPress(event) {
    if(event.key === 'Enter'){
      history.push('/search')
    }
  }

  setUser(u,t){
    localStorage.setItem("user", u);
    localStorage.setItem("log", true);
    localStorage.setItem("tipo", t);
    this.setState({user: u,isLoggedIn:true,tipo:t});
  }

  logOut(){
    localStorage.setItem("user","")
    localStorage.setItem("log",false)
    localStorage.removeItem("tipo")
    this.setState({user: "",isLoggedIn:false,tipo:0});
  }
  
  componentDidMount(){
    if(localStorage.getItem("log")){
      this.setState({user: localStorage.getItem("user"),isLoggedIn:true,tipo:localStorage.getItem("tipo")});
    }
    this.getCat();
    this.getCategorias();
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <ul className="navbar-nav ml-auto"> 
                  <li className="nav-item">
                    <Link className="nav-link" to={"/cat"}>Categorias</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/log-out"} onClick={() => this.logOut()} >Log out</Link>
                  </li>
                </ul>;
    } else {
      button = <ul className="navbar-nav ml-auto"> 
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-in"}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-up"}>Registro</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/cat"}>Categorias</Link>
      </li>
    </ul>;;
    }
  return (
    <Router>
    <div className={style.back}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}><img className={style.img} src={logo} alt="Logo" /></Link>
          <Link className="navbar-brand" to={"/profile"}><h5>{localStorage.getItem("user")}</h5></Link>
          <input name="search" className={style.search} onChange={this.handleChange} onKeyPress={this.handleKeyPress} ></input>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {button}
          </div>
        </div>
      </nav>
      <Switch>
          <Route exact path='/'>
              <Main cat={this.state.cat}/>
          </Route>
          <Route path="/sign-in">
              <Login user={this.state.user} handler={this.setUser}/>
          </Route>
          <Route path="/sign-up"> 
              <SignUp/>
          </Route>
          < Route path="/search">
              <Busqueda/>
          </Route>
          <Route path="/cat" >
              <Cat cat={this.state.categorias}/>
          </Route>
          <Route path="/log-out" >
          </Route>
          < Route path="/profile">
              <Profile user={this.state.user} tipo={this.state.tipo}/>
          </Route>
      </Switch>
    </div>
    </Router>
  );
  }
}

export default App;
