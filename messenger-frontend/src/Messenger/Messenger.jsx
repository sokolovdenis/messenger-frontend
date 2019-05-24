import React, {Component} from 'react'
import {history} from "../helpers/history";
import {ChatList} from "../ChatList";
import {ChatMessages} from "../ChatMessages";

import './Messenger.css';
import {ChatSender} from "../ChatSender/ChatSender";
import {UserSearch} from "../UserSearch";

export class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: new Map(),
            query: '',
            queryResults: [],
            users: new Map(),
            watchedChats: new Set(),
            myName: '',
            myId: '',
        };



        this.handleChatSelected = this.handleChatSelected.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNewChat = this.handleNewChat.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.loadChats = this.loadChats.bind(this);
        this.setChatData = this.setChatData.bind(this);
        this.loadAllMessages = this.loadAllMessages.bind(this);
        this.loadMessages = this.loadMessages.bind(this);

    }

    componentDidMount() {
        this.loadChatsInterval = setInterval(this.loadChats, 1000);
        this.loadAllMessagesInterval = setInterval(this.loadAllMessages, 1000);
        this.getMyData();

        this.ws = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${this.props.token}`);

        this.ws.onmessage = (e) => {
            const msg = e.data;
            let chats = this.state.chats;
            let chat = chats.get(msg.User);
            if (!chat) return;
            chat.messages.push(msg.Content);
            chats.set(msg.User, chat);
            this.setState({chats: chats});
            if (msg.User === this.state.selectedChatKey) {
                let objDiv = document.getElementById("messagesScroller");
                objDiv.scrollTop = objDiv.scrollHeight;
                this.setState({selectedChat: this.state.chats.get(msg.User)});
            }
        };
    }
    componentWillUnmount() {
        clearInterval(this.loadChatsInterval);
        clearInterval(this.loadAllMessagesInterval);

        this.ws.close();
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

    watchChat(chatId) {
        let watchedChats = this.state.watchedChats;
        watchedChats.add(chatId);
        this.setState({watchedChats: watchedChats});
        console.log("now watching", chatId);
        console.log(this.state.watchedChats);
    }

    loadAllMessages() {
        for (let id of this.state.watchedChats) {
            this.loadMessages(id);
        }
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
            this.setState({chats: chats});
            this.forceUpdate();
            if (messages.length > 0) {
                let objDiv = document.getElementById("messagesScroller");
                objDiv.scrollTop = objDiv.scrollHeight;
                if (chatId === this.state.selectedChatKey) {
                    this.setState({selectedChatKey: chatId, selectedChat: this.state.chats.get(chatId)});
                }
            }
            if (messages.length === loadCount) {
                this.loadMessages(chatId);
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
        let key = 'public';
        if (chatData.id !== 'public'){
            key = chatData.participant;
        }
        chats.set(key, chat);
        this.setState({chats: chats});
    }


    queryUsers(query){

        if (!this.props.token || !query) {
            this.setState({queryResults: []});
            return;
        }


        let url = `http://messenger.westeurope.cloudapp.azure.com/api/users?query=${query}`;
        let promise = fetch(
            url,
            {
                method: 'GET',
                headers: {
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
            this.setState({queryResults: json});
        }).catch(err => {
            Promise.resolve(err.response.text()).then(value => {
                alert("Error getting queryUsers " + value);
            });
        });
    }

    getUserById(id) {
        if (id === "public") {
            return id;
        }

        if (this.state.users.has(id)) {
            return this.state.users.get(id);
        }

        this.state.users.set(id, 'Loading...');
        this.setState({users: this.state.users});
        let url = `http://messenger.westeurope.cloudapp.azure.com/api/users/${id}`;
        let promise = fetch(
            url,
            {
                method: 'GET',
                headers: {
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
            let users = this.state.users;
            users.set(id, json.name);
            this.setState({users: users});
        }).catch(err => {});


        return id;
    }

    getMyData() {

        if (!this.props.token) {
            return;
        }

        let url = `http://messenger.westeurope.cloudapp.azure.com/api/users/me`;
        let promise = fetch(
            url,
            {
                method: 'GET',
                headers: {
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
            this.setState({myName: json.name, myId: json.id});
        }).catch(err => {});

    }

    render() {
        return (
            <div className="MessengerContainer">
                <div className="row h-100 m-0 p-0">

                    <aside className="col col-md-4 ChatListContainer">
                        <UserSearch handleSearch={this.handleSearch}/>
                        <ChatList chats={this.state.chats}
                                  query={this.state.query}
                                  queryResults={this.state.queryResults}
                                  handleChatSelected={this.handleChatSelected}
                                  handleNewChat={this.handleNewChat}
                                  getUserById={this.getUserById}
                        />
                        <button className="btn btn-outline-secondary" onClick={this.logout}>Log out</button>
                    </aside>
                    <main className="col col-md-8 ChatContainer">
                        <div id="messagesScroller" className="ChatMessagesContainer">
                            <ChatMessages  chat={this.state.selectedChat}
                                           getUserById={this.getUserById}
                                           myId={this.state.myId}
                            />
                        </div>
                        <div className="ChatTextFieldContainer" >
                            <ChatSender handleSendMessage={this.handleSendMessage}/>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    logout() {
        localStorage.removeItem('user-token');
        history.push("/");
    }

    handleChatSelected(key) {
        this.setState({selectedChatKey: key, selectedChat: this.state.chats.get(key)});
        this.watchChat(key);
    }

    handleNewChat(key) {
        let chats = this.state.chats;
        let chat = {
            lastMessage: '',
            messages: []
        };
        chats.set(key, chat);
        this.setState({chats: chats});
        this.handleChatSelected(key);
    }

    handleSendMessage(message) {
        this.sendMessage(message);
    }

    handleSearch(query) {
        this.setState({query: query});
        this.queryUsers(query);
    }

}
