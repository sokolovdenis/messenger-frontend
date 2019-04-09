import React, {Component} from 'react';
import './Message.css';
import {formatTimestamp} from "../../utils/formatTimestamp";

class Message extends Component {
    render() {
        const {timestamp, user, content} = this.props;

        return (
            <div className="Message">
                <div className="Message__info">
                    <div className="Message__author">{user}</div>
                    <div className="Message__timestamp">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="Message__content">{content}</div>
            </div>
        );
    }
}

export default Message;
