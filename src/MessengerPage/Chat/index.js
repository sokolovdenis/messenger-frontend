import React from 'react';
import ChatSend from './ChatSend'
import {  HttpRequestPostMessage } from '../../HttpRequest'
import Message from './Message'

class Chat extends React.Component {

  constructor(props) {
    super(props)

    this.thisMyMessage = this.thisMyMessage.bind(this);
    this.handleSubmitPostMessage = this.handleSubmitPostMessage.bind(this);
    this.newConversation = this.newConversation.bind(this);

    this.findUserName = this.findUserName.bind(this);
  }
  componentWillUpdate() {
    let divElement = document.getElementById('messagesDiv');
    divElement.scrollTop = divElement.scrollHeight;
  }
  findUserName(userId) {
    let result = [];
    if (this.props.userNames)
      result = this.props.userNames.filter(item => item.id === userId);

    if (result.length === 0) {
      return 'поиск...';
    }
    else {
      return result[0].name;
    }
  }
  
  newConversation(userId) {
    this.props.newConversation(userId);
  }

  thisMyMessage(messageUserId) {
    if (this.props.thisUserId === messageUserId) {
      return true;
    }
    else { return false; }
  }

  /*POST*/
  handleSubmitPostMessage(content) {
    HttpRequestPostMessage(this.props.conversionId, this.props.token, content)
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        else {
          alert('При получении сообщений произошла ошибка!');
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
      /* раньше я сразу отображал отправленное сообщение, теперь должны завестить сокеты */
      }).catch(function (error) {
        console.log(error);
        alert('При получении сообщений произошла ошибка!');
      })
  }

  render() {
    return (
      <div className="ChatPanel">
        <h1>{this.props.conversionName}</h1>
        <div className="messages" id="messagesDiv">
          {this.props.messages ?
            this.props.messages.map(item => (
              <Message 
                key={this.props.conversionId + item.id+item.timestamp}
                content={item.content}
                timestamp={item.timestamp}
                userId={item.user}
                myMessage={this.thisMyMessage(item.user)}
                messageId={item.id}
                token={this.props.token}
                newConversation={this.newConversation}
                id={this.props.conversionId + item.id+item.timestamp}

                userName={this.findUserName(item.user)}
              >
              </Message>)) : <div>{'Полковнику никто не пишет.'}</div>}
        </div>
        <ChatSend onSubmit={this.handleSubmitPostMessage} />
      </div>
    );
  }

}
export default Chat;