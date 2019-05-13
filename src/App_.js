import React, { Component } from 'react';
import './App.css'
import Messenger from './messenger';
import SignIn from './sign-in';

class App_ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('token'),
        };

        this.tokenReceiveHandler = this.tokenReceiveHandler.bind(this);
    }

    tokenReceiveHandler(token) {
        this.setState({
            token
        });
        localStorage.setItem('token', token);
    }

    render() {
        let isSignedIn = (this.state.token !== null);

        return isSignedIn ?
            <Messenger token={this.state.token}/> :
            <SignIn onTokenReceive={this.tokenReceiveHandler} />;

    }
}

export default App_;