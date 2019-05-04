import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PrivateRoute } from './PrivateRoute.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Messenger from './Messenger.js'
import './App.css';

class App extends Component {
  constructor () {
    super();

    this.state = {
      token: "",
      history: createBrowserHistory()
    };

    this.tokenRecieveHandler = this.tokenRecieveHandler.bind(this);
  }

  tokenRecieveHandler(token) {
    localStorage.setItem("token", token);
    this.setState({"token": token});
    this.state.history.push('/');
  }

  render() {
    return (
        <Router history={this.state.history}>
          <div className="App">
            <div className="App-header">
              Messenger
              <div className="LogOut" onClick={() => {localStorage.removeItem("token"); this.state.history.push('/signin');}}>
                Log out
              </div>
            </div>
            <PrivateRoute exact path="/" component={Messenger} />
            <Route path="/signin"
              render={(routeProps) => (
                <SignIn onTokenRecieve={(token) => this.tokenRecieveHandler(token)} />
              )}
            />
            <Route path="/signup"
              render={(routeProps) => (
                <SignUp onTokenRecieve={(token) => this.tokenRecieveHandler(token)} />
              )}
            />
          </div>
        </Router>
      );
  }
}

export default App;
