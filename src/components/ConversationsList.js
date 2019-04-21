import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PublicConversation from "./PublicConversation";
import PrivateConversation from "./PrivateConversation";
import {getUser} from "../Api";


class ConversationsList extends Component {
    constructor(props) {
        super(props);

        this.openPublicConversation = this.openPublicConversation.bind(this);
        this.openConversation = this.openConversation.bind(this);
    }

    openPublicConversation() {
        ReactDOM.render(
            <PublicConversation />,
            document.getElementById('root')
        );
    }


    openConversation(event) {
        ReactDOM.render(
            <PrivateConversation userId={event.target.id} />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <ul className='conversations-list'>
                    {this.props.conversations.map((conversation, i) => {
                        return conversation.participant === null ? (
                                <li key={conversation.id}>
                                    <section>
                                        <a onClick={this.openPublicConversation}>
                                            Public conversation
                                        </a>
                                        <br/>
                                        <p className="info">
                                            Last message:
                                            {conversation.lastMessage.content}
                                        </p>
                                    </section>
                                </li>
                            ) : (
                                <li key={conversation.id}>
                                    <section>
                                        <a id={conversation.participant} onClick={this.openConversation}>
                                            {this.props.users[i]}
                                        </a>
                                        <br/>
                                        <p className="info">
                                            Last message:
                                            {conversation.lastMessage.content}
                                        </p>
                                    </section>
                                </li>
                            );
                    })}
                </ul>
            </div>
        );
    }
}

export default ConversationsList;