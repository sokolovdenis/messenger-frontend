import React, { Component } from 'react';
import Conversation from './Conversation';
import LeftSideBody from './LeftSideBody';
import SignIn from './SignIn';
import SignUp from './SignUp';

const axios = require('axios');

async function getUserName(user, token) {
  if (user) {
    let url = `http://messenger.westeurope.cloudapp.azure.com/api/users/${user}`;
    let config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }

    let response = await axios.get(
      url, config
    ).catch(error => {
      console.log(error);
    });

    return response.data.name;
  } else {
    return;
  }
}

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversationId: 'public',
      participantId: null,
      conversationCards: [],
      messages: [],
      webSocketConnected: false
    };

    this.formatDate = this.formatDate.bind(this);
    this.manageWebSocket = this.manageWebSocket.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.getConversationCards = this.getConversationCards.bind(this);
    this.getConversation = this.getConversation.bind(this);
    this.changeConversation = this.changeConversation.bind(this);
  }

  manageWebSocket(close) {
    if (close) {
      this.webSocket.close();
    } else {
      this.webSocket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${this.props.token}`);

      this.setState({
        webSocketConnected: true
      })

      this.webSocket.onclose = () => {
        this.setState({
          webSocketConnected: false
        })
      }

      this.webSocket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if (
          (this.state.conversationId === 'public' && data['ConversationId'].startsWith('00000000-0000-0000-0000-000000000000'))
          || (this.state.conversationId === data['ConversationId'])
          || this.state.conversationId === null
        ) {
          let messages = this.state.messages;
          messages.push(data);

          this.setState({
            messages: messages
          });

          let conversation = document.getElementsByClassName('__messages')[0];

          getUserName(data['User'], this.props.token).then(response => {
            let html = `<div class='__inserted__messages __message' id='${data['Id']}'>`
              + `${response}<br />`
              + `${data['Content']}<br />`
              + `<div class='__date'>${this.formatDate(data['Timestamp'])}</div>`
              + `</div>`;
            conversation.insertAdjacentHTML('beforeend', html);

            let message = document.getElementById(`${data['Id']}`);
            message.scrollIntoView({ behavior: 'instant' });
          })
        }
      }
    }
  }

  formatDate(date) {
    let dateObject = new Date(date);
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    let hour = dateObject.getHours();
    let minute = dateObject.getMinutes();
    let second = dateObject.getSeconds();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (second < 10) {
      second = '0' + second;
    }

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }

  componentDidMount() {
    if (this.props.token) {
      this.getConversationCards();
      this.getConversation();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    console.log(prevProps);
    if (
      (this.props.token !== prevProps.token)
      || (this.state.conversationId !== prevState.conversationId)
      || (this.state.participantId !== prevState.participantId)
    ) {
      let messages = document.getElementsByClassName('__inserted__messages __message');
      for (let i = 0; i < messages.length; ++i) {
        messages[i].remove();
        --i;
      }
      this.getConversationCards();
      this.getConversation();
    }

    if (this.props.token) {
      if (!this.state.webSocketConnected) {
        this.manageWebSocket(false);
      }
    } else {
      this.manageWebSocket(true);
    }
  }

  updateToken(token, tokenExpirationDate) {
    this.props.updateToken(token, tokenExpirationDate);
  }

  getConversationCards() {
    let url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations';
    let config = {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    };

    axios.get(
      url, config
    ).then(response => {
      if (response.status === 200) {
        this.setState({
          conversationCards: response.data
        })
      } else {
        throw new Error('Error during geting list of conversations')
      }
    }).catch(error => {
      console.log(error);
    });
  }

  getConversation() {
    let url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages`;
    if (this.state.participantId) {
      url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.state.participantId}/messages`;
    }
    let config = {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    };

    axios.get(
      url, config
    ).then(response => {
      if (response.status === 200) {
        this.setState({
          messages: response.data
        });
      } else {
        throw new Error('Error during geting active conversation')
      }
    }).catch(error => {
      console.log(error);
    });
  }

  changeConversation(conversationId, participantId) {
    this.setState({
      conversationId: conversationId,
      participantId: participantId
    });
  }

  render() {
    if (this.props.token) {
      console.log(2);
      return (
        <div className='container'>
          <div className='row'>
            <LeftSideBody
              token={this.props.token}
              conversationCards={this.state.conversationCards}
              changeConversation={this.changeConversation} />
            <Conversation
              token={this.props.token}
              messages={this.state.messages}
              participantId={this.state.participantId} />
          </div>
        </div>
      );
    } else {
      return (
        <div className='container'>
          <div className='jumbotron'>
            <p>
              <b>Package</b> - is an awesome messaging app created by developers for developers.<br />
              It has following features:
            </p>
            <ul>
              <li>Public message room</li>
              <li>Private message rooms</li>
              <li>Adaptive layout</li>
              <li>Simple and comprehensive design</li>
            </ul>
            <hr></hr>
            <p className='text-center'>
              Sign in to start messaging!
            </p>
            <SignIn updateToken={this.updateToken} />
            <hr></hr>
            <p className='text-center'>
              New to <b>Package</b>?<br />
              Register with <b>Package</b> and you’ll get access to all our benefits.
            </p>
            <SignUp updateToken={this.updateToken} />
          </div>
        </div>
      );
    }
  }
}
