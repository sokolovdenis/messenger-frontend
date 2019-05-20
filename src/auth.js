import React from 'react';
import './auth.css';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"

let baseUrl = 'http://messenger.westeurope.cloudapp.azure.com';

export class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            login: '',
            password: ''
        };
        this.onUpdateLogin = this.onUpdateLogin.bind(this);
        this.onUpdatePassword = this.onUpdatePassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }
    // componentDidMount() {
    //     if (localStorage.getItem('token') !== '') {
    //         this.setState({
    //             isAuthorized: true
    //         })
    //     }
    // }

    onSignIn(e) {
        e.preventDefault();
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
        };
        let url = baseUrl + '/api/authentication/signin';
        let self = this;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                localStorage.setItem('token', data['token']);
                // alert(localStorage.getItem('token'));
                self.setState({
                    isAuthorized: true
                });
            },
            error: function(data)
            {
                alert("Wrong auth data");
            }
        });
    }
    onUpdateLogin(e) {
        this.setState({
            login: e.target.value
        });
        // this.state['login'] = e.target.value;
    }
    onUpdatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return !this.state.isAuthorized ? (
            <div id="auth-block">
                <div>This is authorization page. Enter your login and password to sign in:</div>
                <p className="input-name">Login</p>
                <input className="input-field" id="login-field" value={this.state.login} onChange={this.onUpdateLogin}/>
                <p className="input-name">Password</p>
                <input className="input-field" id='password-field' value={this.state.password} onChange={this.onUpdatePassword}/>
                <div id="sign-in-button" onClick={this.onSignIn}>Sing In</div>
                <div>If you don't have account, please <Link to='/register' id='sign-up-button'>sign up</Link>.</div>
            </div>
        ) : (
            <Redirect to='/main'/>
        );
    }
}

export default AuthComponent;