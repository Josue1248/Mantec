import React, { Component } from 'react';

import './responsive-table.css';

class ResponsiveTable extends Component {

	fecthHeaders = () => {
		const { cols } = this.props;

		if(cols === undefined) return '';
		return (
			<tr>
				{
					Object.values(cols).map(function(col) {
						return (<th>{col}</th>)
					})
				}
			</tr>
		);
	}

	fecthRows = () => {
		const { rows } = this.props;

		return ( 
			rows.map(function(row) {
				return (<tr>
					{
						Object.values(row).map( function(value, idx){
							return <td data-label = {Object.keys(row)[idx]}>{value}</td>
						})
					}
				</tr>)
			})
		);
	}
	
	render(){
		return(
			<div>
				<h5 className='text-center mt-4'>{this.props.title}</h5>
				<table className={'responsive-table mt-0' + (this.props.className === undefined ? ' ' : this.props.className)}>
					<thead>
						{
							this.fecthHeaders()
						}
					</thead>
					<tbody>
						{
							this.fecthRows()
						}
					</tbody>
				</table>
			</div>
		);
	}
};

export default ResponsiveTable;