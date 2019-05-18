import React, { Component } from 'react';
import { signin } from './api'
import './signForm.css'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        signin(this.state.login, this.state.password)
            .then(token => {
                console.log("SignIn -> handleSubmit() -> sigin() with token = " + token);
                return this.props.onTokenReceive(token)
            });
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit} className="signForm">
                <h3>Sign in, please</h3>
                <label>
                    Login:
                    <input
                        type='text'
                        onChange={this.handleLoginChange}
                        placeholder="..."
                        required
                        autoFocus
                      />
                </label>
                <br />
                <label>
                    Password: 
                    <input
                        type='password'
                        onChange={this.handlePasswordChange}
                        placeholder="..."
                        required
                    />
                </label>
                <br />
                <input type="submit" value='Sign in!'/>
            </form>
        );

    }
}

export default SignIn;
