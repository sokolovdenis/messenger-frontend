import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    signIn(login, password) {
        let model = {
            'login': login,
            'password': password
        }

        let api = localStorage.getItem('api');
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

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    handleLogin(event) {
        event.preventDefault();
        this.signIn(this.state.login, this.state.password).then(response=>response.json()
            .then(user=>({user, response})))
            .then(({user, response}) => {
                if (response.ok) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('expires', user.expires);
                    this.props.callback(localStorage.getItem('main_page'));
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));
    }

    handleGoToRegister(event) {
        event.preventDefault();
        this.props.callback(localStorage.getItem('reg_page'));
        this.forceUpdate();
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="login">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            autoFocus
                            type="login"
                            value={this.state.login}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.handleLogin.bind(this)}
                    >
                        Login
                    </Button>

                    <Button
                        block
                        type="submit"
                        onClick={this.handleGoToRegister.bind(this)}
                    >
                        Register Page
                    </Button>
                </Form>
            </div>
        );
    }
}