import React, { Component } from 'react';
import { signin, signup } from './api'
import "./App"

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            value: "sign_in",
        };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLoginChange(event) {
        this.setState({login: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmitSignIn(event) {
        event.preventDefault();

        let login = document.getElementsByName("login")[0].value;
        let pswd = document.getElementsByName("password")[0].value;

        this.setState(
            {
                login: login,
                password: pswd,
            });

        console.log("Login " + login + " password " + pswd);

        signin(login, pswd).then(token => {
            console.log("Token " + token);
            this.props.onTokenReceive(token);
        });
        console.log(this.state);
    }

    handleSubmitSignUp(event) {
        event.preventDefault();
        let login = document.getElementsByName("loginSignUp")[0].value;
        let pswd = document.getElementsByName("passwordSignUp")[0].value;
        let name = document.getElementsByName("nameSignUp")[0].value;

        signup(login, pswd, name).then(token => {
            console.log("Token " + token);
            this.props.onTokenReceive(token);
        })
    }

    handleRegister(event) {
        event.preventDefault();
        this.setState({value: "sign_up"});
    }

    render() {
        var screen = null;
        if (this.state.value === "sign_in") {
            screen =
                <div className="SignIn">
                    <form onSubmit={this.handleSubmitSignIn}>
                        <label>
                            Login:
                            <input type='text' name='login'/>
                        </label>
                        <label>
                            Password:
                            <input type='password' name='password'/>
                        </label>
                        <label>
                            <input type='submit' value={"SignIn"}/>
                        </label>

                    </form>
                    <button onClick={this.handleRegister}>
                        {"Register"}
                    </button>
                </div>
        } else {
            screen =
                <div className="SignIn">
                    <form onSubmit={this.handleSubmitSignUp}>
                        <label>
                            Login:
                            <input type='text' name="loginSignUp" />

                        </label>
                        <label>
                            Password:
                            <input type='password' name="passwordSignUp" />
                        </label>
                        <label>
                            Username:
                            <input type='text' name="nameSignUp" />
                        </label>
                        <label>
                            <input type='submit' value={"SignUp"}/>
                        </label>
                    </form>
                </div>

        }
        return (
            screen
        );

	}
}

export default SignIn;