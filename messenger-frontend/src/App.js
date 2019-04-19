import React, {Component} from 'react';
import './App.css';
import Messenger from './Messenger'
import SignIn from './sign-in'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //token: null,
            isSignedIn: false
        };
        this.tokenReceiveHandler = this.tokenReceiveHandler.bind(this);
        this.logout = this.logout.bind(this);
    }

    tokenReceiveHandler(token) {
        //this.setState({token: token});
        //console.log(token);
        this.setState({isSignedIn: true});
    }

    logout() {
        localStorage.removeItem('token');
        this.setState({token:null, isSignedIn:false});
    }

    render() {
        var token = localStorage.getItem('token');
        var expires = localStorage.getItem('expires');
        if ( token !== undefined && token !== null && Date.now() - Date.parse(expires) < 0) {
            //this.setState({isSignedIn: true});
            this.state.isSignedIn = true;
        }
        return ( this.state.isSignedIn? <Messenger app={this} token={this.state.token}/>:<SignIn onTokenReceive={this.tokenReceiveHandler}/> );
    }
}

export default App;
