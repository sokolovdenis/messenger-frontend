import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { signIn } from './../Api.js';
import SignUp from './SignUp.js';
import Messenger from "./Messenger";


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
                        <Messenger />,
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
            <section>
                <header>
                    <b onClick={this.signUp}>Sign Up</b>
                    <br/>
                </header>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <article>Sign In</article>
                        <p>Login: </p>
                        <input type="text" onChange={this.handleLoginChange} placeholder="Login" required autoFocus />
                        <p>Password: </p>
                        <input type="text" onChange={this.handlePasswordChange} placeholder="Password" required />
                        <br />
                        <br />
                        <button type="submit">Sign In</button>
                    </form>
                </section>
            </section>
        );
    }
}

export default SignIn;
