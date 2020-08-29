import React, { Component } from "react";

class Login extends React.Component{

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const send = {};
        
        for (var [key, value] of data.entries()) { 
            send[key] = value;
           }
        console.log(send);
        const rawResponse = await fetch('http://localhost:3001/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(send)
        });

        const content = await rawResponse.json();

        if(content==1){
            window.alert("Log in correcto");
            window.location.href = "/search";
        }
        else{
            window.alert("Error en correo o contraseña");
        }
        document.getElementById("create-course-form").reset();

        
      }

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={this.handleSubmit} id="create-course-form">
                <h3>Ingresar</h3>

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
            </div>
            </div>
        );
    }
}
export default Login;