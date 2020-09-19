import React, { Component } from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import swal from "sweetalert";
import {Tabs,Tab} from 'react-bootstrap'

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {user: props.user};
      }

      handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const send = {};
        
        for (var [key, value] of data.entries()) { 
            send[key] = value;
        }
        
        const rawResponse = await fetch('http://localhost:3001/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(send)
        });

        const content = await rawResponse.json();
        if(content.status==1){
            swal("Bienvenido!", send.email+ " "+ content.tipo, "success");
            this.state.user = send.email;
            this.props.handler(send.email,content.tipo);
            //this.user = send.email;
            window.location.href = "/search";
        }
        else{
            swal("Error en correo o contraseña", send.email+ " "+ content.tipo, "error");
        }
        document.getElementById("create-course-form").reset();        
      }

      handleSubmitEmpresa = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const send = {};
        
        for (var [key, value] of data.entries()) { 
            send[key] = value;
        }
        
        const rawResponse = await fetch('http://localhost:3001/company/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(send)
        });

        const content = await rawResponse.json();
        if(content.status==1){
            swal("Puede ver sus productos", send.email+ " "+ content.tipo, "success");
            this.state.user = send.email;
            this.props.handler(send.email,content.tipo);
            localStorage.setItem("eID", content.id);
            //this.user = send.email;
            window.location.href = "/search";
        }
        else{
            swal("Error en correo o contraseña", send.email+ " "+ content.tipo, "error");
        }
        document.getElementById("create-course-form").reset();        
      }

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="usuarios" title="Usuarios">
                    <form onSubmit={this.handleSubmit} id="create-course-form">
                        <h3>Ingresar  Usuario</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input  id="email" name="email"  type="email" className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input  id="password" name="password"  type="password" className="form-control" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                        <p className="forgot-password text-right">
                            Olvide mi <a href="#">password?</a>
                        </p>
                    </form>
                </Tab>
                <Tab eventKey="empresa" title="Empresa">
                    <form onSubmit={this.handleSubmitEmpresa} id="create-course-form">
                        <h3>Ingresar Empresa</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input  id="email" name="email"  type="email" className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input  id="password" name="password"  type="password" className="form-control" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                        <p className="forgot-password text-right">
                            Olvide mi <a href="#">password?</a>
                        </p>
                    </form>
                </Tab>
            </Tabs>
            
            </div>
            </div>
        );
    }
}
export default Login;