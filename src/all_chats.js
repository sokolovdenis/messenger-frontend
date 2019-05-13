import React, {Component} from 'react';
import { getAllChats, getUser } from "./api";
import Message from "./message";


class AllChats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            names: new Map(),
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateChats = this.updateChats.bind(this);
    }

    updateChats() {
        getAllChats().then(chats => {
            this.setState({chats: chats});
            chats.map(chat => {
                getUser(chat.participant).then(name => {
                    var names = this.state.names;
                    names.set(chat.id, name.name);
                    // chat.id = name.name;
                    this.setState({names: names});
                });

            });

        });
    }

    componentDidMount() {
        setInterval(
            () => this.updateChats(),
            500,
        );
    }

    render() {
        let i = 0;
        return (
            <div>
                {
                    this.state.chats.map(chat => {
                        return (
                            <div className="Chat_css" key={chat.id} onClick={() => this.props.onChatClick(chat.participant, this.state.names.get(chat.id))} >
                                <text>{chat.id}</text>
                                <Message user={chat.lastMessage.user} msg={chat.lastMessage.content} time={chat.lastMessage.timestamp} />
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}

export default AllChats;