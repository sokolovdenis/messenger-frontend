import React from "react";
import './register.css';
import $ from "jquery";
import { Redirect } from "react-router-dom"

let baseUrl = 'http://messenger.westeurope.cloudapp.azure.com';

export class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            name: '',
            login: '',
            password: ''
        };
        this.onUpdateName = this.onUpdateName.bind(this);
        this.onUpdateLogin = this.onUpdateLogin.bind(this);
        this.onUpdatePassword = this.onUpdatePassword.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }
    onRegister(e) {
        e.preventDefault();
        if (this.state.name === '') {
            alert('You haven\'t filled the "name" field yet.');
            return;
        }
        if (this.state.login === '') {
            alert('You haven\'t filled the "login" field yet.');
            return;
        }
        if (this.state.password === '') {
            alert('You haven\'t filled the "password" field yet.');
            return;
        }
        let data = {
            "login": this.state.login,
            "password": this.state.password,
            "name": this.state.name
        };
        let url = baseUrl + '/api/authentication/signup';
        let self = this;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                localStorage.setItem('token', data['token']);
                self.setState({
                    isAuthorized: true
                });
            },
            error: function(data)
            {
                if (data.status === 409) {
                    alert("Login is already used. Try another one.");
                }
                else {
                    alert("Sorry. Something went wrong.");
                }
            }
        });
    }
    onUpdateLogin(e) {
        this.setState({
            login: e.target.value
        });
    }
    onUpdateName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onUpdatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    render() {
        return !this.state.isAuthorized ?
            (<div id="register-block">
                <div>This is registration page. Enter data to register:</div>
                <p className="r-input-name">Name</p>
                <input className="r-input-field" id="r-name-field" value={this.state.name} onChange={this.onUpdateName}/>
                <p className="r-input-name">Login</p>
                <input className="r-input-field" id="r-login-field" value={this.state.login} onChange={this.onUpdateLogin}/>
                <p className="r-input-name">Password</p>
                <input className="r-input-field" id='r-password-field' value={this.state.password} onChange={this.onUpdatePassword}/>
                <div id="register-button" onClick={this.onRegister}>Register</div>
            </div>) : (
                <Redirect to='/main'/>
            );
    }
}
export default RegisterComponent;