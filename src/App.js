import React, { Component } from 'react';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('token'),
      tokenExpirationDate: localStorage.getItem('tokenExpirationDate'),
    };

    this.updateToken = this.updateToken.bind(this);
    this.handleSignOutButtonClick = this.handleSignOutButtonClick.bind(this);
  }

  updateToken(token, tokenExpirationDate) {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

    this.setState({
      token: token,
      tokenExpirationDate: tokenExpirationDate
    });
  }

  handleSignOutButtonClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationDate");

    this.setState({
      token: null,
      tokenExpires: null
    })
  }

  render() {
    return (
      <>
      <Header token={this.state.token} handleSignOutButtonClick={this.handleSignOutButtonClick} />
      <Body token={this.state.token} updateToken={this.updateToken} />
      </>
    );
  }
}
