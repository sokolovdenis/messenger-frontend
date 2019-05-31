import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";
import SignIn from './SignIn'
import SignUp from './SingUp'
import ReactDOM from "react-dom";


class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignIn: false,
            isSingUp: false
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignIn(event) {
        this.setState({isSignIn: true});
    }
    handleSignUp(event) {
        this.setState({isSignUp: true});
    }

    render() {

        let conceptSingIn = (this.state.isSignIn || this.state.isSignUp)
            ? (this.state.isSignIn ? <SignIn onTokenReceive={this.props.app.tokenReceiveHandler}/>
            :<SignUp onTokenReceive={this.props.app.tokenReceiveHandler}/>) :
            <div><button onClick={this.handleSignIn}>SignIn</button>
                <button onClick={this.handleSignUp}>SignUp</button></div>;

        return (<div><h1>Welcome</h1>
            {conceptSingIn}

         </div>);

    }
}

export default Welcome;
