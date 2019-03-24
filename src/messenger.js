import React, { Component } from 'react';
import { format } from 'timeago.js';
import Websocket from 'react-websocket';

const API_ME               = 'http://messenger.westeurope.cloudapp.azure.com/api/users/me'
const API_CONVERSATIONS    = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations'
const API_GETUSERNAME      = 'http://messenger.westeurope.cloudapp.azure.com/api/users/'
const API_SEARCH           = 'http://messenger.westeurope.cloudapp.azure.com/api/users'

const MESSAGE_PREVIEW_MAXLEN = 35

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
      current_conversation: 'public', // id of selected conversations (public, or GUID of user)
      dialogue: null,                 // текущий диалог
      dialogue_API: null,             // ссылка на URL для текущего диалога
      message_text: '',               // текст, вводимый пользователем поле сообщения
      search_string: '',              // текст, вводимый пользователем в строку поиска
      search_results: null,           // результаты поиска
      user_resolver: {}               // объект для резолвинга имен пользователей
    };

    // массив ID, которые мы уже резолвим, (послали запрос на сервер, но возможно
    // еще не получили ответ) - чтобы не резолвить мо много раз
    this.resolver_block = [];

    this.linkLogOut           = this.linkLogOut.bind(this);
    this.setAlert             = this.setAlert.bind(this);
    this.loadedUserName       = this.loadedUserName.bind(this);
    this.loadedConversations  = this.loadedConversations.bind(this);
    this.loadedDialogue       = this.loadedDialogue.bind(this);
    this.fetchStatusCheck     = this.fetchStatusCheck.bind(this);
    this.selectConverstaion   = this.selectConverstaion.bind(this);
    this.handleInputChange    = this.handleInputChange.bind(this);
    this.messageArrived       = this.messageArrived.bind(this);
    this.onSend               = this.onSend.bind(this);
    this.resolveUser          = this.resolveUser.bind(this);
    this.userResolved         = this.userResolved.bind(this);
    this.loadedSearchResults  = this.loadedSearchResults.bind(this);
    this.onUserSelection      = this.onUserSelection.bind(this);
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

  // отложенное разрешение имен польщователй
  resolveUser(id){
    if ( id in this.state.user_resolver ){
      return this.state.user_resolver[id];
    }
    else {
      // отправляем запрос на резолв на сервер
      if ( this.resolver_block.indexOf(id) === -1 ){
        // запоминаем этот ID и больше не спрашиваем сервер про него
        this.resolver_block.push(id);
        // cпрашиваем сервер, но только один раз
        fetch(API_GETUSERNAME+id, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
        })
        .then(this.fetchStatusCheck)
        .then(this.userResolved)
        .catch(this.setAlert)
      }
      // а пока возвращаем пустышку
      return '...';
    }
  }

  // добавляем в список информацию об еще одном пользователе
  userResolved(json){
    let new_resolver = this.state.user_resolver;
    if ( !( json.id in new_resolver) )
    {
      new_resolver[json.id] = json.name;
      this.setState({ user_resolver: new_resolver });
    }
  }

  loadedSearchResults(json) {
    // заодно кэшируем именя в массив для резлова имен
    for (let i in json)
      this.userResolved(i);
    this.setState({ search_results: json });
  }

  loadedUserName(json) {
    this.setState({ username: json.name, userid: json.id });
    this.userResolved(json);
  }

  loadedConversations(json) {
    // sort conversations by age
    function compareTime(a, b){
      let da = new Date(a.lastMessage.timestamp);
      let db = new Date(b.lastMessage.timestamp);
      if (da > db) {
        return -1;
      }
      if (da < db) {
        return 1;
      }
      return 0;
    }
    json.sort(compareTime);
    this.setState({ conversations: json });
  }

  loadedDialogue(json) {
    this.setState({ dialogue: json });
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
    const api      = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/' + id + '/messages';
    let   newstate = { dialogue_API: api, current_conversation: id };
    let   to_load  = (id === 'public') ? id : null;

    if ( id === this.state.userid )
      return;

    // ищем нужный диалог в списке
    if ( this.state.conversations !== null )
    {
      for (let i in this.state.conversations){
        if ( this.state.conversations[i].participant === id || this.state.conversations[i].id === id )
            to_load = id;
      }
    }
    if ( to_load === null )
    {
      // видимо, не нашли. Добавляем новый пустой диалог тогда
      newstate.conversations = [{ participant: id, id: -1 }].concat(this.state.conversations);
      newstate.dialogue = null;
    }
    else {
      // загружаем нужный диалог
      fetch(api, {
          method: 'get',
          headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
      })
      .then(this.fetchStatusCheck)
      .then(this.loadedDialogue)
      .catch(this.setAlert)
    }

    this.setState(newstate);
  }

  onUserSelection(event){
    event.preventDefault();
    this.selectConverstaion(event.target.id);
  }

  handleInputChange(event) {
    switch (event.target.id){
      case 'messageText':
        this.setState({ message_text: event.target.value});
        break;
      case 'searchSting':
        const query = event.target.value;
        this.setState({ search_string: query, search_results: null});
        // обновляем результаты поиска на сервере
        if ( query.length > 0 )
        {
          fetch(API_SEARCH+'?query='+query, {
              method: 'get',
              headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.props.token }
          })
          .then(this.fetchStatusCheck)
          .then(this.loadedSearchResults)
          .catch(this.setAlert)
        }
        break;
      default:
    }
  }

  messageArrived(json) {
    let messages = this.state.dialogue;
    let convs = this.state.conversations;

    if (typeof json == 'string'){
      let json1 = JSON.parse(json);
      json = {
        conversationId: json1.ConversationId,
        timestamp: json1.Timestamp,
        user: json1.User,
        content: json1.Content,
        id: json1.Id
      };
    }

    // обновляем обсуждения, свежее двигаем вверх
    if ( convs !== null ){
      let remote_user = json.user;
      for (let i in convs){
        if (convs[i].id === json.conversationId ) {
          // запоминаем id корреспондента (сообщение могло быть и от нас)
          remote_user = convs[i].participant;
          // удаляем старое
          convs.splice(i,1);
        }
      }
      // добавляем новое вперед списка
      convs = [{ lastMessage: json, participant: remote_user, id: json.conversationId }].concat(convs);
    }

    // это сообщение из текущего диалога?
    if ( (json.conversationId === 'public' && this.state.current_conversation === 'public') ||
         (json.user === this.state.userid) ||
         (json.user === this.state.current_conversation) )
    {
      // Обновляем текущий диалог
      if ( messages === null )
        messages = [json];
      else{
        // избегаем дублей (например, когда сообщение пришло и через сокет, и через REST)
        let found = false;
        for (let i in messages){
          if (messages[i].id === json.id)
          {
            found = true;
            break;
          }
        }
        if ( !found )
          messages.push(json);
      }
    }

    this.setState({ dialogue: messages, conversations: convs});
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

          <div className="msg-search dropdown">
              <input type="text" className="form-control dropdown-toggle"
                  id="searchSting" data-toggle="dropdown" placeholder="Search user"
                  value={this.state.search_string} onChange={this.handleInputChange}/>
              <SearchResults hits={this.state.search_results} selectUser={this.onUserSelection} />
          </div>

          <div className="msg-list" style={{ overflow:"hidden", overflowY:"scroll" }}>
              <ConversationsList list={this.state.conversations} sel={this.state.current_conversation}
                  resolve={this.resolveUser} onChange={this.onUserSelection} />
          </div>

          <div className="msg-dialogue text-center" style={{ overflow:"hidden", overflowY:"scroll" }}>
              <Dialogue messages={this.state.dialogue} self={this.state.userid} resolve={this.resolveUser}
                  selectUser={this.onUserSelection}/>
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
          <Websocket url={'ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token='+this.props.token } onMessage={this.messageArrived} />
      </div>
    );
  }
}

function ConversationsList(props) {

  let listItems = []
  console.log(props.list);
  console.log(props.sel);

  for (let key in props.list){

    const cnv        = props.list[key];

    const id         = cnv.id;
    const name       = (id === 'public')?'Public chat' : props.resolve(cnv.participant);
    const cnvid      = (id === 'public')?'public' : cnv.participant;

    const wasmessage = (cnv.lastMessage !== undefined);
    const time       = wasmessage ? format(cnv.lastMessage.timestamp) : '';
    let message      = wasmessage ? cnv.lastMessage.content : '';

    // cut message if needed
    if (message.length > MESSAGE_PREVIEW_MAXLEN)
     message = message.slice(0,MESSAGE_PREVIEW_MAXLEN-3) + '...'

    let clsname = "list-group-item list-group-item-action"
    if ( props.sel === cnvid )
      clsname += " active";

    console.log('render li');
    console.log(cnvid);

    listItems.push(
      <li href="/#" className={clsname} key={cnvid} id={cnvid} onClick={props.onChange}>
        <div className="d-flex w-100 justify-content-between" id={cnvid}>
          <h5 className="mb-1" id={cnvid}>{name}</h5>
          <small id={cnvid}>{time}</small>
        </div>
        <small id={cnvid}>{message}</small>
      </li>);
  }

  return (
      <ul className="list-group shadow ">{listItems}</ul>
  );
}


function Dialogue(props) {
  let messages = []

  for (let key in props.messages){

    const msg     = props.messages[key];
    const content = msg.content;
    const time    = format(msg.timestamp);
    const id      = msg.id;
    //const convid = msg.conversationId;
    const participant = msg.user;
    let bckg      = 'lightgoldenrodyellow';
    let itsme      = false;

    if (props.self === participant){
      itsme = true;
      bckg = 'lightblue';
    }

    messages.push(
      <div className="row" style={{padding:'5px'}} key={id}>
        { itsme && <div className="col-4"></div> }
        <div className="col-8 text-left">
          <div className="list-group-item list-group-item-action" style={{background:bckg}}>
            <div className="d-flex justify-content-between">
              <h5 className="mb-1">
                { itsme ?
                  props.resolve(participant) :
                  <a href="/#" id={participant} onClick={props.selectUser}> {props.resolve(participant)} </a>
                }
              </h5>
              <small>{time}</small>
            </div>
            <p className="mb-1">{content}</p>
          </div>
        </div>
        { itsme || <div className="col-4"></div> }
      </div>
    );
  }

  if (messages.length === 0)
    return ( <small>No conversation is loaged yet.</small> );
  else
    return ( <div className="container-fluid">{messages}</div> );
}

function SearchResults(props) {
  let hits = []
  for (let key in props.hits){
    const name = props.hits[key].name;
    const id = props.hits[key].id;
    hits.push(
      <a className="dropdown-item" href="/#" id={id} key={id} onClick={props.selectUser}>{name}</a>
    );
  }

  /*if (hits.length === 0)
    return null;
  else*/
    return ( <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">{hits}</div> );
}

export default Messenger;
