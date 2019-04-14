import React, { Component } from 'react';
import Conversation from './Conversation/Conversation'
import './ConversationList.css'


class ConversationList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="inbox-chat">
                {this.props.chats.map((chat, index) => (
                    <Conversation key={chat.id}
                            chatId={chat.id} 
                            chatName={chat.name}
                            text={chat.text}
                            date={chat.date}
                            />
                ))}
            </div>
        )
    }
}

export default ConversationList