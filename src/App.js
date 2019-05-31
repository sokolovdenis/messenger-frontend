import React, {Component} from 'react';
import './App.css';
import MessageController from './MessageActivity'

import Welcome from "./welcome";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        };
        this.tokenReceiveHandler = this.tokenReceiveHandler.bind(this);
        this.logout = this.logout.bind(this);
    }

    tokenReceiveHandler(token) {
        this.setState({isSignedIn: true});
    }

    logout() {
        localStorage.removeItem('token');
        this.setState({token:null, isSignedIn:false});
    }

    componentDidMount(prevProps, prevState, snapshot) {
        let token = localStorage.getItem('token');
        let expires = localStorage.getItem('expires');
        if ( token !== undefined && token !== null && Date.now() - Date.parse(expires) < 0) {
            this.setState({isSignedIn: true});
        }
    }

    render() {
        return ( this.state.isSignedIn? <MessageController app={this}/>:<Welcome app={this}/> );
    }
}

export default App;
