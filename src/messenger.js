import React, { Component } from 'react';
import { format, render, cancel, register } from 'timeago.js';

const API_ME             = 'http://messenger.westeurope.cloudapp.azure.com/api/users/me'
const API_CONVERSATIONS  = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations'

const MESSAGE_PREVIEW_MAXLEN = 50

////////////////////////////////////////////////////////////////////////////////
//
// основная страница мессенджера
//
////////////////////////////////////////////////////////////////////////////////
class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '...',                // display user name
      userid: 0,                      // this user id
      conversations: null,            // array of recent conversations
      current_conversation: 'public'  // array of recent conversations
    };

    this.linkLogOut          = this.linkLogOut.bind(this);
    this.setAlert            = this.setAlert.bind(this);
    this.loadedUserName      = this.loadedUserName.bind(this);
    this.loadedConversations = this.loadedConversations.bind(this);
    this.fetchStatusCheck    = this.fetchStatusCheck.bind(this);
    this.conversationSelected = this.conversationSelected.bind(this);
  }

  componentWillMount() {
    // Теперь время загрузить имя пользователя с сервера
    fetch(API_ME, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
    })
    .then(this.fetchStatusCheck)
    .then(this.loadedUserName)
    .catch(this.setAlert)

    // загружаем список даилогов
    fetch(API_CONVERSATIONS, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
    })
    .then(this.fetchStatusCheck)
    .then(this.loadedConversations)
    .catch(this.setAlert)
  }

  fetchStatusCheck (response){
    console.log(response)
    switch (response.status) {
      case 200:
        return (response.json())
      case 401:
        // проблема с токеном аутентификации - надо идти снова к странице логина
        this.props.callback({page: 'login', token: null})
        return Promise.reject("Error 401: Token is not correct.")
      default:
        return Promise.reject('Server reply: '+ response.status + '; ' + response.statusText)
    }
  }

  loadedUserName(json) {
    this.setState({ username: json.name, userid: json.id });
  }

  loadedConversations(json) {
    this.setState({ conversations: json });
  }

  setAlert(message) {
    // To do: может выводить куда-то в интерфейс?
    console.log(message);
  }

  linkLogOut (event) {
    event.preventDefault();
    this.props.callback({page: 'login', token: null})
  }

  conversationSelected (id) {
  }

  render() {
    return (
      <div className="messenger">

          <div className="msg-header">
              <strong> {this.state.username} </strong>
              <a href="" className="text-muted" onClick={this.linkLogOut}>(Log out)</a>
          </div>

          <div className="msg-search">
              <input type="text" className="form-control" id="searchSting" placeholder="Search user" />
          </div>

          <div className="msg-list" style={{ overflow:"hidden", overflowY:"scroll" }}>
              <ConversationsList list={this.state.conversations} sel={this.state.current_conversation} onChange={this.conversationSelected} />
          </div>

          <div className="msg-dialogue text-center" style={{ overflow:"hidden", overflowY:"scroll" }}>
              No conversations currently selected
          </div>

          <div className="msg-message">
              <form>
                <input type="text" className="form-control" id="messageText" placeholder="Enter message..." />
              </form>
          </div>
      </div>
    );
  }
}

function ConversationsList(props) {

  let listItems = []

  for (let key in props.list){

    const id = props.list[key].id;
    const participant = props.list[key].participant;
    const time = format(props.list[key].lastMessage.timestamp);
    const message = props.list[key].lastMessage.content;

    if (message.length > MESSAGE_PREVIEW_MAXLEN)
     message = message.slice(0,MESSAGE_PREVIEW_MAXLEN-3) + '...'

    if (id === 'public')
      participant = 'Public chat'

    let clsname = "list-group-item list-group-item-action"
    if ( props.sel === id)
      clsname += " active";

    listItems.push(
      <a href="#" className={clsname} key={id} onClick={props.onChange}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{participant}</h5>
          <small>{time}</small>
        </div>
        <small>{message}</small>
      </a>);
  }

  return (
      <ul className="list-group shadow ">{listItems}</ul>
  );
}

export default Messenger;
