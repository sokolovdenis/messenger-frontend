import React from 'react';
import './index.css';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import {Url, TokenName} from '../common/index.jsx'


export const RenderUser = ({name, id, onClickFunc}) =>
    (<div className={"search-result-user"} onClick={() => onClickFunc(name, id)}>
        <div>Name: {name}</div>
        <div>Id: {id}</div>
    </div>)
;

export const RenderConversationList = ({userName, lastMessage, userId, convId, onClickFunc}) =>
    (<div className={"chat-preview-conversation"} onClick={() => onClickFunc(userName, userId, convId)}>
        <div>{userName}</div>
        <div>{lastMessage}</div>
    </div>)
;

export const RenderMessage = ({content, isMe}) => {
    if (isMe) {
        return (<div className={"chat-conversation-body-message-my"}>
            <div>{content}</div>
        </div>);
    } else {
        return (<div className={"chat-conversation-body-message"}>
            <div>{content}</div>
        </div>);
    }
};

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem(TokenName),
            my_name: "",
            my_id: "",
            //search part
            search_result: [],
            search_name: "",
            invalid_search_name: false,
            //conversation part
            conversations: [],
            flag_in_conv: false,
            content: "",
            current_conv: {
                name: "",
                user_id: "",
                conv_id: "",
                messages: [],
            },
            id2user: {},
        };

        this.ws = new WebSocket(
            'ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=' + this.state.token
        );
        this.ws.onmessage = (e) => {
            //console.log("ws: begin");
            let msgs = e.data;
            console.log("ws: msgs: " + msgs);
            if (this.state.flag_in_conv) {
                let cur = this.state.current_conv;
                let cur_msgs = cur.messages;
                if (msgs.ConversationId === cur.conv_id) {
                    let new_msg = {
                        conversationId: msgs.ConversationId,
                        timestamp: msgs.Timestamp,
                        user: msgs.User,
                        content: msgs.Content,
                        id: msgs.Id,
                    };
                    cur_msgs.push(new_msg);
                }
                cur.messages = cur_msgs;
                this.setState({
                    current_conv: cur,
                });
            } else {
                let convs = this.state.conversations;
                for (var i = 0; i < convs.length; i++) {
                    if (convs[i].id === msgs.ConversationId) {
                        let new_msg = {
                            conversationId: msgs.ConversationId,
                            timestamp: msgs.Timestamp,
                            user: msgs.User,
                            content: msgs.Content,
                            id: msgs.Id,
                        };
                        convs[i].lastMessage = new_msg;
                        break;
                    }
                }
                this.setState({
                    conversations: convs,
                });
            }
        };

        this.onClickMe = this.onClickMe.bind(this);
        this.onClickFind = this.onClickFind.bind(this);
        this.onClickConv = this.onClickConv.bind(this);
        this.onClickUser = this.onClickUser.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.onClickSend = this.onClickSend.bind(this);
        this.getConversations = this.getConversations.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getPublicMessages = this.getPublicMessages.bind(this);
        this.getPrivateMessages = this.getPrivateMessages.bind(this);
        this.postPublicMessage = this.postPublicMessage.bind(this);
        this.postPrivateMessage = this.postPrivateMessage.bind(this);
    }

    getUserById(id) {
        console.log("getUserById");
        return fetch(Url + '/api/users/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                this.props.history.push('/');
            } else if (res.status === 404) {
                let id2user = this.state.id2user;
                id2user[id] = "Unknown_user";
                this.setState({
                    id2user: id2user,
                });
                return "Unknown";
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    getName(id) {
        this.getUserById(id).then(body => {
            let id2user = this.state.id2user;
            id2user[body.id] = body.name;
            this.setState({
                id2user: id2user,
            });
        });
    }

    getConversations() {
        console.log("getConversations");
        fetch(Url + '/api/conversations', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(body => {
                    for (var i = 0; i < body.length; i++) {
                        if (body[i].participant !== null && !this.state.id2user[body[i].participant]) {
                            this.getName(body[i].participant);
                        }
                    }
                    this.setState({conversations: body});
                    console.log(body);
                    console.log(this.state.id2user);
                });
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        });
    }

    getMe() {
        return fetch(Url + '/api/users/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    componentDidMount() {
        this.getConversations();
        this.getMe().then(body => {
            this.setState({
                my_name: body.name,
                my_id: body.id,
            });
        })
    }

    getPublicMessages() {
        console.log("getPublicMessages");
        fetch(Url + '/api/conversations/public/messages?From=0&Count=1000', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                return res.json().then(body => {
                    let cur = this.state.current_conv;
                    cur.messages = body;
                    this.setState({current_conv: cur});
                });
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    postPublicMessage() {
        console.log("postPublicMessage");
        let data = {
            content: this.state.content,
        };
        fetch(Url + '/api/conversations/public/messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 200) {
                return res.json().then(body => {
                    let cur = this.state.current_conv;
                    let msgs = cur.messages;
                    msgs.push(body);
                    cur.messages = msgs;
                    this.setState({
                        current_conv: cur,
                    });
                });
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    getPrivateMessages() {
        console.log("getPrivateMessages");
        fetch(Url + '/api/conversations/' +
                            this.state.current_conv.user_id +
                            '/messages?From=0&Count=1000', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                return res.json().then(body => {
                    let cur = this.state.current_conv;
                    cur.messages = body;
                    this.setState({current_conv: cur});
                });
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    postPrivateMessage() {
        console.log("postPrivateMessage");
        let data = {
            content: this.state.content,
        };
        fetch(Url + '/api/conversations/' +
            this.state.current_conv.user_id +
            '/messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 200) {
                return res.json().then(body => {
                    let cur = this.state.current_conv;
                    let msgs = cur.messages;
                    msgs.push(body);
                    cur.messages = msgs;
                    this.setState({
                        current_conv: cur,
                    });
                });
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        });
    }

    onClickMe() {
        this.getMe().then(body => {
            this.setState({
                search_result: [{
                    name: body.name,
                    id: body.id,
                }]
            });
        });
    }

    onClickFind() {
        fetch(Url + '/api/users?query=' + this.state.search_name, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token,
            },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(body => {
                    this.setState({search_result: body});
                });
            } else if (res.status === 400) {
                this.setState({invalid_search_name: true});
            } else if (res.status === 401) {
                this.props.history.push('/');
            }
        }).catch(e => {
            console.log("Error:", e);
        })
    }

    onClickConv(userName, userId, convId) {
        /*
        console.log("userName : " + userName);
        console.log("userId : " + userId);
        console.log("convId : " + convId);
        */
        let cur = this.state.current_conv;
        cur.name = userName;
        cur.user_id = userId;
        cur.conv_id = convId;
        cur.messages = [];
        this.setState({
            flag_in_conv: true,
            current_conv: cur,
        });
        //console.log(this.state.current_conv);
        if (convId === "public") {
            this.getPublicMessages();
        } else {
            this.getPrivateMessages();
        }
    }

    onClickUser(name, id) {
        let cur = this.state.current_conv;
        cur.name = name;
        cur.user_id = id;
        cur.conv_id = "";
        cur.messages = [];
        this.setState({
            flag_in_conv: true,
            current_conv: cur,
        });
        this.getPrivateMessages();
    }

    onClickBack() {
        this.getConversations();
        let cur = this.state.current_conv;
        cur.name = "";
        cur.user_id = "";
        cur.conv_id = "";
        cur.messages = [];
        this.setState({
            flag_in_conv: false,
            current_conv: cur,
        });
    }

    onClickSend() {
        if (this.state.current_conv.conv_id === "public") {
            //console.log("Here we go");
            this.postPublicMessage();
        } else {
            //console.log("Should not be there");
            this.postPrivateMessage();
        }
    }

    render() {
        return (
            <div className={"background"}>
                <div className={"window"}>
                    <div className={"search"}>
                        <div className={"search-head"}>
                            <button className={"search-head-self-btn"} onClick={this.onClickMe}>
                                Me
                            </button>
                            <input className={"search-head-find-input"} onChange={e => this.setState({
                                search_name: e.target.value,
                                invalid_search_name: false,
                            })}/>
                            <button className={"search-head-find-btn"} onClick={this.onClickFind}>
                                S
                            </button>
                        </div>
                        <div className={"search-result"}>
                            <div>
                                {
                                    this.state.search_result.map((user, key) => <RenderUser name={user.name}
                                                                                            id={user.id}
                                                                                            onClickFunc={this.onClickUser}
                                                                                            key={key}/>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"chat"}>
                        {this.state.flag_in_conv?
                            <div className={"chat-conversation"}>
                                <div className={"chat-conversation-header"}>
                                    <div className={"chat-conversation-header-name"}>
                                        {this.state.current_conv.name}
                                    </div>
                                    <button className={"chat-conversation-header-back-btn"} onClick={this.onClickBack}>
                                        Back
                                    </button>
                                </div>
                                <div className={"chat-conversation-body"}>
                                    <div style={{width: "100%", maxWidth: "100%"}}>
                                    {
                                        this.state.current_conv.messages.map((msg, key) => {
                                            /*
                                            if (!this.state.id2user[msg.user]) {
                                                this.getName(msg.user);
                                            }

                                             */
                                            return (<RenderMessage
                                                content={msg.content}
                                                isMe={msg.user === this.state.my_id}
                                                //name={this.state.id2user[msg.user]}
                                                key={key}
                                            />);
                                        })
                                    }
                                    </div>
                                </div>
                                <div className={"chat-conversation-message"}>
                                    <input className={"chat-conversation-message-input"} onChange={e => this.setState({
                                        content: e.target.value,
                                    })}>

                                    </input>
                                    <button className={"chat-conversation-message-send-btn"} onClick={this.onClickSend}>
                                        Send
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                {
                                    this.state.conversations.sort((a, b) =>
                                        a.lastMessage.timestamp < b.lastMessage.timestamp)
                                        .map((conv, key) => {
                                            return (<RenderConversationList
                                                userName={conv.id === "public" ?
                                                    "Public chat" :
                                                    this.state.id2user[conv.participant]
                                                }
                                                lastMessage={conv.lastMessage.content}
                                                userId={conv.participant}
                                                convId={conv.lastMessage.conversationId}
                                                onClickFunc={this.onClickConv}

                                                key={key}
                                            />)
                                        })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}