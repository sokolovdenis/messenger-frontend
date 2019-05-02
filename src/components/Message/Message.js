import React, {Component} from 'react';
import './Message.css';
import {formatTimestamp} from "../../utils/formatTimestamp";
import User from "../../components/User/User";

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
