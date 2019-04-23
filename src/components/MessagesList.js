import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Conversation from "./Conversation";


class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.openConversation = this.openConversation.bind(this);
    }

    openConversation(event) {
        ReactDOM.render(
            <Conversation userId={event.target.id} isPublic={false} socket={this.props.socket} />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <ul className='messages-list'>
                    {this.props.messages.map((message, i) => {
                        return (
                            <li key={message.id !== undefined ? message.id : message.Id}>
                                <section>
                                    <b id={message.user !== undefined ? message.user : message.User} onClick={this.openConversation}>
                                        { (this.props.users.length > i) ? this.props.users[i] : 'Some person'}
                                    </b>
                                    <br/>
                                    <p className="info">{message.content !== undefined ? message.content : message.Content}</p>
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