import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Conversation from "./Conversation";
import {getUser} from "../Api";


class ConversationsList extends Component {
    constructor(props) {
        super(props);

        this.openPublicConversation = this.openPublicConversation.bind(this);
        this.openConversation = this.openConversation.bind(this);
    }

    openPublicConversation() {
        ReactDOM.render(
            <Conversation isPublic={true} />,
            document.getElementById('root')
        );
    }


    openConversation(event) {
        ReactDOM.render(
            <Conversation userId={event.target.id} isPublic={false} />,
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