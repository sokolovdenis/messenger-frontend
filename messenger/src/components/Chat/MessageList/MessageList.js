import React, { Component } from 'react';
import Message from './Message/Message'
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.scrollToBottom  = this.scrollToBottom.bind(this);
    }
    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    
    componentDidUpdate() {
        // можно при появлении нового сообщения не росто прокручивать вниз
        // а просто оповещать о новых сообщениях
        // в каких ситуациях вызывается update?
        this.scrollToBottom();
    }

    render() {
        // что выводить если сообщений нет?
        // если сообщений нет то и нет chatId, но нам он и не нужен
        return (
            <div>
                <div className="msg-header">
                    {this.props.showName(this.props.activeChatName)}
                </div>
                <div className="msg-history" 
                    ref={(div) => {
                        this.messageList = div;
                    }}
                >
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
            </div>
        )
    }
}

export default MessageList