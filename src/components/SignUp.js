import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignUp.css';
import SignIn from './SignIn.js';
import { signUp } from './../Api.js';
import SelfUser from './SelfUser.js';
import SignOut from './SignOut.js';


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
                            <SelfUser />,
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
            <div>
                <form className="SignUp" onSubmit={this.handleSubmit}>
                    <h2 className="SignUp-heading">Sign Up</h2>
                    <label htmlFor="inputLogin" className="sr-only">Login: </label>
                    <input type="text" name="inputLogin" onChange={this.handleLoginChange} className="form-control" placeholder="Login" required autoFocus />
                    <br />
                    <br />
                    <label htmlFor="inputPassword" className="sr-only">Password: </label>
                    <input type="text" name="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                    <br />
                    <br />
                    <label htmlFor="inputName" className="sr-only">Name: </label>
                    <input type="text" name="inputName" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                    <br />
                    <br />
                    <button className="btn btn-default" type="submit">Sign Up</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button className="btn" type="button" onClick={this.signIn}>Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignUp;