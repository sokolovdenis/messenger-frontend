import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:7 + 'vh'}}>
				<div className="navbar-nav">
					<a className="nav-item nav-link">{this.props.name}</a>
					<a onClick={this.props.logout} className="nav-item nav-link">Logout</a>
				</div>
			</nav>
		)
	}
}

export default Header