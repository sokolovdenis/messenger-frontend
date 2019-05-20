// Компонент входа
// При успехе вызывает колбек с токеном авторизации

import React from "react";
import {signup} from "../../serverApi";
import './styles.css';


class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,

            // form fields
            name: "",
            login: "",
            password: "",
            confirmPassword: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateUserInput = this.validateUserInput.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const inputError = this.validateUserInput();
        if( !inputError ) {
            let signupPromise = signup(this.state.login, this.state.password, this.state.name);
            signupPromise.then(data => {
                this.props.onSuccess(data["token"]);
            }).catch(errorMessage => {
                this.setState({error: errorMessage});
            });
        } else {
            this.setState({error: inputError});
        }
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validateUserInput() {
        if( this.state.name.length > 0
            && this.state.login.length > 0
            && this.state.password.length > 0
            && this.state.confirmPassword.length > 0 )
        {
            if( this.state.password === this.state.confirmPassword ) {
                return null;
            } else {
                this.setState({error: "Passwords do not match", confirmPassword: ""});
            }
        } else {
            this.setState({error: "Some fields are missing"});
        }
    }

    render() {
        return (
            <div className="Registration">
                <div className="error-message">{this.state.error}</div>

                <form onSubmit={this.handleSubmit} className="Form">
                    <div className="Form-Fields">
                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" htmlFor="name-input">Name</label>
                            <input type="text"
                                   id="name-input"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleInputChange}/>
                        </div>

                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" htmlFor="login-input">Login</label>
                            <input type="text"
                                   id="login-input"
                                   name="login"
                                   value={this.state.login}
                                   onChange={this.handleInputChange}/>
                        </div>

                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" htmlFor="password-input">Password</label>
                            <input type="password"
                                   id="password-input"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </div>

                        <div className="Labeled-Text-Input">
                            <label className="Text-Input-Label" htmlFor="confirm-input">Confirm password</label>
                            <input type="password"
                                   id="confirm-input"
                                   name="confirmPassword"
                                   value={this.state.confirmPassword}
                                   onChange={this.handleInputChange}/>
                        </div>

                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default Registration;
