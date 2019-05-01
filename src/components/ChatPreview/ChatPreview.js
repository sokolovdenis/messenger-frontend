import React, {Component} from 'react';
import './ChatPreview.css';
import {formatTimestamp} from "../../utils/formatTimestamp";
import {cutString} from "../../utils/cutString";
import User from "../User/User";
import {parseConversationId} from "../../utils/parseConversationId";

class ChatPreview extends Component {
    render() {
        const {lastMessage, id} = this.props;
        const {timestamp, user, content} = lastMessage;

        return (
            <div className="ChatPreview">
                <div className="ChatPreview__title">
                    <User className="ChatPreview__chatName" id={parseConversationId(id)} />
                    <div className="ChatPreview__timestamp">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="ChatPreview__lastMessage">
                    {id === "public"
                        ? <User className="ChatPreview__author" id={user} />
                        : null}
                    <div className="ChatPreview__message">{cutString(content)}</div>
                </div>
            </div>
        );
    }
}

export default ChatPreview;
