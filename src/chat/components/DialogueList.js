import React, { Component } from 'react';
import Dialogue from './Dialogue'
import '../css/DialogueList.css'


class DialogueList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="inbox-chat">
                {this.props.chats.map((chat, index) => (
                    <Dialogue key={chat.id + " " + index}
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

export default DialogueList
