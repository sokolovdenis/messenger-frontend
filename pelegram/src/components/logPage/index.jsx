import React from 'react';
import './index.css';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import {Url, TokenName} from '../common/index.jsx'

export class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            invalid_input: false,
        };
        //localStorage.setItem(TokenName, "");

        this.onClickSignin = this.onClickSignin.bind(this);
    }

    onClickSignin() {
        let data = {
            login: this.state.login,
            password: this.state.password,
        };

        fetch(Url + '/api/authentication/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 200) {
                res.json().then(body => {
                    localStorage.setItem(TokenName, body["token"]);
                    this.props.history.push('/chat');
                });
            } else if (res.status === 400) {
                this.setState({invalid_input: true});
            }
        }).catch( e => {
            console.log("Error:", e);
        })
    }

    render() {
        return (
            <div className="basicPage">
                <div className={"sign"}>
                    <div className={"form-input"}>
                        <label className={"title-input"}> Login </label>
                        <input className={"sign-input"} onChange={e => this.setState({
                            login: e.target.value,
                            invalid_input: false,
                        })}
                        />
                    </div>
                    <div className={"form-input"}>
                        <label className={"title-input"}> Password </label>
                        <input className={"sign-input"} type="password"
                               onChange={e => this.setState({
                                   password: e.target.value,
                                   invalid_input: false,
                               })}
                        />
                    </div>
                    {this.state.invalid_input &&
                            <p className={"field-input-error"}> Invalid input </p>
                    }
                    <input type="submit" value="Sign in" className={"signin-btn"} onClick={this.onClickSignin}/>
                    <Link to={"/register"} className={"signup-btn"}>
                        <button className={"signup-btn"}> Sign up</button>
                    </Link>
                </div>
            </div>
        );
    }
}


export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            login: "",
            password: "",
            invalid_input: false,
            already_used: false,
        };

        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    onClickSubmit() {
        let data = {
            name: this.state.name,
            login: this.state.login,
            password: this.state.password,
        };

        fetch(Url + '/api/authentication/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        ).then(res => {
            if (res.status === 200) {
                res.json().then(body => {
                    localStorage.setItem(TokenName, body["token"]);
                    this.props.history.push('/chat');
                });
            } else if (res.status === 400) {
                this.setState({invalid_input: true});
            } else if (res.status === 409) {
                this.setState({already_used: true});
            }
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="basicPage">
                <div className={"sign"}>
                    <div className={"form-input"}>
                        <label className={"title-input"}> Username </label>
                        <input className={"sign-input"} onChange={e => this.setState({
                            name: e.target.value,
                            invalid_input: false,
                            already_used: false,
                        })}
                        />
                    </div>
                    <div className={"form-input"}>
                        <label className={"title-input"}> Login </label>
                        <input className={"sign-input"} onChange={e => this.setState({
                            login: e.target.value,
                            invalid_input: false,
                            already_used: false,
                        })}
                        />
                    </div>
                    <div className={"form-input"}>
                        <label className={"title-input"}> Password </label>
                        <input className={"sign-input"} type="password"
                               onChange={e => this.setState({
                                   password: e.target.value,
                                   invalid_input: false,
                                   already_used: false,
                               })}
                        />
                    </div>
                    {this.state.invalid_input &&
                        <p className={"field-input-error"}> Invalid input </p>
                    }
                    {this.state.already_used &&
                        <p className={"field-input-error"}> This login is already used </p>
                    }
                    <input type="submit" value="Submit" className={"signin-btn"} onClick={this.onClickSubmit}/>
                </div>
            </div>
        );
    }
}