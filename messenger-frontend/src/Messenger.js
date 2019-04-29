import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let greetings = this.props.messenger.state.me !== undefined ? `Hello, ${this.props.messenger.state.me.name}` : '';
        return (
            <header>
                <div className="logo">Messenger</div>
                <h1> {greetings} </h1>
                <div className="main-menu">
                    <button className="side-menu-elem" onClick={this.props.app.logout}> Logout</button>
                </div>
            </header>
        );
    }
}

class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillUpdate() {
        const node = this.el;
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate() {
        this.props.messenger.loadMessages();
        if (this.shouldScrollBottom) {
            this.el.scrollTop = this.el.scrollHeight;
        }
    }

    setCurrentUser(userId) {
        this.props.messenger.setState({
            currentUser: userId
        });
    }

    render() {
        return (
            <>
                <div className="messages" id="messages" ref={el => {
                    this.el = el;
                }}>
                    {this.props.messagesList ? (
                        <>
                            {this.props.messagesList.map((message, i) => (
                                <div className="message" key={"message__" + i}>
                                    <div className="message-username" key={"message-username__" + message.uniqueId}
                                         onClick={this.setCurrentUser.bind(this, message.user)}>
                                        <button
                                            className="link-button">{this.props.messenger.state.users == null ? message.id : this.props.messenger.state.users[message.user]} </button>
                                    </div>
                                    <div className="message-text" key={"message-text__" + message.uniqueId}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (<p>No messages.</p>)}
                </div>
            </>
        );
    }
}

class MessageSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;

        this.setState({
            [name]: event.target.value
        });
    }

    async handlePost(event) {
        //console.log(this.state);
        if (this.props.currentUser === null) {
            var url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages';
        } else {
            var url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.props.currentUser}/messages`;
        }
        event.preventDefault();
        console.log("post to " + url);
        await axios({
            method: 'post',
            url: url,
            data: {
                content: this.state.content
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                //this.props.messagesList.push({content: this.state.content, user: this.props.messenger.me});
                this.setState({content: ''});
            } else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <form id="inputMessage" onSubmit={this.handleSignUp}>
                <input type="text" id="content" value={this.state.content} onChange={this.handleChange}/>
                <button onClick={this.handlePost} value="post">Send</button>
            </form>
        );
    }
}

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentUser: undefined, messagesList: null};
        this.props.messenger.loadMessages = this.loadMessagesData.bind(this);

        this.socket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${localStorage.getItem('token')}`);

        this.socket.onmessage = (event) => {
            var incomingMessage = JSON.parse(event.data);
            incomingMessage = {user: incomingMessage.User, content: incomingMessage.Content};
            console.log(incomingMessage);
            this.props.messenger.loadUserData([incomingMessage.user]);
            if (this.props.currentUser === incomingMessage.user || this.props.messenger.state.me.id === incomingMessage.user) {
                var oldMessages = this.state.messagesList;
                oldMessages.push(incomingMessage);
                this.setState({messagesList: oldMessages});
            }
        };
    }

    componentDidMount() {
        this.props.messenger.loadMessages();
    }

    loadMessagesData() {
        if (this.state.currentUser === this.props.currentUser) {
            return;
        } else {
            this.setState({currentUser: this.props.currentUser});
        }
        if (this.props.currentUser === null) {
            var url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages';
        } else {
            var url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.props.currentUser}/messages`;
        }
        axios({
            method: 'get',
            url: url,
            data: {
                from: 0,
                count: 1000
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({messagesList: response.data});

            // userId всех юзеров из текущей беседы (без повторений)
            var userIds = Array.from(new Set(this.state.messagesList.map(message => message.user)));
            this.props.messenger.loadUserData(userIds);
        }).catch(function (error) {
            console.log(error);
        });
    }



    render() {
        return (
            <main>
                <MessagesList messenger={this.props.messenger} currentUser={this.props.currentUser}
                              messagesList={this.state.messagesList}/>
                <MessageSubmit messenger={this.props.messenger} currentUser={this.props.currentUser}
                               messagesList={this.state.messagesList}/>
            </main>
        );
    }
}

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.props.setCurrentConversation;
    }

    render() {
        var className = this.props.active ? "active side-menu-elem" : "side-menu-elem";
        // console.log(this.props.conversation.participant);
        // console.log(this.props.users[this.props.conversation.participant]);

        return (
            <button className={className}
                    onClick={this.onClickHandler}>
                {this.props.conversation.participant == null ? "Public" :
                    this.props.users === null ?
                        this.props.conversation.participant
                        : this.props.users[this.props.conversation.participant]}
            </button>
        );
    }
}

class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: null, query: "", foundUsers: null, displayConversations: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFind = this.handleFind.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;

        this.setState({
            [name]: event.target.value
        });
    }

    async handleFind(event) {
        console.log('query ' + this.state.query);
        console.log(localStorage.getItem('token'));
        var url = `http://messenger.westeurope.cloudapp.azure.com/api/users`;
        event.preventDefault();
        axios({
            method: 'get',
            url: url,
            params: {
                query: this.state.query
            },
            headers: {
                responseType: 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                // console.log(response);
                this.setState({foundUsers: response.data});
                var newUsers = this.props.messenger.state.users;
                for (var i in response.data) {
                    var user = response.data[i];
                    newUsers[user.id] = user.name;
                }
                this.props.messenger.setState({users: newUsers});
            } else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({displayConversations: false});
    }

    handleCancel() {
        this.setState({foundUsers: null});
        this.setState({displayConversations: true});
    }

    setCurrentConversation(conversation) {
        this.props.messenger.setState({currentUser: conversation.participant});
    }

    componentDidMount() {
        this.loadConversationsData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.messenger.loadMessages();
    }

    setCurrentUser(userId) {
        this.props.messenger.setState({
            currentUser: userId
        });
    }

    async loadConversationsData() {
        await axios({
            method: 'get',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/conversations',
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({conversations: response.data});
                this.props.messenger.loadUserData(response.data.map((conversation, i) => (conversation.participant)));
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    render() {
        return (
            <nav className="side-menu">
                <form id="inputUserQuery">
                    <input type="text" id="query" value={this.state.query} onChange={this.handleChange}/>
                    <button onClick={this.handleFind}>Find</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </form>
                {
                    this.state.displayConversations ? (
                        this.state.conversations ? (
                            <>
                                {this.state.conversations.map((conversation, i) => (
                                    <Conversation conversation={conversation}
                                                  setCurrentConversation={this.setCurrentConversation.bind(this, conversation)}
                                                  active={conversation.participant === this.props.messenger.state.currentUser}
                                                  key={"conversation__" + conversation.id}
                                                  messenger={this.props.messenger}
                                                  users={this.props.messenger.state.users}/>
                                ))}
                            </>
                        ) : (<p>No conversations</p>)
                    ) : (
                        this.state.foundUsers ? (
                            <>
                                {this.state.foundUsers.map((user, i) => (
                                    <div className="message-username" key={"found-username__" + user.uniqueId}
                                         onClick={this.setCurrentUser.bind(this, user.id)}>
                                        <button className="link-button">
                                            {this.props.messenger.state.users == null ? user.id : this.props.messenger.state.users[user.id]}
                                        </button>
                                    </div>
                                ))}
                            </>
                        ) : (<p>No users found</p>)
                    )
                }
            </nav>
        );
    }
}

class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {currentUser: null, users: {}, me: undefined};
        this.loadMessages = null;
    }

    loadUserData(userIds) {
        var users = this.state.users;
        for (var i in userIds) {
            const user = userIds[i];
            if (!(user in users) && (user !== null)) {
                axios({
                    method: 'get',
                    url: 'http://messenger.westeurope.cloudapp.azure.com/api/users/' + user,
                    data: {},
                    headers: {
                        responseType: 'json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        users[user] = response.data.name;
                        this.setState({users: users});
                    } else {
                        console.log(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/users/me',
            data: {},
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({me: response.data});
            } else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Header app={this.props.app} messenger={this}/>
                <div className="container">
                    <ConversationList app={this.props.app} messenger={this} users={this.users}/>
                    <Messages app={this.props.app} messenger={this} currentUser={this.state.currentUser}/>
                    <aside>aside</aside>
                </div>
                <footer> footer</footer>
            </div>
        );
    }
}

export default Messenger;
