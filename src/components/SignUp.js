import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn.js';
import { signUp } from './../Api.js';
import SignOut from './SignOut.js';
import Messenger from "./Messenger";


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : '',
            name : ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signIn = this.signIn.bind(this);
    }

    handleLoginChange(event) {
        this.setState({'login': event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value})
    }

    handleNameChange(event) {
        this.setState({'name': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        signUp(this.state.login, this.state.password, this.state.name)
            .then( response =>
                response.json().then(user => ({user, response}))
            ).then(({user, response}) => {
                if (response.ok) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('expires', user.expires);

                    ReactDOM.render(
                        <div>
                            <SignOut />
                            <Messenger />
                        </div>,
                        document.getElementById('root')
                    );
                } else if (response.status === 400) {
                    console.log("Some parameters aren't valid");
                } else if (response.status === 409) {
                    console.log("This Login already exists");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e)
        );
    }

    signIn() {
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <section>
                <header>
                    <a onClick={this.signIn}>Sign In</a>
                    <br/>
                </header>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <article>Sign Up</article>
                        <p>Login: </p>
                        <input type="text" onChange={this.handleLoginChange} placeholder="Login" required autoFocus />
                        <p>Password: </p>
                        <input type="text" onChange={this.handlePasswordChange} placeholder="Password" required />
                        <p>Name: </p>
                        <input type="text" onChange={this.handleNameChange} placeholder="Name" required />
                        <br />
                        <br />
                        <button type="submit">Sign Up</button>
                    </form>
                </section>
            </section>
        );
    }
}

export default SignUp;