import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignOut.css';
import SignIn from './SignIn.js';


class SignOut extends Component {
    constructor() {
        super();

        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        localStorage.setItem('token', '');
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <button className="btn" type="button" onClick={this.signOut}>Sign Out</button>
            </div>
        );
    }
}

export default SignOut;