import React, { Component } from 'react';
import SignIn from './components/SignIn.js';
import Messenger from './components/Messenger.js';
import SignOut from './components/SignOut.js';


class App extends Component {
    render() {
        let isSignedIn = localStorage.getItem('token') !== '';

        return (
            isSignedIn ?
                <div>
                    <SignOut />
                    <Messenger />
                </div> :
                <SignIn />
        );
    }
}

export default App;
