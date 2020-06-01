import React, { Component } from 'react';
import axios from 'axios';

class RegisterUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            role: "3",
            isReady: false
        }
    }

    handleFirstName = (event) => {
        const fname = event.target.value;

        this.setState({fname: fname})
    }

    handleLastName = (event) => {
        const lname = event.target.value;

        this.setState({lname: lname})
    }

    handleEmail = (event) => {
        const email = event.target.value;

        this.setState({email: email})
    }

    handlePassword = (event) => {
        const password = event.target.value;

        this.setState({password: password})
    }

    handleConfirmPassword = (event) => {
        const password = event.target.value;

        if(this.state.password !== password){
            alert("Las contraseñas no coinciden")
            this.setState({isReady: false})
        } else {
            this.setState({isReady: true})
        }
    }

    handleRole = (event) => {
        const role = event.target.value;

        this.setState({role: role})
    }

    handleAddBtn = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/users/add",
        {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        })
        .then(function (response) {
            console.log(response)
            if(response.status === 200){
                alert(response.data.msg)
            } else {
                alert("Usuario no registrado")
            }
        })
    }

    handleUpdateBtn = (event) => {
        event.preventDefault();

        axios.put('http://localhost:5000/users/' + this.state.email,
        {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        })
        .then(function (response) {
            console.log(response)
            if(response.status === 200){
                alert(response.data.msg)
            } else {
                alert("Usuario no registrado")
            }
        })
    }

    render(){
        return(
            <form>
                <h2 className="form-signin-heading text-center">Registro de usuario</h2>
                <label className="sr-only">Nombre:</label>
                <input type="text" name="fname" className="form-control" placeholder="Nombre" onBlur={this.handleFirstName} required autoFocus/>
                <br/>
                <label className="sr-only">Apellidos:</label>
                <input type="text" name="lname" className="form-control" placeholder="Apellidos" onBlur={this.handleLastName}  required/>
                <br/>
                <label className="sr-only">Correo:</label>
                <input type="text" name="email" className="form-control" placeholder="Correo institucional" onBlur={this.handleEmail}  required/>
                <br/>
                <label className="sr-only">Contraseña:</label>
                <input type="text" name="password" className="form-control" placeholder="Contraseña" onBlur={this.handlePassword} required/>
                <br/>
                <label className="sr-only">Confirmar contraseña:</label>
                <input type="text" name="password2" className="form-control" placeholder="Repetir contraseña" onBlur={this.handleConfirmPassword}  required/>
                <br/>
                <label>Tipo de usuario</label>
                <select className="form-control" name="role" onChange={this.handleRole} value={this.state.role}>
                    <option value="1">Administrador</option>
                    <option value="2">Tecnico</option>
                    <option value="3">Empleado</option>
                </select>
                <br/>
                <button className="btn btn-primary" type="submit" disabled={!this.setState} onClick={this.handleAddBtn}>Registrar</button>
                <button className="btn btn-secondary" type="submit" disabled={!this.setState} onClick={this.handleUpdateBtn}>Modificar</button>
            </form>)
    }
}

export default RegisterUser;
