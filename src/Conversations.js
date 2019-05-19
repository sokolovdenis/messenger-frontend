import {conversations} from "./Api";
import React, {Component} from 'react';
import Message from "./Message";

class Conversations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: []
        };

        this.getMessages();
    }

    getMessages() {
        conversations(this.props.token).then(data => {
            this.setState({conversations: data});
        });
    }

    componentDidMount() {
        this.getMessages();
    }

    openConversation(id) {
        this.props.handler(id);
    }

    render() {
        return (
            this.state.conversations.map(conv => {
                return (
                    <div key={conv.id} className="Conversation">
                        <Message message={conv.lastMessage} />
                        <button type="button" id="element" onClick={() => this.openConversation(conv.id)}> Open </button>
                    </div>
                );})
        );
    }
}

export default Conversations;