import React, { Component } from 'react';
import './App.css'
import Messenger from './messenger';
import SignIn from './sign-in';

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
    localStorage.removeItem("token");
    this.setState({token: ""});
  }

  render() {
    let isSignedIn = (this.state.token !== "");

    return (
        <div>
          <div>
            {
              isSignedIn ?
                  <Messenger token={this.state.token} onTokenRemove={this.tokenRemoveHandler}/> :
                  <SignIn onTokenReceive={this.tokenReceiveHandler}/>
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