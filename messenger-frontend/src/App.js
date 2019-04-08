import React, {Component} from 'react';
import './App.css';
import Messenger from './Messenger'
import SignIn from './sign-in'

class App extends Component {

    constructor(props) {
        super(props);
        this.isSignedIn = false;
        this.state = {
            token: null
        };
        this.tokenReceiveHandler = this.tokenReceiveHandler.bind(this);
        this.logout = this.logout.bind(this);
    }

    tokenReceiveHandler(token) {
        this.setState({token: token});
        console.log(token);
        this.isSignedIn = true;
    }

    logout() {
        localStorage.removeItem('token');
        this.isSignedIn = false;
    }

    render() {
        var token = localStorage.getItem('token');
        var expires = localStorage.getItem('expires');
        if ( token !== undefined && Date.now() - Date.parse(expires) < 0) {
            this.isSignedIn = true;
        }
        return ( this.isSignedIn? <Messenger app={this} token={this.state.token}/>:<SignIn onTokenReceive={this.tokenReceiveHandler}/> );
    }
}

export default App;
