import React, { Component } from 'react';
import { format } from 'timeago.js';

const API_ME               = 'http://messenger.westeurope.cloudapp.azure.com/api/users/me'
const API_CONVERSATIONS    = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations'

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
      current_conversation: 'public', // id of selected conversations
      dialogue: null,                 // текущий диалог
      dialogue_API: null,             // ссылка на URL для текущего диалога
      message_text: ''                // текст, вводимый пользователем
    };

    this.linkLogOut           = this.linkLogOut.bind(this);
    this.setAlert             = this.setAlert.bind(this);
    this.loadedUserName       = this.loadedUserName.bind(this);
    this.loadedConversations  = this.loadedConversations.bind(this);
    this.loadedDialogue       = this.loadedDialogue.bind(this);
    this.fetchStatusCheck     = this.fetchStatusCheck.bind(this);
    this.selectConverstaion   = this.selectConverstaion.bind(this);
    this.onConverstaionChange = this.onConverstaionChange.bind(this);
    this.handleInputChange    = this.handleInputChange.bind(this);
    this.messageArrived       = this.messageArrived.bind(this);
    this.onSend               = this.onSend.bind(this);

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

    // выбираем и загружаем диалог по умолчанию
    this.selectConverstaion('public');
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

  loadedDialogue(json) {
    this.setState({ dialogue: json });
    console.log("Dialugue: ");
    console.log(json);
  }

  setAlert(message) {
    console.log(message);  // To do: может выводить куда-то в интерфейс?
  }

  linkLogOut (event) {
    event.preventDefault();
    this.props.callback({page: 'login', token: null})
  }

  selectConverstaion (id) {
    // новый урл для диалога
    let api = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/' + id + '/messages';
    this.setState({ dialogue_API: api, current_conversation: id });
    // загружаем нужный диалог
    fetch(api, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
    })
    .then(this.fetchStatusCheck)
    .then(this.loadedDialogue)
    .catch(this.setAlert)
  }

  onConverstaionChange (event) {
    event.preventDefault();
    // TO DO... доделать переключение пользотелем между диалогами из списка
  }

  handleInputChange(event) {
    switch (event.target.id){
      case 'messageText':
        this.setState({ message_text: event.target.value});
        break;
      default:
    }
  }

  messageArrived(json) {
    let messages = this.state.dialogue;
    messages.push(json);
    this.setState({ dialogue: messages});
  }

  onSend(event) {
    event.preventDefault();

    // очищаем текст в строке ввода
    const message = this.state.message_text;
    this.setState({ message_text: '' });

    // отправляем сообщение на сервер .
    fetch(this.state.dialogue_API, {
        method: 'post',
        body: JSON.stringify({content: message}),
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
    })
     .then(this.fetchStatusCheck)
     .then(this.messageArrived)
     .catch(this.setAlert)
  }

  render() {
    return (
      <div className="messenger">

          <div className="msg-header">
              <strong> {this.state.username} </strong>
              <a href="/#" className="text-muted" onClick={this.linkLogOut}>(Log out)</a>
          </div>

          <div className="msg-search">
              <input type="text" className="form-control" id="searchSting" placeholder="Search user" />
          </div>

          <div className="msg-list" style={{ overflow:"hidden", overflowY:"scroll" }}>
              <ConversationsList list={this.state.conversations} sel={this.state.current_conversation} onChange={this.onConverstaionChange} />
          </div>

          <div className="msg-dialogue text-center" style={{ overflow:"hidden", overflowY:"scroll" }}>
              <Dialogue messages={this.state.dialogue} self={this.state.userid}/>
          </div>

          <div className="msg-message container-fluid">
              <div className="form-row">
                  <form className="form-inline w-100" onSubmit={this.onSend}>
                      <div className="col-10">
                          <input type="text" className="form-control w-100" id="messageText"
                          placeholder="Enter message..." onChange={this.handleInputChange}
                          value={this.state.message_text}/>
                      </div>
                      <div className="col">
                          { this.state.message_text.length === 0 ?
                            <button className="btn btn-primary btn-block disabled" type="submit">Send</button> :
                            <button className="btn btn-primary btn-block" type="submit">Send</button>
                          }
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
  }
}

function ConversationsList(props) {

  let listItems = []
  for (let key in props.list){

    const cnv   = props.list[key];
    const id    = cnv.id;
    let participant = cnv.participant;
    const time  = format(cnv.lastMessage.timestamp);
    let message = cnv.lastMessage.content;

    if (message.length > MESSAGE_PREVIEW_MAXLEN)
     message = message.slice(0,MESSAGE_PREVIEW_MAXLEN-3) + '...'

    if (id === 'public')
      participant = 'Public chat'

    let clsname = "list-group-item list-group-item-action"
    if ( props.sel === id)
      clsname += " active";

    listItems.push(
      <a href="/#" className={clsname} key={id} onClick={props.onChange}>
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


function Dialogue(props) {
  let messages = []

  for (let key in props.messages){

    const content = props.messages[key].content;
    const time = format(props.messages[key].timestamp);
    const id = props.messages[key].id;
    const convid = props.messages[key].conversationId;
    const participant = props.messages[key].user;

    console.log("Self:" + props.self);
    console.log("participant:" + participant);

    messages.push(
      <div className="row" style={{padding:'5px'}} key={id}>
        { props.self === participant && <div className="col-4"></div> }
        <div className="col-8 text-left">
          <a className="list-group-item list-group-item-action">
            <div className="d-flex justify-content-between">
              <h5 className="mb-1">{participant}</h5>
              <small>{time}</small>
            </div>
            <p className="mb-1">{content}</p>
          </a>
        </div>
        { props.self === participant || <div className="col-4"></div> }
      </div>
    );
  }

  if (messages.length === 0)
    return ( <small>No conversation is loaged yet.</small> );
  else
    return ( <div className="container-fluid">{messages}</div> );
}



export default Messenger;
