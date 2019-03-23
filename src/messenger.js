import React, { Component } from 'react';

const API_ME = 'http://messenger.westeurope.cloudapp.azure.com/api/users/me'

////////////////////////////////////////////////////////////////////////////////
//
// основная страница мессенджера
//
////////////////////////////////////////////////////////////////////////////////
class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: null,            // warning message to display
      username: '...',          // display user name
      userid: 0                 // this user id
    };

    this.linkLogOut          = this.linkLogOut.bind(this);
    this.setAlert            = this.setAlert.bind(this);
    this.loadedUserName      = this.loadedUserName.bind(this);
    this.fetchStatusCheck    = this.fetchStatusCheck.bind(this);
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

  setAlert(message) {
    // To do: может выводить куда-то в интерфейс?
    console.log(message);
  }

  linkLogOut (event) {
    event.preventDefault();
    this.props.callback({page: 'login', token: null})
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
          <div className="msg-list">
            <ul className="list-group shadow ">
              <li className="list-group-item active">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
          <div className="msg-dialogue text-center">
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

export default Messenger;
