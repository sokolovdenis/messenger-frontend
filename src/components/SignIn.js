import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignIn.css';
import api from './../Api.js'
import SignUp from './SignUp.js'


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signUp = this.signUp.bind(this);
    }

    handleLoginChange(event) {
        this.setState({'login': event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Login = ' + this.state.login + '\nPassword = ' + this.state.password);
        signIn(this.state.login, this.state.password)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    signUp() {
        console.log("Sign Up");
        ReactDOM.render(
            <SignUp />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <form className="SignIn" onSubmit={this.handleSubmit}>
                <h2 className="SignIn-heading">Sign In</h2>
                <label htmlFor="inputLogin" className="sr-only">Login: </label>
                <input type="text" name="inputLogin" onChange={this.handleLoginChange} className="form-control" placeholder="Login" required autoFocus />
                <br />
                <br />
                <label htmlFor="inputPassword" className="sr-only">Password: </label>
                <input type="text" name="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                <br />
                <br />
                <button className="btn btn-default" type="submit">Sign In</button>
                <br />
                <br />
                <br />
                <br />
                <button className="btn" type="button" onClick={this.signUp}>Sign Up</button>
            </form>
        );
    }
}

function signIn(login, password) {
    let model = {
        'login' : login,
        'password' : password
    };

    let url = api + '/api/authentication/signin';

    return fetch(url, {
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(model)
    });
}

export default SignIn;
