import React, { Component } from 'react';
import axios from 'axios';

class RegisterOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            equip: "",
            serviceType: "",
            status: "1"
        }
    }

    handleUser = (event) => {
        const user = event.target.value;

        this.setState({user: user})
    }

    handleEquip = (event) => {
        const equip = event.target.value;

        this.setState({equip: equip})
    }

    handleServiceType = (event) => {
        const serviceType = event.target.value;

        this.setState({serviceType: serviceType})
    }

    handleStatus = (event) => {
        const status = event.target.value;

        this.setState({status: status})
    }

    handleAddBtn = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/orders/add", this.state)
        .then(function (response) {
            console.log(response)
            if(response.status === 200){
                alert(response.data.msg)
            } else {
                alert("Orden no registrada")
            }
        })
    }

    handleUpdateBtn = (event) => {
        event.preventDefault();

        axios.put('http://localhost:5000/orders/' + this.state.id, this.state)
        .then(function (response) {
            console.log(response)
            if(response.status === 200){
                alert(response.data.msg)
            } else {
                alert("La orden no se ha podido modificar")
            }
        })
    }

    render(){
        return(
            <form>
                <label className="sr-only">Usuario:</label>
                <input type="text" name="idNumber" className="form-control" placeholder="Usuario" onBlur={this.handleUser} required autoFocus/>
                <br/>
                <label className="sr-only">Equipo:</label>
                <input type="text" name="department" className="form-control" placeholder="Equipo" onBlur={this.handleEquip} required autoFocus/>
                <br/>
                <label className="sr-only">Tipo de servicio:</label>
                <input type="text" name="type" className="form-control" placeholder="Tipo de servicio" onBlur={this.handleServiceType}  required/>
                <br/>
                <label className="sr-only">Estado:</label>
                <select className="form-control" name="role" onChange={this.handleStatus} value={this.state.status}>
                    <option value="1">Enviada</option>
                    <option value="2">En proceso</option>
                    <option value="3">Cancelada</option>
                    <option value="4">Terminada</option>
                </select>
                <br/>
                <button className="btn btn-primary" type="submit" disabled={!this.setState} onClick={this.handleAddBtn}>Registrar</button>
                <button className="btn btn-secondary" type="submit" disabled={!this.setState} onClick={this.handleUpdateBtn}>Modificar</button>
            </form>)
    }
}

export default RegisterOrder;