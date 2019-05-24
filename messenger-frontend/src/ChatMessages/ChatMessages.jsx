import React, {Component} from 'react'
import './ChatMessages.css'

export class ChatMessages extends Component {

    render() {

        if (this.props.chat) {
            const messages = this.props.chat.messages.map(msg => {
                const bubble_class = msg.user === this.props.myId ? "speech-bubble-me": "speech-bubble-other";
                const key = msg.conversationId + "@" + msg.id;
                return (
                <div className={bubble_class} key={key}>
                    <p>{msg.content}</p>
                    <p className="userCaption">{this.props.getUserById(msg.user)}</p>
                </div>
                )
            });
            return (
                <ul>{messages}</ul>
            )
        } else {
            return (
                <h3>Select Chat</h3>
            )
        }

    }

}