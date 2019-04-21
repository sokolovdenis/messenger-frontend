import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PrivateConversation from "./PrivateConversation";
import {getUser} from "../Api";


class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.openPrivateConversation = this.openPrivateConversation.bind(this);
    }

    openPrivateConversation(event) {
        ReactDOM.render(
            <PrivateConversation userId={event.target.id}/>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <ul className='messages-list'>
                    {this.props.messages.map((message, i) => {
                        return (
                            <li key={message.id}>
                                <section>
                                    <a id={message.user} onClick={this.openPrivateConversation}>
                                        { (this.props.users.length > i) ? this.props.users[i] : 'Some person'}
                                    </a>
                                    <br/>
                                    <p className="info">{message.content}</p>
                                </section>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessagesList;