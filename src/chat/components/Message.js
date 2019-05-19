import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import '../css/Message.css'


class Message extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.selectConversation(this.props.senderId);
    }

    render() {
        if (this.props.senderId !== this.props.ownerId) {
            return (
                <div className="non-owner-message">
                    <div className="non-owner-received-message">
                        <div className="non-owner-received-withd-message">
                            <div onClick={this.handleClick}>
                                {this.props.showName(this.props.senderId)}
                            </div>
                            <p>{this.props.text}</p>
                            <span className="message-time">
                                <TimeAgo date={this.props.time}/>
                            </span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="owner-message" key={this.props.id}>
                    <div className="owner-message-sent">
                        <p>{this.props.text}</p>
                        <span className="message-time"><TimeAgo date={this.props.time}/></span>
                    </div>
                </div>
            );
        }
    }
}

export default Message
