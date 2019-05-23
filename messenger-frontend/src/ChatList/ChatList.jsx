import React, {Component} from 'react'


export class ChatList extends Component {


    render() {
        const chats = Array.from( this.props.chats ).map(([key, value]) => (
            <button onClick={() => this.props.handleChatSelected(key)}>
                {key}->{value["lastMessage"]}
            </button>
        ));
        return (
            <div>
                {chats}

            </div>
        );
    }
}