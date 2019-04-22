import React, { Component } from 'react';
import Conversation from './Conversation/Conversation'
import './ConversationList.css'


class ConversationList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.chats);
        return (
            <div className="inbox-chat">
                {this.props.chats.map((chat, index) => (
                    <Conversation key={chat.id}
                            chatId={chat.id} 
                            chatName={chat.participant}
                            text={chat.lastMessage.content}
                            date={chat.lastMessage.timestamp}
                            />
                ))}
            </div>
        )
    }
}

export default ConversationList