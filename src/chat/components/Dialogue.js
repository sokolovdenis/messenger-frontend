import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import '../css/Dialogue.css'


class Dialogue extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if (this.props.activeChatName !== this.props.chatName) {
            this.props.selectConversation(this.props.chatName);
        }
    }

    render() {
        let chatListClassName = "non-active-chat-list";
        if (this.props.activeChatName === this.props.chatName) {
            chatListClassName = "active-chat-list";
        }
        return (
            <div className={chatListClassName} onClick={this.handleClick}>
                <div className="chat-people">
                    <div className="chat-ib">
                        <h5>
                            {this.props.showName(this.props.chatName)} 
                            <span className="chat-date">
                                <TimeAgo date={this.props.date} />
                            </span>
                        </h5>
                        <p>{this.props.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialogue
