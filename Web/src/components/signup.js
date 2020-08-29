import React, { Component } from "react";

class SignUp extends React.Component{
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const send = {};
        
        for (var [key, value] of data.entries()) { 
            send[key] = value;
           }
        console.log(send);
        const rawResponse = await fetch('http://localhost:3001/users/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(send)
        });

        const content = await rawResponse.json();

        if(content==1){
            window.alert("Usuario registrado exitosamente");
            window.location.href = "/sign-in";
        }
        else{
            window.alert("Usuario ya existente");
        }
        document.getElementById("create-course-form").reset();

        
      }

      render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit} id="create-course-form">
                        <h3>Registrarse</h3>

                        <div className="form-group">
                            <label>Nombre</label>
                            <input id="nombre" name="nombre" type="text" className="form-control" placeholder="Nombre" />
                        </div>

                        <div className="form-group">
                            <label>Apellido</label>
                            <input id="apellido" name="apellido" type="text" className="form-control" placeholder="Apellido" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input id="email" name="email" type="email" className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input id="password" name="password" type="password" className="form-control" placeholder="Password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                        <p className="forgot-password text-right">
                            Ya me registre <a href="/sign-in">ir a Ingresar?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
export default SignUp;