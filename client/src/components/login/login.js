import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsername = (event) => {
        const username = event.target.value;

        this.setState({
            username: username
        })
    }

    handlePassword = (event) => {
        const password = event.target.value;

        this.setState({
            password: password
        })
    }

    handleSubmitBtn = (event) => {
        event.preventDefault()
        
        axios.post("http://localhost:5000/login", this.state)
        .then(function (response) {
            console.log(response)
            if(response.status === 200){
                alert("Iniciaste sesion")
            } else {
                alert("No iniciaste sesion")
            }
        })
    }

    render(){
        return(
        <div className="form-group col col-sm-6">
            <form>
                <h2 className="text-center">Iniciar sesion</h2>
                <label htmlFor="username">Correo:</label>
                <input type="email" name="username" className="form-control" onBlur={this.handleUsername}/>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" name="password" className="form-control" onBlur={this.handlePassword}/>
                <br/>
                <button className="btn btn-primary" onClick={this.handleSubmitBtn}>Iniciar sesion</button>
            </form>
        </div>
        );
    }
}

export default LogIn;
