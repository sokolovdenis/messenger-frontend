import React, { Component } from 'react';
import './Message.css'


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ownerId: 1,
        }
    }

    render() {
        if (this.props.senderId===this.state.ownerId) {
            return (
                <div className="outgoing-msg" key={this.props.id}>
                    <div className="sent-msg">
                        <p>{this.props.text}</p>
                        <span className="time-date">{this.props.time}</span> 
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
                            <p>{this.props.text}</p>
                            <span className="time-date">{this.props.time}</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Message