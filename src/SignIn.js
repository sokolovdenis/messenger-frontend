import React, { Component } from 'react';
import {signin} from "./Api";
import SignUp from "./SignUp";
import './App.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            signIn: true
        };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({'login': event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        signin(this.state.login, this.state.password).then(token => {
            this.props.onTokenReceive(token);
        });
        console.log(this.state);
    }

    signUp() {
        this.setState({signIn: false})
    }

    signIn() {
        this.setState({signIn: true})
    }

    render() {
        return (
            this.state.signIn ? (
            <div className="SignIn">
                <form onSubmit={this.handleSubmit} className="SignForm">
                    <input type="text" id="element" placeholder="Login..." onChange={this.handleLoginChange}/>
                    <input type="text" id="element" placeholder="Password..." onChange={this.handlePasswordChange}/>
                    <button type="submit" id="element">Sign In</button>
                </form>

                <div>
                    <label> Do not have an account? </label>
                    <button type="button" id="element" onClick={() => this.signUp()}>Sign Up</button>
                </div>
            </div>
            ) : <SignUp onTokenReceive={this.props.onTokenReceive}/>
        );
    }

}

export default SignIn;
