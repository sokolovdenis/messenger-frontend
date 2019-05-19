import React, { Component } from 'react';
import {signup} from "./Api";
import './App.css';

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
		 	login: '',
			password: '',
			name: ''
		};
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleLoginChange(event) {
		this.setState({'login': event.target.value})
	}

	handlePasswordChange(event) {
		this.setState({'password': event.target.value})
	}

	handleNameChange(event) {
		this.setState({'name': event.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();

		signup(this.state.login, this.state.password, this.state.name).then(token => {
			this.props.onTokenReceive(token);
		});
		console.log(this.state);

	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="SignUp">
				<input type="text" id="element" placeholder="Login..." onChange={this.handleLoginChange}/>
				<input type="text" id="element" placeholder="Password..." onChange={this.handlePasswordChange}/>
				<input type="text" id="element" placeholder="Name..." onChange={this.handleNameChange}/>
				<button type="submit" id="element">Sign Up</button>
			</form>
		);
	}

}

export default SignUp;
