import React, {Component} from 'react';
import User from "./User";
import {cutString} from "../utils/cutString";
import {formatTimestamp} from "../utils/formatTimestamp";
import {parseConversationId} from "../utils/parseConversationId";

class ChatPreview extends Component {
    render() {
        const {lastMessage, id} = this.props;
        const {timestamp, user, content} = lastMessage;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <User id={parseConversationId(id)} />
                    </div>
                    <div className="col-auto">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="row">
                    {id === "public"
                        ? (<div className="col-auto">
                            <User id={user} />
                        </div>)
                        : null}
                    <div className="col font-italic">{cutString(content)}</div>
                </div>
            </div>
        );
    }
}

export default ChatPreview;
