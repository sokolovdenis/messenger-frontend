import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav">
					<Link to="/" className="nav-item nav-link">Home</Link>
					<a onClick={this.props.logout} className="nav-item nav-link">Logout</a>
				</div>
			</nav>
		)
	}
}

export default Header