import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import './Conversation.css'


class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChatId: 1,
            chatName: this.props.chatName === null?this.props.chatId:this.props.chatName,
        }
    }

    render() {
        console.log(this.state.chatName);
        var chatListClassName = "chat-list";
        if (this.state.activeChatId === this.props.chatId) {
            chatListClassName = "chat-list active-chat";
        }
        /*this.props.text - это последнее сообщение в обсуждении */
        return (
            <div className={chatListClassName}>
                <div className="chat-people">
                    <div className="chat-img"> 
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
                    </div>
                    <div className="chat-ib">
                        <h5>
                            {this.state.chatName} 
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

export default Conversation