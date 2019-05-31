import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { login: '', password: ''};

        this.onTokenReceive = props.onTokenReceive;
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;
        this.setState({
            [name]: event.target.value
        });
    }

     async handleLogIn(event) {
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin/',
            data: {
                login: this.state.login,
                password: this.state.password
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
            <>

                <div className="registration1">
                    <form onSubmit={this.handleLogIn} >
                        <div className="reg2">

                            <div className="regMessengerLogo">GORIM messenger</div>
                            <div className="formText1">E-mail</div>
                            <input type="text" className="inputText1"  id="login" value={this.state.login} onChange={this.handleChange} />
                            <div className="formText2">Password </div>
                            <input type="password" className="inputText2" id="password" value={this.state.password} onChange={this.handleChange} />


                            <input type="submit" className="regSubmitButton" value="Sign In" />
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default SignIn;
