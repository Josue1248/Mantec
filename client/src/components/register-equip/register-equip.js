import React, { Component } from 'react';
import axios from 'axios';

class RegisterEquip extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            department: "",
            type: "",
            brand: "",
            model: "",
            serialNumber: "",
            characteristics: {}
        }
    }

    handleDepartment = (event) => {
        const department = event.target.value;

        this.setState({department: department})
    }

    handleType = (event) => {
        const type = event.target.value;

        this.setState({type: type})
    }

    handleBrand = (event) => {
        const brand = event.target.value;

        this.setState({brand: brand})
    }

    handleModel = (event) => {
        const model = event.target.value;

        this.setState({model: model})
    }

    handleSerialNumber = (event) => {
        const serialNumber = event.target.value;

        this.setState({serialNumber: serialNumber})
    }

    handleCharacteristics = (event) => {
        const password = event.target.value;

        this.setState({password: password})
    }

    handleAddBtn = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/equip/add",
        {
            department: this.state.department,
            type: this.state.type,
            brand: this.state.brand,
            model: this.state.model,
            serialNumber: this.state.serialNumber,
            characteristics: this.state.characteristics
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

        axios.put('http://localhost:5000/equip/' + this.state.id,
        {
            department: this.state.department,
            type: this.state.type,
            brand: this.state.brand,
            model: this.state.model,
            serialNumber: this.state.serialNumber,
            characteristics: this.state.characteristics
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
            <h2 className="form-signin-heading text-center">Registro de equipo</h2>
            <label className="sr-only">Departamento:</label>
            <input type="text" name="department" className="form-control" placeholder="Departamento" onBlur={this.handleDepartment} required autoFocus/>
            <br/>
            <label className="sr-only">Tipo:</label>
            <input type="text" name="type" className="form-control" placeholder="Tipo" onBlur={this.handleType}  required/>
            <br/>
            <label className="sr-only">Marca:</label>
            <input type="text" name="brand" className="form-control" placeholder="Marca" onBlur={this.handleBrand}  required/>
            <br/>
            <label className="sr-only">Modelo:</label>
            <input type="text" name="model" className="form-control" placeholder="Modelo" onBlur={this.handleModel} required/>
            <br/>
            <label className="sr-only">Numero de serie:</label>
            <input type="text" name="serialNumber" className="form-control" placeholder="Numero de serie" onBlur={this.handleSerialNumber}  required/>
            {/* <label className="sr-only">Caracteristicas:</label>
            <input type="password" name="password2" className="form-control" placeholder="Repetir contraseña" onBlur={this.handleCharacteristics}  required/> */}
            <br/>
            <button className="btn btn-primary" type="submit" disabled={!this.setState} onClick={this.handleAddBtn}>Registrar</button>
            <button className="btn btn-secondary" type="submit" disabled={!this.setState} onClick={this.handleUpdateBtn}>Modificar</button>
        </form>)
}
}

export default RegisterEquip;