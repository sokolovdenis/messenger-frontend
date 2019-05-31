import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {login: '', password: '', name: ''};

        this.onTokenReceive = props.onTokenReceive;
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;
        this.setState({
            [name]: event.target.value
        });
    }

    async handleSignUp(event) {
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup/',
            data: {
                login: this.state.login,
                password: this.state.password,
                name: this.state.name
            },
            headers: {
                responseType: 'json'
            }
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expires', response.data.expires);
            this.onTokenReceive(response.data.token);
        }).catch(function (error) {
            console.log(error);
        });
    }


    render() {
        return (
            <>
                <div className="registration1">
                    <form onSubmit={this.handleSignUp} >
                        <div className="reg2">

                            <div className="regMessengerLogo">GORIM messenger</div>
                            <div className="formText1">E-mail</div>
                            <input type="text" className="inputText1" id="login" value={this.state.login}
                                   onChange={this.handleChange} />
                            <div className="formText2">Password </div>
                            <input type="password" className="inputText2" id="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <div className="formText3">User Name</div>
                            <input type="text" className="inputText3" id="name" value={this.state.name}
                                   onChange={this.handleChange} />


                            <input type="submit" className="regSubmitButton" value="Registration" />
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default SignUp;
