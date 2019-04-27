import React, { Component } from 'react';
import Conversation from './Conversation/Conversation'
import './ConversationList.css'


class ConversationList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // chatName совпадает с id пользователя
        return (
            <div className="inbox-chat">
                {this.props.chats.map((chat, index) => (
                    <Conversation key={chat.id + " " + index}
                            activeChatName={this.props.activeChatName}
                            chatName={chat.participant}
                            showName={this.props.showName}
                            text={chat.lastMessage.content}
                            date={chat.lastMessage.timestamp}
                            selectConversation={this.props.selectConversation}
                            />
                ))}
            </div>
        )
    }
}

export default ConversationList