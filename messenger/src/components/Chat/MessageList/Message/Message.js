import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import './Message.css'


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
        if (this.props.senderId===this.props.ownerId) {
            return (
                <div className="outgoing-msg" key={this.props.id}>
                    <div className="sent-msg">
                        <p>{this.props.text}</p>
                        <span className="time-date">
                            <TimeAgo date={this.props.time}/>
                        </span> 
                    </div>
                </div>
            );
        } else {
            return (
                <div className="incoming-msg">
                    <div className="incoming-msg-img"> 
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
                    </div>
                    <div className="received-msg">
                        <div className="received-withd-msg">
                            <div onClick={this.handleClick}>
                                {this.props.showName(this.props.senderId)}
                            </div>
                            <p>{this.props.text}</p>
                            <span className="time-date">
                                <TimeAgo date={this.props.time}/>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Message