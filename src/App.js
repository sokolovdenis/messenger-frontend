import React, { Component } from 'react';
import Messenger from './components/messenger';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
        };

        this.tokenReceiveHandler = this.tokenReceiveHandler.bind(this);
        this.tokenRemoveHandler = this.tokenRemoveHandler.bind(this);
    }

    tokenReceiveHandler(token) {
        this.setState({
            token: token,
        });
        localStorage.setItem('token', token);
    }

    tokenRemoveHandler() {
        localStorage.removeItem('token');
        this.setState({
            token: null,
        });
        console.log("App -> logOut()");
    }

    render() {

        let isSignedIn = (this.state.token !== null);

        return (
        <div>
            <div>
                {
                    isSignedIn ?
                        <Messenger token={this.state.token} onTokenRemove={this.tokenRemoveHandler}/> :
                        <div>
                            <SignIn onTokenReceive={this.tokenReceiveHandler}/>
                            <SignUp onTokenReceive={this.tokenReceiveHandler}/>
                        </div>
                }
            </div>

            <div className="LogOutButton">
            {
                isSignedIn ?
                    <button onClick={this.tokenRemoveHandler}> {"SignOut"} </button> : ""
            }
            </div>
        </div>
        )
    }
}

export default App;