import React, { Component } from 'react';
import RegisterEquip from '../../components/register-equip/register-equip'
import ResponsiveTable from '../../components/table/responsive-table'
import Axios from 'axios';

class Users extends Component {
	constructor(props){
        super(props);
        this.state = {
            equipment: []
        }
    }

	componentDidMount() {
		Axios.get('http://localhost:5000/equip/')
		.then((response)=>{
			if(response.status === 200){
				this.handleEquipment(response.data);
            } else {
                alert("No iniciaste sesion")
            }
		})
		
	}

	handleEquipment = (equipment) => {
		this.setState({equipment: equipment})
	}

	render() {
		return (
			<div>
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Registrar equipo</button>
				<ResponsiveTable 
					title='Equipo'
					cols={
						{
							idNumber: '# identificacion',
							department: 'Departamento',
							type: 'Tipo',
							brand: 'Marca',
                            model: 'Modelo',
                            serialNmber: 'Numero de serie'
						}
					} 
					rows={this.state.equipment}
				/>
				<br/>
				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Registrar equipo</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
						<RegisterEquip />
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