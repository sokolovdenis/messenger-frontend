import React, { Component } from 'react';
import { signin } from './api'
import './sign-in.css'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        signin(this.state.login, this.state.password)
            .then(token => {
                console.log("SignIn -> handleSubmit() -> sigin() with token = " + token);
                return this.props.onTokenReceive(token)
            });
    }

    render() {

        return (
            <form autoComplete='off' className='form' onSubmit={this.handleSubmit}>
                <div className='control'>
                    <h1>
                        Sign In
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input name='Login' placeholder='Login' type='text' onChange={this.handleLoginChange}/>
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
                        Log In
                    </div>
                </button>
            </form>
        );

    }
}

/*
 return (
            <form onSubmit={this.handleSubmit} className="signInForm">
                <h3>Sign in</h3>
                <label>
                    <input
                        type='text'
                        onChange={this.handleLoginChange}
                        placeholder="Username"
                        required
                        autoFocus
                    />
                </label>
                <br />
                <label>
                    <input
                        type='password'
                        onChange={this.handlePasswordChange}
                        placeholder="Password"
                        required
                    />
                </label>
                <br />
                <input type="submit" value='Sign in!'/>
            </form>
        );
 */
export default SignIn;