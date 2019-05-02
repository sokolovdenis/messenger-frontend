import React, {Component} from 'react';
import User from "./User";
import {formatTimestamp} from "../utils/formatTimestamp";

class Message extends Component {
    render() {
        const {timestamp, user, content} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <User id={user}/>
                    </div>
                    <div className="col-auto font-weight-light">{formatTimestamp(timestamp)}</div>
                </div>
                <div className="row">
                    <div className="col text-break">{content}</div>
                </div>
            </div>
        );
    }
}

export default Message;
