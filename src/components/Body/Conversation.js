import React, { Component } from 'react';
import Messages from './Messages';
import SendMessage from './SendMessage';

export default class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='col-7'>
        <Messages
          token={this.props.token}
          messages={this.props.messages} />
        <SendMessage
          token={this.props.token}
          participantId={this.props.participantId} />
      </main>
    );
  }
}
