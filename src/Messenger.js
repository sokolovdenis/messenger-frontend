import React, { Component } from 'react';
import Chat from './Chat.js';
import {LoadPublicMessages, LoadUserMessages, GetUserById, GetConversations, GetUserByName} from './common.js';
import './Messenger.css';



class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      messages: [],
      users: new Map(),
      isPublic: true,
      ChatId: "",
      search: ""
    };

    this.LoadMessages = this.LoadMessages.bind(this);
    this.LoadConversations = this.LoadConversations.bind(this);
    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.ws = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token="+localStorage.getItem("token"));

    this.ws.onmessage = (e) => {
      this.LoadMessages();
    }

  }

  componentDidMount() {
    this.LoadMessages();
    this.LoadConversations();
  }

  LoadMessages() {
    if (this.state.isPublic) {
      LoadPublicMessages().then(messages => {
        this.setState({"messages": messages});
        messages.forEach((message, i) => {
          if (! this.state.users.has(message.user))
          {
            GetUserById(message.user)
            .then((resp) => {
              let users = this.state.users;
              users.set(message.user, resp.name);
              this.setState({"users": users});
            });
          }
        });
      }).then(() => {
        let objDiv = document.getElementById(this.state.messages[this.state.messages.length-1].id);
        objDiv.scrollIntoView({ behavior: "smooth" });
      })
    }
    else {
      LoadUserMessages(this.state.ChatId).then(messages => this.setState({"messages": messages}))
      .then(() => {
        let objDiv = document.getElementById(this.state.messages[this.state.messages.length-1].id);
        objDiv.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  LoadConversations() {
    GetConversations()
    .then(conversations => {
      this.setState({"conversations": conversations});
      conversations.forEach((conv, i) => {
        if (conv.participant !== null && !this.state.users.has(conv.participant))
        {
          GetUserById(conv.participant)
          .then((resp) => {
            let users = this.state.users;
            users.set(conv.participant, resp.name);
            this.setState({"users": users});
          });
        }
      });
    });
  }

  handleChatClick(publ, id) {
    this.setState({"isPublic": publ, "ChatId": id}, () => {this.LoadMessages();});
  }

  handleChange(e) {
    this.setState({"search": e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    GetUserByName(this.state.search)
    .then(resp => {
      this.setState({"ChatId": resp[0].id, "isPublic": false, "search":""});
      return resp[0];
    })
    .then( (resp) => {
      if (!this.state.users.has(resp.id))
          {
            let users = this.state.users;
            users.set(resp.id, resp.name);
            this.setState({"users": users});
          }
      })
    .then(() => {
      this.LoadMessages();
      this.LoadConversations();
    });
  }

  render() {
    return (
      <div className="Messenger-row">
        <div className="Messenger-left">
          <form onSubmit={this.handleSubmit}>
            <input className="Text" type='text' value={this.state.search} onChange={this.handleChange}/>
            <input className="Submit" type='submit' value='search'/>
          </form>
          <ul>
            {
              this.state.conversations.map((conv) => {
                return conv.participant === null ?
                (<li key={conv.id} onClick={() => this.handleChatClick(true, "")}>
                    Public conversation
                 </li>)
                :
                (
                  <li key={conv.id} onClick={() => this.handleChatClick(false, conv.participant)}>
                    {this.state.users.get(conv.participant)}
                 </li>
                )
              })
            }
          </ul>
        </div>
        <div className="Messenger-main">
          <Chat messages={this.state.messages} users={this.state.users} socket={this.ws}
            name={this.state.isPublic ? "Public conversation" : "Conversation with: " + this.state.users.get(this.state.ChatId)}
            isPublic={this.state.isPublic}
            ChatId={this.state.ChatId} />
        </div>
      </div>
    );
  }
}

export default Messenger;
