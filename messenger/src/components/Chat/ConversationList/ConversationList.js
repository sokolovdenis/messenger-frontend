import React, { Component } from 'react';
import Conversartion from './Conversartion/Conversartion'
import './ConversartionList.css'


class ConversartionList extends Component {
    render() {
        return (
            <div className="inbox-chat">
                {this.props.chats.map((chat, index) => {
                    <Conversartion key={chat.id}
                            chatId={chat.id} 
                            chatName={chat.name}
                            text={chat.text}
                            date={chat.date}
                            />
                })}
            </div>
        )
    }
}

export default ConversationList