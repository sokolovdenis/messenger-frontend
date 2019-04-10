import React, {Component} from 'react';
import './ChatPreview.css';
import {formatTimestamp} from "../../utils/formatTimestamp";
import {cutString} from "../../utils/cutString";

class ChatPreview extends Component {
    render() {
        const {lastMessage, id} = this.props;
        const {timestamp, user, content} = lastMessage;

        return (
            <div className="ChatPreview">
                <div className="ChatPreview__title">
                    <div className="ChatPreview__chatName">{id === "public" ? "Общая беседа" : cutString(user)}</div>
                    <div className="ChatPreview__timestamp">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="ChatPreview__lastMessage">
                    {id === "public"
                        ? <div className="ChatPreview__author">{cutString(user)}</div>
                        : null}
                    <div className="ChatPreview__message">{cutString(content)}</div>
                </div>
            </div>
        );
    }
}

export default ChatPreview;
