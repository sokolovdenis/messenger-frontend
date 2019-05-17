import React, { Component } from "react";
import { GetConversations, GetUserName } from "./requests.js"

export default class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            loaded: true,
            callback: props.callback
        };
        this.getChatsList();
    }

    componentWillReceiveProps(props) {
        this.setState({
            chats: [],
            loaded: false,
            callback: props.callback
        });
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateChatNames();
        console.log("propU")
    }

    componentDidUpdate() {
        if (!this.state.loaded) {
            this.setState({ loaded: true });
            this.getChatsList();
        }
    }

    updateChatNames = () => {
        this.state.chats.map(m => { this.setUserName(m); return m });
    }

    setUserName(chat) {
        chat.name = GetUserName(chat.participant,
            (user, name) => {
                let chInd = this.state.chats.findIndex(ch => ch.id === chat.id);
                this.state.chats[chInd].name = name;
                this.setState({});
            });
    }

    handleClick = (key, e) => {
        e.preventDefault();
        let chat = this.state.chats.find(value => value.id === key);
        this.state.callback(chat);
    }

    getChatsList() {
        let promise = GetConversations();
        promise.then((lst) => lst.map((json) => ({
            "id": json.id,
            "participant": json.participant,
            "name": GetUserName(json.participant, (user, name) => name)
        }))).then(
            (lst) => {
                this.setState({ chats: lst });
                return lst;
            });
    }

    render() {
        return (
            <ul>{this.state.chats.map(chat =>
                <li key={chat.id} onClick={this.handleClick.bind(null, chat.id)}>
                    {console.log(chat)}{
                        chat.name == null
                            ? chat.id
                            : chat.name}
                </li>)}
            </ul>
        );
    }
}
