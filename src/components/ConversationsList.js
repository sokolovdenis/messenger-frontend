import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ConversationsList.css';
import PublicConversation from "./PublicConversation";


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


    openConversation() {
        console.log("private");
    }

    render() {
        return (
            <div>
                <ul className='conversations-list'>
                    {this.props.conversations.map(conversation => {
                        let isPublic = conversation.participant === null;
                        if (isPublic) {
                            return (
                                <li key={conversation.id} onClick={this.openPublicConversation}>
                                    <div>
                                        Public conversation
                                        <br/>
                                        Last message:
                                        {conversation.lastMessage.content}
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li key={conversation.id} onClick={this.openConversation}>
                                    <div>
                                        {conversation.participant}
                                        <br/>
                                        {conversation.lastMessage.content}
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        );
    }
}

export default ConversationsList;