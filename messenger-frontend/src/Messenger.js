import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as axios from "axios";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let greetings = this.props.messenger.state.me !== undefined? `Hello, ${this.props.messenger.state.me.name}`: '';
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
        axios({
            method: 'get',
            url: `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${userId}/messages`,
            data: {
                from: 0,
                count: 1
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            if (response.data.length > 0) {
                this.props.messenger.setState({
                    currentConversation: response.data[0].conversationId,
                    currentUser: userId
                });
            } else {
                this.props.messenger.setState({
                    currentConversation: null,
                    currentUser: userId
                });
            }
        }).catch(function (error) {
            console.log(error);
        });

        // for (var i = 0; i<conversations.length; ++i) {
        //     if (conversations[i].participant === userId) {
        //         this.props.messenger.setState({currentUser: userId, currentConversation: conversations[i].id});
        //         return;
        //     }
        // }
        // this.props.messenger.setState({currentUser: userId, currentConversation: null});
    }

    render() {
        return (
            <>
                <div className="messages" id="messages" ref={el => {this.el = el;}}>
                    {this.props.messagesList ? (
                        <>
                            {this.props.messagesList.map((message, i) => (
                                <div className="message" key={"message__" + i}>
                                    <div className="message-username" key={"message-username__" + message.uniqueId}
                                         onClick={this.setCurrentUser.bind(this, message.user)}>
                                        <button className="link-button">{this.props.messenger.state.users == null ? message.id : this.props.messenger.state.users[message.user]} </button>
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
        console.log("post to "+url);
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
                this.props.messagesList.push({content: this.state.content, user: this.props.messenger.me});
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
    }

    componentDidMount() {
        this.props.messenger.loadMessages();
    }

    loadMessagesData() {
        if (this.state.currentUser === this.props.currentUser) {
            return;
        } else {
            this.setState({currentUser : this.props.currentUser});
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
            this.loadUserData(userIds);
        }).catch(function (error) {
            console.log(error);
        });
    }

    loadUserData(userIds) {
        var users = this.props.messenger.state.users;
        for (var i in userIds) {
            const user = userIds[i];
            if (!( user in users)) {
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
                        this.props.messenger.setState({users: users});
                    } else {
                        console.log(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }

    render() {
        return (
            <main>
                <MessagesList messenger={this.props.messenger} currentUser={this.props.currentUser} messagesList={this.state.messagesList}/>
                <MessageSubmit messenger={this.props.messenger} currentUser={this.props.currentUser} messagesList={this.state.messagesList}/>
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
        console.log(this.props.conversation.participant);
        console.log(this.props.users);

        return (
            <button className={className}
               onClick={this.onClickHandler}>
                {this.props.conversation.participant == null ? "Public" :
                    this.props.messenger.state.users === null? this.props.conversation.participant:this.props.messenger.state.users[this.props.conversation.participant]}
            </button>
        );
    }
}

class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: null};
    }

    setCurrentConversation(conversation) {
        this.props.messenger.setState({currentConversation: conversation.id, currentUser: conversation.participant});
    }

    componentDidMount() {
        this.loadConversationsData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.messenger.loadMessages();
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
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <nav className="side-menu">
                menu
                {this.state.conversations ? (
                    <>
                        {this.state.conversations.map((conversation, i) => (
                            <Conversation conversation={conversation}
                                          setCurrentConversation={this.setCurrentConversation.bind(this, conversation)}
                                          active={conversation.id === this.props.messenger.state.currentConversation}
                                          key={"conversation__" + conversation.id}
                                          messenger={this.props.messenger}
                                          users={this.props.messenger.state.users}/>
                        ))}
                    </>
                ) : (<p>No conversations.</p>)}
            </nav>
        );
    }
}

class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {currentConversation: "public", currentUser: null, users:{}, me:undefined};
        this.loadMessages = null;

        this.socket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${this.props.token}`);

        this.socket.onmessage = function(event) {
            var incomingMessage = event.data;
            //showMessage(incomingMessage);
            console.log(incomingMessage);
        };
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
        }).then( (response) => {
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
                    <ConversationList app={this.props.app} messenger={this}/>
                    <Messages app={this.props.app} messenger={this} currentUser={this.state.currentUser}/>
                    <aside>aside</aside>
                </div>
                <footer> footer</footer>
            </div>
        );
    }
}

export default Messenger;
