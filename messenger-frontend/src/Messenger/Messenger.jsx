import React, {Component} from 'react'
import {history} from "../helpers/history";
import {ChatList} from "../ChatList";
import {ChatMessages} from "../ChatMessages";

import './Messenger.css';
import {ChatSender} from "../ChatSender/ChatSender";

export class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: new Map(),
        };

        this.handleChatSelected = this.handleChatSelected.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);

        this.loadChats();

    }



    loadChats() {
        if (!this.props.token) {
            return;
        }

        let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations";
        let promise = fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`,
                },
            });


        promise.then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                let error = new Error(resp.statusText);
                error.response = resp;
                throw error
            }
        }).then((json) => {
            json.forEach(data => this.setChatData(data));
        }).catch(err => {
            Promise.resolve(err.response.text()).then(value => {
                alert("Error getting chats " + value);
            });
        });
    }

    loadMessages(chatId) {
        const loadCount = 1000;

        if (!this.props.token) {
            return;
        }
        let chats = this.state.chats;

        const chat = chats.get(chatId);
        let fromMessage = 0;
        if (chat.messages.length > 0) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            fromMessage = lastMessage.id + 1;
        }

        let url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${chatId}/messages?From=${fromMessage}&Count=${loadCount}`;
        let promise = fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`,
                },
            });


        promise.then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                let error = new Error(resp.statusText);
                error.response = resp;
                throw error
            }
        }).then((messages) => {
            chat.messages = chat.messages ? chat.messages : [];
            chat.messages.push(...messages);
            chats.set(chatId, chat);
            this.setState({chats: chats})
            this.setState()
            if (messages.length === loadCount) {
                this.loadMessages(chatId);
            } else {
                setTimeout(() => this.loadMessages(chatId), 5000);
            }

        }).catch(err => {
            Promise.resolve(err.response.text()).then(value => {
                alert("Error getting chats " + value);
            });
        });


    }


    sendMessage(message) {
        if (!this.props.token || !this.state.selectedChatKey) {
            return;
        }

        const chatKey = this.state.selectedChatKey;

        let url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${chatKey}/messages`;
        let promise = fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`,
                },
                body: JSON.stringify({content: message})
            });


        promise.then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                let error = new Error(resp.statusText);
                error.response = resp;
                throw error
            }
        }).then((json) => {

        }).catch(err => {
            Promise.resolve(err.response.text()).then(value => {
                alert("Error getting chats " + value);
            });
        });
    }

    setChatData(chatData) {
        let chats = this.state.chats;
        const old = chats[chatData.id];
        let chat = old ? old : {};
        chat.lastMessage = chatData.lastMessage.content;
        chat.messages = [];
        chats.set(chatData.id, chat);
        this.setState({chats: chats});
    }


    render() {
        return (
            <div className="container">
                <div className="row ">

                    <aside className="col col-md-4">
                        <ChatList chats={this.state.chats} handleChatSelected={this.handleChatSelected}/>
                    </aside>
                    <main className="col col-md-8">
                        <div className="ChatContainer">
                            <div className="ChatMessagesContainer">
                                <ChatMessages  chat={this.state.selectedChat}/>
                            </div>
                            <div className="ChatTextContainer" >
                                <ChatSender handleSendMessage={this.handleSendMessage}/>
                            </div>
                        </div>
                    </main>
                    <button className="btn btn-outline-secondary" onClick={this.logout}>Log out</button>
                </div>
            </div>
        );
    }

    logout() {
        localStorage.removeItem('user-token');
        history.push("/");
    }

    handleChatSelected(key) {
        this.setState({selectedChat: this.state.chats.get(key), selectedChatKey: key});
        this.loadMessages(key);
    }

    handleSendMessage(message) {
        this.sendMessage(message);
    }

}
