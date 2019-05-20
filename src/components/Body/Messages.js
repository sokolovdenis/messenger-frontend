import React, { Component } from 'react';
import Message from './Message';

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'instant' });
  }

  render() {
    console.log(3);
    return (
      <div className='__messages'>
        {this.props.messages.map(message => (
          <Message
            token={this.props.token}
            key={message.id}
            user={message.user}
            content={message.content}
            timestamp={message.timestamp} />
        ))}
        <div ref={el => { this.el = el; }} />
      </div>
    );
  }
}
