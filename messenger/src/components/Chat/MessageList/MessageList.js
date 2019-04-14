import React, { Component } from 'react';
import Message from './Message/Message'
import './MessageList.css'


class MessageList extends Component {
    render() {
        return (
            <div className="msg-history">
                {this.props.messages.map((message, index) => {
                    <Message key={message.id} 
                            senderId={message.senderId}
                            text={message.text}
                            time={message.time}
                            />
                })}
            </div>
        )
    }
}

export default MessageList