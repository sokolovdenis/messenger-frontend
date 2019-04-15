import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignIn.css';
import { signIn } from './../Api.js';
import SignUp from './SignUp.js';
import SelfUser from './SelfUser.js';
import SignOut from './SignOut.js';


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signUp = this.signUp.bind(this);
    }

    handleLoginChange(event) {
        this.setState({'login': event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        signIn(this.state.login, this.state.password)
            .then( response =>
                response.json().then(user => ({user, response}))
            ).then(({user, response}) => {
                if (response.ok) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('expires', user.expires);

                    ReactDOM.render(
                        <div>
                            <SignOut />
                            <SelfUser />,
                        </div>,
                        document.getElementById('root')
                    );
                } else if (response.status === 400) {
                    console.log("Some parameters aren't valid");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e));
    }

    signUp() {
        ReactDOM.render(
            <SignUp />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <form className="SignIn" onSubmit={this.handleSubmit}>
                    <h2 className="SignIn-heading">Sign In</h2>
                    <label htmlFor="inputLogin" className="sr-only">Login: </label>
                    <input type="text" name="inputLogin" onChange={this.handleLoginChange} className="form-control" placeholder="Login" required autoFocus />
                    <br />
                    <br />
                    <label htmlFor="inputPassword" className="sr-only">Password: </label>
                    <input type="text" name="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                    <br />
                    <br />
                    <button className="btn btn-default" type="submit">Sign In</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button className="btn" type="button" onClick={this.signUp}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignIn;
