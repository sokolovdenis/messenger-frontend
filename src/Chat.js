import React, { Component } from 'react';
import {SendPublicMessage, SendPrivateMessage} from './common.js'

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      "message": e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let model = {
      "content": this.state.message
    };

    if (this.props.isPublic) {
      SendPublicMessage(this.state.message)
      .then(resp => {
      if (resp.ok) {
        this.props.socket.send(JSON.stringify(model));
      }
    })

    }

    else {
      SendPrivateMessage(this.state.message, this.props.ChatId)
      .then(resp => {
        if (resp.ok) {
          this.props.socket.send(JSON.stringify(model));
        }
      })
    }



    document.getElementById("form").focus();
    this.setState({"message": ""});
  }

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <div className="Chat">
        {
          this.props.messages.map((msg, i) =>
            <div key={msg.id} id={msg.id}>
              <div><b>{this.props.users.get(msg.user)}</b></div>
              <div>{msg.content}</div>
            </div>)
        }
        </div>
        <form id="form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.message} onChange={this.handleChange}/>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default Chat;
