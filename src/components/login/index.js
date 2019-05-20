// Компонент входа
// При успешном входе вызывает колбек с токеном авторизации

import React from "react";
import {signin} from "../../serverApi";
import './styles.css';


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,

            // form fields
            login: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateUserInput = this.validateUserInput.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if( this.validateUserInput() ) {
            let signinPromise = signin(this.state.login, this.state.password);
            signinPromise.then(data => {
                this.props.onSuccess(data["token"]);
            }).catch(errorMessage => {
                this.setState({error: errorMessage});
            });
        } else {
            this.setState({error: "Some fields are missing"})
        }
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validateUserInput() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <div className="Login">
                <div className="error-message">{this.state.error}</div>
                <form onSubmit={this.handleSubmit} className="Form">

                    <div className="Form-Fields">
                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" for="login-input">Login</label>
                            <input type="text"
                                   name="login"
                                   id="login-input"
                                   value={this.state.login}
                                   onChange={this.handleInputChange}/>
                        </div>

                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" for="password-input">Password</label>
                            <input type="password"
                                   id="password-input"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </div>
                    </div>

                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

export default Login;
