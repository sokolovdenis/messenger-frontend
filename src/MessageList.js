import React, {Component} from 'react';
import './MessageList.css'
export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.getMe = props.getMe;
        this.getMessages = props.getMessages;
        this.getUserNameFromId = props.getUserNameFromId
    }

    render() {
        return (
            <div className="message-list">
                {
                    this.getMessages().map((message, index) => {
                        if(message.user !== this.getMe().id) {
                            return (
                                <div key={index} className="message">
                                    <div className="message-username">{this.getUserNameFromId(message.user)}</div>
                                    <div className="message-text">{message.content}</div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="my-message">
                                    <div className="message-username">{this.getUserNameFromId(message.user)}</div>
                                    <div className="message-text">{message.content}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}