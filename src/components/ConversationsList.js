import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Conversation from "./Conversation";


class ConversationsList extends Component {
    constructor(props) {
        super(props);

        this.openPublicConversation = this.openPublicConversation.bind(this);
        this.openConversation = this.openConversation.bind(this);
    }

    openPublicConversation() {
        ReactDOM.render(
            <Conversation isPublic={true} socket={this.props.socket}/>,
            document.getElementById('root')
        );
    }


    openConversation(event) {
        ReactDOM.render(
            <Conversation userId={event.target.id} isPublic={false} socket={this.props.socket}/>,
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
                                        <b onClick={this.openPublicConversation}>
                                            Public conversation
                                        </b>
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
                                        <b id={conversation.participant} onClick={this.openConversation}>
                                            {this.props.users[i]}
                                        </b>
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