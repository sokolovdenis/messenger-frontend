import React, { Component } from 'react';
import '../css/Header.css'

class Header extends Component {
	render() {
		return (
			<div className="header">
				<a className="name">Profile name: {this.props.name}</a>
				<a onClick={this.props.logout} className="exit">Exit</a>
			</div>
		)
	}
}

export default Header
