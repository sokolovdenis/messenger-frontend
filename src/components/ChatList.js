import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PulicChat from "./PulicChat";


class ChatList extends Component {
    constructor(props) {
        super(props);

        this.openPublicConversation = this.openPublicConversation.bind(this);
    }

    openPublicConversation() {
        ReactDOM.render(
            <PulicChat socket={this.props.socket}/>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                {this.props.conversations.map((conversation, i) => {
                    return  (
                        <div key={conversation.id}>
                            <div>
                                <b onClick={this.openPublicConversation}>
                                    Group chat
                                </b>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ChatList;