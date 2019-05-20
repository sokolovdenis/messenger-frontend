import React, { Component } from 'react';

import SignIn from './components/SignIn.js';
import Messenger from './components/Messenger.js';

import {getSelfUser} from "./Api";




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'isSignedIn' : false
        }
    }

    componentDidMount() {
        getSelfUser().then(response => {
            this.setState({'isSignedIn' : response.status !== 401});
        }).catch( e => console.log("Error ", e));
    }


    render() {
        return (
            this.state.isSignedIn ?
                <Messenger /> :
                <SignIn />
        );
    }
}

export default App;


