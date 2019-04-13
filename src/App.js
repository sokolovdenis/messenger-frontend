import React, { Component } from 'react';
import SignIn from './components/SignIn.js';
import Messenger from './components/Messenger.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            token:null
        };

        this.handleReceiveToken = this.handleReceiveToken.bind(this);
    }

    handleReceiveToken(token){
        this.setState({token})
    }

    render() {
        let isSignedIn = false;

        return isSignedIn ?
            <Messenger token={this.state.token} /> :
            <SignIn onTokenReceive={this.handleReceiveToken} />;
    }
}

export default App;
