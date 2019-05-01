import React, {Component} from 'react';
import './Message.css';
import {formatTimestamp} from "../../utils/formatTimestamp";
import User from "../../components/User/User";

class Message extends Component {
    render() {
        const {timestamp, user, content} = this.props;

        return (
            <div className="Message">
                <div className="Message__info">
                    <User className="Message__author" id={user} />
                    <div className="Message__timestamp">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="Message__content">{content}</div>
            </div>
        );
    }
}

export default Message;
