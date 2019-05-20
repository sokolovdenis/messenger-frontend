import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import SignIn from './SignIn.js';
import { signUp } from './../Api.js';
import SignOut from './SignOut.js';
import Messenger from "./Messenger";

import {Aside, Body, Container, Content, Footer, Header} from "react-holy-grail-layout";


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : '',
            error: '',
            name : ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signIn = this.signIn.bind(this);
    }

    dismissError() {
        this.setState({ error: 'Ohhhhh, shit, smth bad happends!' });
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

        // if (!this.state.username) {
        //     return this.setState({ error: 'Username is required' });
        // }
        //
        // if (!this.state.password) {
        //     return this.setState({ error: 'Password is required' });
        // }
        //
        // return this.setState({ error: '' });

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

    // этот точно должно быть тут?
    signIn() {
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div className="Login">
                    <Container>
                        <Header bg="lightgreen" p={2}>
                            <b onClick={this.signIn}>Sign In</b>
                        </Header>
                        <Body>
                            <Content>
                                <form onSubmit={this.handleSubmit} className="regForm">
                                    <article>Create account</article>
                                    <p>
                                    <label>Login: </label>
                                    <input type="text" onChange={this.handleLoginChange} placeholder="Login" required autoFocus />
                                    </p>
                                    <p>
                                    <label>Password: </label>
                                    <input type="text" onChange={this.handlePasswordChange} placeholder="Password" required />
                                    </p>
                                    <p>
                                    <label>User Name</label>
                                    <input type="text" onChange={this.handleNameChange} placeholder="Name" required />
                                    </p>
                                    <button type="submit">Sign Up</button>
                                </form>
                            </Content>
                        </Body>
                    </Container>
            </div>
        );
    }
}

export default SignUp;