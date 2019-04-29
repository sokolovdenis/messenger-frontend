import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let greetings = this.props.me !== undefined ? `Hello, ${this.props.me.name}` : '';
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
        this.listenScrollEvent = this.listenScrollEvent.bind(this);

    }

    listenScrollEvent() {
        const node = this.el;
        if (node.scrollTop === 0) {
            let height = this.el.scrollHeight;
            this.props.messenger.loadMessages(true, () => {
                this.el.scrollTop = this.el.scrollHeight - height;
            });
        }
    }

    componentDidMount() {
        const node = this.el;
        node.addEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUnmount() {
        const node = this.el;
        node.removeEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUpdate() {
        const node = this.el;
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
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
                    {this.props.messagesList !== null ? (
                        <>
                            {this.props.messagesList.map((message, i) => (
                                <div className="message" key={"message__" + i}>
                                    <div className="message-username" key={"message-username__" + message.uniqueId}
                                         onClick={this.setCurrentUser.bind(this, message.user)}>
                                        <button className="link-button">
                                            {this.props.messenger.state.users == null ? message.id : this.props.messenger.state.users[message.user]}
                                        </button>
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
        let url;
        if (this.props.currentUser === null) {
            url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages';
        } else {
            url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.props.currentUser}/messages`;
        }
        event.preventDefault();
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
                <span className="form_span">
                    <input className="form_input" type="text" id="content" value={this.state.content}
                           onChange={this.handleChange}/>
                    <button className="form_button" onClick={this.handlePost} value="post">Send</button>
                </span>
            </form>
        );
    }
}

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentUser: undefined, messagesList: [], top: 0};
        this.props.messenger.loadMessages = this.loadMessagesData.bind(this);

        this.socket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${localStorage.getItem('token')}`);

        this.socket.onmessage = (event) => {
            let incomingMessage = JSON.parse(event.data);
            incomingMessage = {user: incomingMessage.User, content: incomingMessage.Content};
            this.props.messenger.loadUserData([incomingMessage.user]);
            if (this.props.currentUser === incomingMessage.user || this.props.messenger.state.me.id === incomingMessage.user) {
                let oldMessages = this.state.messagesList;
                oldMessages.push(incomingMessage);
                this.setState({messagesList: oldMessages});
            }
        };
    }

    componentDidMount() {
        this.props.messenger.loadMessages(false);
    }

    loadMessagesData(loadNewMessages, callback = null) {
        let count = 10;
        let from = undefined;
        if (this.state.currentUser !== this.props.currentUser) {
            this.setState({currentUser: this.props.currentUser, messagesList:[]});
            from = -count;
        } else {
            if (!loadNewMessages) {
                return;
            }
            from = this.state.top - count;
        }

        this.setState({top: from});

        let url;
        if (this.props.currentUser === null) {
            url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages';
        } else {
            url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.props.currentUser}/messages`;
        }
        axios({
            method: 'get',
            url: url,
            params: {
                From: from,
                Count: count
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({messagesList: response.data.concat(this.state.messagesList)});
            if (callback !== null) {
                callback();
            }
            // userId всех юзеров из текущей беседы (без повторений)
            let userIds = Array.from(new Set(response.data.map(message => message.user)));
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
        let className = this.props.active ? "active side-menu-elem" : "side-menu-elem";
        return (
            <button className={className}
                    onClick={this.onClickHandler}>
                {this.props.participant == null ? "Public" :
                    this.props.users === null ?
                        this.props.participant
                        : this.props.users[this.props.participant]}
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
        let url = `http://messenger.westeurope.cloudapp.azure.com/api/users`;
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
                this.setState({foundUsers: response.data});
                let newUsers = this.props.messenger.state.users;
                for (let i in response.data) {
                    let user = response.data[i];
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

    handleCancel(event) {
        event.preventDefault();
        this.setState({foundUsers: null, displayConversations: true, query: ""});
    }

    setCurrentConversation(conversation) {
        this.props.messenger.setState({currentUser: conversation.participant});
    }

    componentDidMount() {
        this.loadConversationsData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.messenger.loadMessages(false);
    }

    setCurrentUser(userId) {
        let oldConversations = this.state.conversations;
        oldConversations.push({participant: userId});
        this.props.messenger.setState({
            currentUser: userId, conversations: oldConversations
        });
        this.setState({foundUsers: null, displayConversations: true, query: ""});
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
                    <span className="form_span">
                        <input className="form_input" type="text" id="query" value={this.state.query}
                               onChange={this.handleChange}/>
                        <span className="form_span_nowrap">
                            <button onClick={this.handleFind}>Find</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </span>
                    </span>
                </form>
                {
                    this.state.displayConversations ? (
                        this.state.conversations ? (
                            <>
                                {this.state.conversations.map((conversation, i) => (
                                    <Conversation participant={conversation.participant}
                                                  setCurrentConversation={this.setCurrentConversation.bind(this, conversation)}
                                                  active={conversation.participant === this.props.messenger.state.currentUser}
                                                  key={"conversation__" + conversation.participant}
                                                  messenger={this.props.messenger}
                                                  users={this.props.messenger.state.users}/>
                                ))}
                            </>
                        ) : (<p>No conversations</p>)
                    ) : (
                        this.state.foundUsers ? (
                            <>
                                {this.state.foundUsers.map((user, i) => (
                                    <Conversation participant={user.id}
                                                  setCurrentConversation={this.setCurrentUser.bind(this, user.id)}
                                                  active={user.id === this.props.messenger.state.currentUser}
                                                  key={"found_user__" + user.id}
                                                  messenger={this.props.messenger}
                                                  users={this.props.messenger.state.users}/>

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
        let users = this.state.users;
        for (let i in userIds) {
            const user = userIds[i];
            if (!(user in users) && (user !== null)) {
                axios({
                    method: 'get',
                    url: 'http://messenger.westeurope.cloudapp.azure.com/api/users/' + user,
                    headers: {
                        responseType: 'json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    if (response.status === 200) {
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
            <>
                <Header app={this.props.app} me={this.state.me}/>
                <div className="container">
                    <ConversationList app={this.props.app} messenger={this} users={this.users}/>
                    <Messages app={this.props.app} messenger={this} currentUser={this.state.currentUser}/>
                    <aside>
                        <p>Место для Вашей рекламы</p>
                        <p>Place for your ads</p>
                    </aside>
                </div>
                <footer>Messenger, 2019</footer>
            </>
        );
    }
}

export default Messenger;
