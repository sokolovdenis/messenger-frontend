import React, { Component } from "react";
import LoginComponent from './LoginComponent.js'
import ChatList from "./ChatList.js"
import Chat from "./Chat.js"
import UserSearch from "./UserSearch.js"
import { GetMe } from "./requests.js"
import { Button, Col, Row } from "react-bootstrap";
import './App.css';

export default class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem("token", null),
      current_chat: null
    };
  }

  setChat = chat => {
    console.log(chat);
    this.setState({
      current_chat: chat
    });
  }

  setToken = async token => {
    localStorage.setItem("token", token);
    let promise = GetMe();
    promise.then(
      json => localStorage.setItem("MyId", json.id));
    this.setState({
      token: token
    });
    console.log(this.state.token)
  }

  logOut = event => {
    this.setState({
      token: null
    });
    localStorage.clear();
  }

  renderLogin() {
    return (
      <div className="App">
        <LoginComponent callback={this.setToken}></LoginComponent>
      </div>
    );
  }

  renderMain() {
    return (
      <div className="HolyGrail-body">
        <main className="HolyGrail-content">{
          this.state.current_chat == null
            ? <h1>Select chat</h1>
            : <Chat userId={this.state.current_chat.participant}
                chatId={this.state.current_chat.id}  
                name={this.state.current_chat.name}
                updateCallback={() => this.setState({})} />
        }</main>
        <nav className="HolyGrail-nav">
          <UserSearch callback={this.setChat} />
          <ChatList callback={this.setChat} />
        </nav>
      </div>
    );
  }

  render() {
    const notSignedIn = this.state.token === null;

    return (
      <div className="HolyGrail">
        <header className="App-header">
          <Row>
          <Col><p style ={{display: "inline-block"}}>Welcome to VMessenger!</p></Col>
          <Col>{notSignedIn
            ? <span>Anon</span>
            : <Button className="Btn-LogOut" variant="danger" type="submit" onClick={this.logOut}>
                LogOut
              </Button>
          }</Col>
          </Row>
        </header>
        <div>
          {notSignedIn
            ? this.renderLogin()
            : this.renderMain()
          }
        </div>
      </div>
    );
  }
}
