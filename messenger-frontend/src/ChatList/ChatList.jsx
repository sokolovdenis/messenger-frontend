import React, {Component} from 'react'


export class ChatList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chats, query, queryResults} = this.props;
        let filtered = new Map();
        for (let k of chats.keys()){
            if (this.props.getUserById(k).startsWith(query)) {
                filtered.set(k, chats.get(k));
            }
        }
        const chatItems = Array.from( filtered ).map(([key, value]) => (
            <div key={key+this.props.getUserById(key)}>
                <a href="#" onClick={() => this.props.handleChatSelected(key)}>
                    <h5>{this.props.getUserById(key)}</h5>
                    <p>{value["lastMessage"]}</p>
                </a>
                <hr/>
            </div>
        ));

        let newChats = [];
        for (let item of queryResults) {
            if (!chats.has(item.id)) {
                newChats.push(item);
            }
        }
        const newChatItems =  newChats.map(item => (
            <div key={item.id+"#"+item.name}>
                <a href="#" onClick={() => this.props.handleNewChat(item.id)}>
                    <h5>New chat with <b>{item.name}</b></h5>
                </a>
                <hr/>
            </div>


        ));
        return (
            <div>
                {chatItems}
                <br />
                {newChatItems}
            </div>

        );
    }
}