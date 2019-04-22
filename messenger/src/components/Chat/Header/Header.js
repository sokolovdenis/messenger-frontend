import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav">
					<a className="nav-item nav-link">{this.props.name}</a>
					<a onClick={this.props.logout} className="nav-item nav-link">Logout</a>
				</div>
			</nav>
		)
	}
}

export default Header