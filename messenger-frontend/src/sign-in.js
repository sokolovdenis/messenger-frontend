import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {signup_login: '', signup_password: '', signup_name: '', login_login: '', login_password: ''};

        this.onTokenReceive = props.onTokenReceive;
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;

        this.setState({
            [name]: event.target.value
        });
    }

    async handleSignUp(event) {
        // console.log(this.state);
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup/',
            data: {
                login: this.state.signup_login,
                password: this.state.signup_password,
                name: this.state.signup_name
            },
            headers: {
                responseType: 'json'
            }
        }).then(function (response) {
            //console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expires', response.data.expires);
            this.onTokenReceive(response.data.token);
        }).catch(function (error) {
            console.log(error);
        });
    }

    async handleLogIn(event) {
        console.log(this.state);
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin/',
            data: {
                login: this.state.login_login,
                password: this.state.login_password
            },
            headers: {
                responseType: 'json'
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expires', response.data.expires);
                this.onTokenReceive(response.data.token);
            } else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <form id="register_form" onSubmit={this.handleSignUp}>
                    <input type="text" id="signup_login" value={this.state.signup_login} onChange={this.handleChange}/>
                    <input type="text" id="signup_name" value={this.state.signup_name} onChange={this.handleChange}/>
                    <input type="password" id="signup_password" value={this.state.signup_password}
                           onChange={this.handleChange}/>
                    <button onClick={this.handleSignUp} className="side-menu-elem" value="Sign Up">Sign Up</button>
                </form>

                <form id="register_form" onSubmit={this.handleLogIn}>
                    <input type="text" id="login_login" value={this.state.login_login} onChange={this.handleChange}/>
                    <input type="password" id="login_password" value={this.state.login_password}
                           onChange={this.handleChange}/>
                    <button onClick={this.handleLogIn} className="side-menu-elem" value="Log In">Log In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;
