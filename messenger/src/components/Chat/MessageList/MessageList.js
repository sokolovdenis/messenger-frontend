import React, { Component } from 'react';
import Message from './Message/Message'
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="msg-history">
                {this.props.messages.map((message, index) => (
                    <Message key={message.id + " " + index}
                            ownerId={this.props.userId} 
                            senderId={message.user}
                            showName={this.props.showName}
                            text={message.content}
                            time={message.timestamp}
                            />
                ))}
            </div>
        )
    }
}

export default MessageList