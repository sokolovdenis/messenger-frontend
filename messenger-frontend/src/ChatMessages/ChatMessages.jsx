import React, {Component} from 'react'


export class ChatMessages extends Component {
    render() {

        const {chat} = this.props;

        if (chat) {
            const messages = chat.messages.map(msg => (
                <li>{msg.content}</li>
            ));
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