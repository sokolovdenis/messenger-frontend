import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './messenger.css';
import './signin.css';

import Messenger from './messenger.js'
import SignInPage from './signin.js'

////////////////////////////////////////////////////////////////////////////////
//
// Основной класс, который отвечает за переключение между режимами
//
////////////////////////////////////////////////////////////////////////////////
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "messenger",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMwZmM3MzNhLTFlMWItNDdhZS04YWI0LWZjYzY0ZmM2N2Q0MSIsImV4cCI6MTU1MzQyNTkwN30.dL4eEvJh9HjkZ2B7Dt4uvAJKVrxPJrCeRFHXJk_GaqI"
    };
    this.switchPage = this.switchPage.bind(this);
  }

  // коллбэк для вызова из вложенных элементов
  switchPage(p) {
    this.setState(p);
  }

  render() {
    const page = this.state.page;
    switch(page) {
      case "login":
        return ( <SignInPage callback={this.switchPage}/> );
      case "messenger":
        return ( <Messenger callback={this.switchPage} token={this.state.token} /> );
      default:
        return ( <h1>Unknown App state: {this.state.page} </h1> );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
