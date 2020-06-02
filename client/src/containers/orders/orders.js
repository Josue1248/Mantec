import React, { Component } from 'react';
import RegisterOrder from '../../components/register-order/register-order'
import ResponsiveTable from '../../components/table/responsive-table'
import Axios from 'axios';

class Orders extends Component {
	constructor(props){
        super(props);
        this.state = {
            user: '',
            orders: [],
            equipment: []
        }
    }

	componentDidMount() {
		Axios.get('http://localhost:5000/orders/')
		.then((response)=>{
			if(response.status === 200){
				this.handleUsers(response.data);
            } else {
                alert("No iniciaste sesion")
            }
        })
        Axios.get('http://localhost:5000/equip/')
		.then((response)=>{
			if(response.status === 200){
				this.handleEquipment(response.data);
            } else {
                alert("No iniciaste sesion")
            }
		})
	}

	handleUsers = (orders) => {
		this.setState({orders: orders})
    }
    
    handleEquipment = (equipment) => {
		this.setState({equipment: equipment})
	}

	render() {
		return (
			<div>
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerUser">Registrar orden</button>
				<ResponsiveTable
					title='Usuarios'
					cols={
						{
							user: 'Usuario',
							equip: 'Equipo',
							type: 'Tipo de servicio',
                            requestDate: 'Fecha de solicitud',
                            lastUpdate: 'Ultima actualización',
                            status: 'Estado'
						}
					} 
					rows={this.state.orders}
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
							<RegisterOrder />
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

export default Orders;