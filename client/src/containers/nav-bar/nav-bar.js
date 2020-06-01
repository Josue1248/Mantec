import React from 'react';
import NavItem from '../../components/nav-item/nav-item';

export default class Tests extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'Usuarios',
		};
	}

	onClickTab = (tab) => {
		this.setState({ activeTab: tab });
	}

	render() {
		const {
			onClickTab,
			props: {
				children,
			},
			state: {
				activeTab,
			}
		} = this;

		return (<div >
			<nav className = 'navbar navbar-expand-lg navbar-light bg-light'>
				<div>
					<ul className='navbar-nav'>
						{children.map((child) => {
							const { label } = child.props;
							return (
							<NavItem
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTab}
							/>
							);
						})}
					</ul>
				</div>
			</nav>
			<div className='container'>
					{children.map((child) => {
						if (child.props.label !== activeTab) return undefined;
						return child.props.children;
					})}
			</div>
		</div>
		);
	}
}
