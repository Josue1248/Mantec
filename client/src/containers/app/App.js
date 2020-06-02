import React, { Component } from 'react';
import Tabs from '../nav-bar/nav-bar'
import Users from '../users/users'
import Equipment from '../equip/equip'
import Orders from '../orders/orders'

import './App.css';

class App extends Component {
	constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

	componentDidMount() {
		console.log('Ok')
	}

	handleUsers = (users) => {
		this.setState({users: users})
	}

	render() {
		const tabNames = ['Usuarios', 'Equipo', "Ordenes"]
		const components = [<Users />, <Equipment />, <Orders /> ]

		return (
			<div>
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
			</div>
		);
	}
}

export default App;
