import React, { Component } from 'react';
import SignIn from './components/SignIn.js';
import Messenger from './components/Messenger.js';


class App extends Component {
    render() {
        let isSignedIn = localStorage.getItem('token') !== '';

        return (
            isSignedIn ?
                <Messenger /> :
                <SignIn />
        );
    }
}

export default App;
