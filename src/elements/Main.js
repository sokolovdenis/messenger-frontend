import React, { Component } from "react";
import UserInfo from "./UserInfo";
import Chat from "./Chat";
import UserList from "./UserList";
import "./Main.css";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem('token'));
        this.socket.onmessage = (event) => {
            this.updateAll();
        };

        this.state = {
            conversations: [],
            publicMessages: [],
            privateMessages: [],
            currentChat:"",
            currentMessageText:"",
            isPublic: true,
            chat_id: "",
            isInFindMode: false
        };

        this.timer = Date.now();

        this.knownUserMap = new Map();
        this.conversation = new Set();
        this.knownIds = new Set();
        this.foundUsers = new Set();

        this.updateAll();
    }

    updateAll(){

        this.getUserInfo();
        if (this.state.isPublic) {
            this.updatePublicMessageList(0, 200);
        } else {
            this.updateConversationMessageList(this.state.chat_id, 0,200);
        }
        this.loadConversations();
        this.forceUpdate();
    }

    updateIds(id){
        this.knownIds.add(id);
    }

    parseConversations() {
        this.state.conversations.forEach((conversation, i) => {
            if (conversation.participant == null) {
                return;
            }
            console.log(conversation, conversation.participant);
            let url = localStorage.getItem('api') + '/api/users/' + conversation.participant;

            let promise =  fetch(url, {
                method : 'GET',
                headers : {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    'id' : conversation.participant
                }
            });

            promise.then(response=>response.json()
                .then(user=>({user, response})))
                .then(({user, response}) => {
                    if (response.ok) {
                        console.log(user.id);
                        this.addConversation(user.id);
                        this.addUser(user.id);
                    } else if (response.status === 400) {
                        console.log('400');
                        localStorage.setItem('error_message','wrong_ids');
                        localStorage.setItem('display_error_message', 'true');
                    } else {
                        console.log('Error')
                        localStorage.setItem('error_message', response.statusText);
                        localStorage.setItem('display_error_message', 'true');
                    }
                }).catch(error => console.log(error));

        })
    }

    updateUserMap(id) {
        let url = localStorage.getItem('api') + '/api/users/' + id;

        let promise =  fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'id' : id
            }
        });
        promise.then(response=>response.json()
            .then(user=>({user, response})))
            .then(({user, response}) => {
                if (response.ok) {
                    this.knownUserMap.set(user.id, user.name);
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));
    }

    addUser(id){
        this.updateIds(id);
        if ( !this.knownUserMap.has(id) ) {
            this.updateUserMap(id);
        }
    }

    addUserWithName(id, name) {
        this.updateIds(id);
        if ( !this.knownUserMap.has(id) ) {
            this.knownUserMap.set(id, name);
        }
    }

    addConversation(id) {
        this.conversation.add(id);
    }

    loadConversations() {

        let url = localStorage.getItem('api') + '/api/conversations';

        let promise =  fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });

        promise.then(response => response.json().then(conversations =>({conversations, response})))
            .then(({conversations, response})=> {
                if(response.ok) {
                    this.setState({'conversations': conversations, 'users': Array(conversations.length)});
                    this.parseConversations();
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));

    }

    getUserInfo(){
        let url = localStorage.getItem('api' ) + '/api/users/me';
        let promise = fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
        promise.then(response=>response.json()
            .then(user=>({user, response})))
            .then(({user, response}) => {
                if (response.ok) {
                    localStorage.setItem('my_name', user.name);
                    localStorage.setItem('my_id', user.id);
                    this.addUserWithName(user.id, user.name);
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));
    }

    updatePublicMessageList(from, count) {
        let url = localStorage.getItem('api') + '/api/conversations/public/messages';

        let promise = fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'From' : from,
                'Count' : count
            }
        });

        promise.then(response=>response.json()
            .then(messages=>({messages, response})))
            .then(({messages, response}) => {
                if (response.ok) {
                    this.setState({'publicMessages': messages} );
                    messages.forEach(message=>{
                        this.addUser(message.user);
                    });
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));
    }

    updateConversationMessageList(id, from, count) {
        let url = localStorage.getItem('api') + '/api/conversations/' + id + '/messages';

        let promise = fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'userId' : id,
                'From' : from,
                'Count' : count
            }
        });

        promise.then(response=>response.json()
            .then(messages=>({messages, response})))
            .then(({messages, response}) => {
                if (response.ok) {
                    this.setState({'privateMessages': messages} );
                } else if (response.status === 400) {
                    console.log('400');
                    localStorage.setItem('error_message','wrong_ids');
                    localStorage.setItem('display_error_message', 'true');
                } else {
                    console.log('Error')
                    localStorage.setItem('error_message', response.statusText);
                    localStorage.setItem('display_error_message', 'true');
                }
            }).catch(error => console.log(error));
    }

    sendPublicMessage(messageText) {
        let model = {
            'content' : messageText
        };

        let url = localStorage.getItem('api') + '/api/conversations/public/messages';

        let promise =  fetch(url, {
            method : 'POST',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify(model)
        });
        promise.then( response =>
            response.json().then(message => ({message, response}))
        ).then(({message, response}) => {
            if (response.ok) {
                this.socket.send(JSON.stringify(message));
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch( e => console.log("Error: ", e));
    }

    sendPrivateMessage(messageText, idx) {
        let model = {
            'content' : messageText
        };

        let url = localStorage.getItem('api') + '/api/conversations/' + idx + '/messages';

        let promise =  fetch(url, {
            method : 'POST',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'userId': idx
            },
            body : JSON.stringify(model)
        });

        promise.then( response =>
            response.json().then(message => ({message, response}))
        ).then(({message, response}) => {
            if (response.ok) {
                this.socket.send(JSON.stringify(message));
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch( e => console.log("Error: ", e));
    }

    sendMessage(messageText) {
        if(this.state.isPublic){
            this.sendPublicMessage(messageText);
        } else {
            this.sendPrivateMessage(messageText, this.state.chat_id);
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    reloadOnTimer() {
        var timeDiff = Date.now() - this.timer;
        timeDiff /= 1000;
        console.log('Diff', timeDiff);
        if (timeDiff > 2) {
            this.updateAll();
            this.timer = Date.now();
        }
    }

    updateChatCallBack(newId, isPublic) {
        if (!isPublic) {
            this.addUser(newId);
            this.addConversation(newId);
        }
        this.setState({chat_id:newId, isPublic:isPublic, isInFindMode:false})
        this.updateAll();
    }

    findAndAddUser(userName) {
        this.setState({isInFindMode: true});
        this.foundUsers.clear();

        let url = localStorage.getItem('api') + '/api/users?query=' + userName;

        let promise =  fetch(url, {
            method : 'GET',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        });
        console.log(promise);
        promise.then( response =>
            response.json().then(users => ({users, response}))
        ).then(({users, response}) => {
            console.log(users);
            if (response.ok) {
                users.forEach(user => {
                    this.addUserWithName(user.id, user.name);
                    this.foundUsers.add(user.id);
                })
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch( e => console.log("Error: ", e));
    }

    render() {
        this.reloadOnTimer();

        let messages = this.state.isPublic ? this.state.publicMessages : this.state.privateMessages;
        let userList = this.state.isInFindMode ? this.foundUsers : this.conversation;
        let title = this.state.isInFindMode ? "Found Users" : "Conversation list";
        return (
            <div>
                <div className="Main-info">
                    <UserInfo />
                </div>
                <div className="Main">
                    <div className="Main-user-list">
                        <UserList knownUserMap={this.knownUserMap}
                                  userIds={userList}
                                  updateChat={this.updateChatCallBack.bind(this)}
                                  findUser={this.findAndAddUser.bind(this)}
                                  title={title}
                        />
                    </div>
                    <div className="Main-chat">
                        <Chat knownUserMap={this.knownUserMap}
                              messages={messages}
                              sendMessage={this.sendMessage.bind(this)}
                              updateChat={this.updateChatCallBack.bind(this)}
                              private = {!this.state.isPublic}
                        />
                    </div>
                </div>
            </div>
        );
    }
}