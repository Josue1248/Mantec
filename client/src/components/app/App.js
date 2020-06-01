import React, { Component } from 'react';
import './App.css';
import Tabs from '../nav-bar/nav-bar'
import Login from '../login/login'
import RegisterUser from '../register-user/register-user'
import RegisterEquip from '../register-equip/register-equip'
import ResponsiveTable from '../table/responsive-table'
import Axios from 'axios';

class App extends Component {
	constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

	componentDidMount() {
		/*
		Axios.get('http://localhost:5000/users/')
		.then((response)=>{
			console.log(response)
			
			if(response.status === 200){
				this.handleUsers(response.data);
            } else {
                alert("No iniciaste sesion")
            }
		})
		*/
	}

	handleUsers = (users) => {
		this.setState({users: users})
	}

	render() {
		const tabNames = ['Iniciar sesion', 'Registro usuario', 'Registro Equipo']
		const components = [<Login/>, <RegisterUser />, <RegisterEquip />]

		return (
		<div className="container">
			<Tabs >
				{tabNames.map((t, keyT) => {
					return(<div label={t}>
						{components.map((c, keyC) => {
							if(keyT === keyC) {
								return(c)
							} else {
								return null
							}
						})}
					</div>)}
				)}
			</Tabs>
			{/*<Login />*/}
			{/*<RegisterUser />*/}
			{/*<RegisterEquip />*/}
			{/*<ResponsiveTable 
				title='Usuarios'
				cols={
					{
						Nombre: 'Nombre',
						Apellidos: 'Apellidos',
						Correo: 'Correo',
						Rol: 'Rol'
					}
				} 
				rows={this.state.users}
			/>*/}
		</div>
		);
	}
}

export default App;
