import React, { Component } from "react";
import { Button } from "reactstrap";

import InputBox from "./InputBox";
import Message from "./Message";
import "./Chat.css";

const backend_url = "http://messenger.westeurope.cloudapp.azure.com/";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputBoxMessage: "",
      messages: []
    };

    this.ws = new WebSocket(
      "ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" +
        this.props.token
    );

    this.ws.onmessage = message => {
      message = JSON.parse(message.data);
      let newMessage = {
        id: message.Id,
        user: message.User,
        timestamp: message.Timestamp,
        content: message.Content
      };

      this.setState(state => ({
        messages: [newMessage, ...state.messages].slice(0, 50)
      }));
    };

    this.getAllMessages(this.props.token);
  }

  getAllMessages = token => {
    let url =
      backend_url + "api/conversations/public/messages?from=0&count=1000";

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({ messages: data.reverse().slice(0, 50) });
      });
  };

  onMessageChange = e => {
    this.setState({
      inputBoxMessage: e.target.value
    });
  };

  onSend = message => {
    if (message === "") {
      return;
    }

    let url = backend_url + "api/conversations/public/messages";
    let obj = {
      content: message
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(obj)
    });

    this.setState({
      inputBoxMessage: ""
    });
  };

  render() {
    const { messages } = this.state;
    return (
      <div>
        <div className="Logout-container">
          <Button color="warning" onClick={() => this.props.onLogout()}>
            Logout
          </Button>
        </div>
        <div className="Chat-container">
          <div className="Chat">
            <div className="MessageForm">
              <InputBox
                onMessageChange={this.onMessageChange}
                value={this.state.inputBoxMessage}
              />
              <Button
                color="warning"
                onClick={() => this.onSend(this.state.inputBoxMessage)}
              >
                Send
              </Button>
            </div>
            {messages.map(message => {
              return <Message message={message} token={this.props.token} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
