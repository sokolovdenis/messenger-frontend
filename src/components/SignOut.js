import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn.js';


class SignOut extends Component {
    constructor(props) {
        super(props);

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
            <header>
                <a onClick={this.signOut}>Sign Out</a>
                <br/>
            </header>
        );
    }
}

export default SignOut;