import React, { Component } from "react";
import { GetConversations, GetUserName } from "./requests.js"
import { ListGroup } from "react-bootstrap";

export default class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            loaded: true,
            callback: props.callback,
            currentActive: null
        };
        this.getChatsList();
        console.log('const')
    }

    componentWillReceiveProps(props) {
        this.setState({
            chats: [],
            loaded: false,
            callback: props.callback
        });
    }

    componentDidUpdate() {
        console.log('didUpd')
        if (!this.state.loaded) {
            this.setState({ loaded: true });
            this.getChatsList();
        }
        this.updateChatNames();
    }

    updateChatNames = () => {
        this.state.chats.map(m => { this.setUserName(m); return m });
    }

    setUserName = chat => {
        let oldName = chat.name;
        chat.name = GetUserName(chat.participant,
            (user, name) => {
                let ch = this.state.chats.find(ch => ch.id === chat.id);
                ch.name = name;
                this.setState({});
            });
        if (chat.name != oldName) {
            this.setState({});
        }
    }

    handleClick = (key, e) => {
        e.preventDefault();
        let chatInd = this.state.chats.findIndex(value => value.id === key);
        let chat  = this.state.chats[chatInd];
        if (this.state.currentActive !== null) {
            this.state.currentActive.active = false;
        }
        this.state.currentActive = chat;
        this.state.chats[chatInd].active = true;
        this.state.callback(chat);
        this.setState({});
    }

    getChatsList = () => {
        let promise = GetConversations();
        promise.then((lst) => lst.map((json) => ({
            "id": json.id,
            "participant": json.participant,
            "name": "Loading",
            "active": this.state.currentActive === null ? false : (json.id == this.state.currentActive.id ? true : false)
        }))).then(
            (lst) => {
                this.setState({ chats: lst });
                this.updateChatNames();
                return lst;
            });
    }

    render() {
        return (
            <div>
                <h3>Your chats</h3>
                <ListGroup>{this.state.chats.map(chat =>
                    <ListGroup.Item
                        key={chat.id}
                        action
                        onClick={this.handleClick.bind(null, chat.id)}
                        active={chat.active}>
                        {   chat.name == null
                                ? chat.id
                                : chat.name}
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}
