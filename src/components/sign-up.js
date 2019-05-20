import React, { Component } from 'react';
import {signup} from './api'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            name: ''
        };

        console.log("SignUp -> constructor(): state.login = " + this.state.login);

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("SignUp -> handleSubmit()");

        signup(this.state.login, this.state.password, this.state.name)
            .then(token => {
                console.log("SignUp -> handleSubmit() -> signup() with token = " + token);
                return this.props.onTokenReceive(token)
            });
    }

    render() {

        return (
            <form autoComplete='off' className='form' onSubmit={this.handleSubmit}>
                <div className='control'>
                    <h1>
                        Sign Up
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input name='username' placeholder='Login' type='text' onChange={this.handleLoginChange}/>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className='control block-cube block-input'>
                    <input name='password' placeholder='Password' type='password' onChange={this.handlePasswordChange}/>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className='control block-cube block-input'>
                    <input name='name' placeholder='Username' type='text' onChange={this.handleNameChange}/>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <button className='btn block-cube block-cube-hover' type='submit'>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='text'>
                        Sign Up
                    </div>
                </button>
            </form>
        );

    }
}


/*
<form onSubmit={this.handleSubmit} className="signForm">
                <h3>Sign up, please</h3>
                <label>
                    Login:
                    <input
                        type='text'
                        onChange={this.handleLoginChange}
                        placeholder="..."
                        required
                        autoFocus
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type='password'
                        onChange={this.handlePasswordChange}
                        placeholder="..."
                        required
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type='text'
                        onChange={this.handleNameChange}
                        placeholder="..."
                        required
                    />
                </label>
                <br />
                <input type="submit" value='Sign up!'/>
            </form>
 */
export default SignUp;