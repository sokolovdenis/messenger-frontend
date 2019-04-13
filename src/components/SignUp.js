import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignUp.css';
import SignIn from './SignIn.js'
import api from './../Api.js'


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : '',
            name : ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signIn = this.signIn.bind(this);
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
        console.log('Login = ' + this.state.login +
            '\nPassword = ' + this.state.password +
            '\nName = ' + this.state.name);

        signUp(this.state.login, this.state.password, this.state.name)
            .then(res => console.log(res.json()))
            .catch(error => console.log(error));
    }

    signIn() {
        console.log("Sign In");
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <form className="SignUp" onSubmit={this.handleSubmit}>
                <h2 className="SignUp-heading">Sign Up</h2>
                <label htmlFor="inputLogin" className="sr-only">Login: </label>
                <input type="text" name="inputLogin" onChange={this.handleLoginChange} className="form-control" placeholder="Login" required autoFocus />
                <br />
                <br />
                <label htmlFor="inputPassword" className="sr-only">Password: </label>
                <input type="text" name="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                <br />
                <br />
                <label htmlFor="inputName" className="sr-only">Name: </label>
                <input type="text" name="inputName" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                <br />
                <br />
                <button className="btn btn-default" type="submit">Sign Up</button>
                <br />
                <br />
                <br />
                <br />
                <button className="btn" type="button" onClick={this.signIn}>Sign In</button>
            </form>
        );
    }
}

function signUp(login, password, name) {
    let model = {
        'login' : login,
        'password' : password,
        'name' : name
    };

    let url = api + '/api/authentication/signup';

    return fetch(url, {
        method : 'post',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(model)
    });
}

export default SignUp;