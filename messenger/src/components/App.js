import React, { Component } from 'react';
// import Auth from './Auth/Auth';
import Chat from './Chat/Chat';
import Header from './Header';
import { withCookies } from 'react-cookie';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'


class App extends Component {
	render() {
		return (
			<div className='container'>
				<Header cookies={this.props.cookies}/>
				<Chat cookies={this.props.cookies}/> 
			</div>
		)
	}
}

export default withCookies(App);