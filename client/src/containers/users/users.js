import React, { Component } from 'react';
import RegisterUser from '../../components/register-user/register-user'
import ResponsiveTable from '../../components/table/responsive-table'
import Axios from 'axios';

class Users extends Component {
	constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

	componentDidMount() {
		Axios.get('http://localhost:5000/users/')
		.then((response)=>{
			console.log(response)
			
			if(response.status === 200){
				this.handleUsers(response.data);
            } else {
                alert("No iniciaste sesion")
            }
		})
		
	}

	handleUsers = (users) => {
		this.setState({users: users})
	}

	render() {
		return (
			<div>
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerUser">Registrar usuario</button>
				<ResponsiveTable
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
				/>
				<div class="modal fade" id="registerUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Registrar equipo</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
						<RegisterUser />
						</div>
						<div class="modal-footer">
						</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Users;