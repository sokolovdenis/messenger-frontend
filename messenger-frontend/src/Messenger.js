import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="logo">My Wonderful Messenger</div>
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
        this.state = {messages: null, users: null};
    }

    componentDidMount() {
        this.loadData();
        this.scrollToBottom();
        // const node = ReactDOM.findDOMNode(this);
        // node.scrollTop = node.scrollHeight;
    }

    loadData() {
        if (this.props.messenger.state.currentConversation === "public") {
            var url = 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages';
        } else {
            var url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/{this.props.messenger.state.currentConversation}/messages`;
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
            console.log(response);
            this.setState({'messages': response.data});

            var keys = Array.from(new Set(this.state.messages.map(message => message.user)));
            this.setState({keys: keys});
            this.loadUserInfo(keys);
        }).catch(function (error) {
            console.log(error);
        });
    }

    loadUserInfo(keys) {
        var users = {};
        for (var i in keys) {
            const user = keys[i];
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
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        this.setState({users: users});
    }

    // componentWillUpdate: function() {
    //     const node = this.getDOMNode();
    //     this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    // },
    //
    // componentDidUpdate(prevProps) {
    //     if (this.shouldScrollBottom) {
    //         const node = ReactDOM.findDOMNode(this);
    //         node.scrollTop = node.scrollHeight;
    //     }
    // }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({behavior: 'smooth'});
    }

    setCurrentUser(userId) {
        axios({
            method: 'get',
            url: `http://messenger.westeurope.cloudapp.azure.com/api/conversations/{userId}/messages`,
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
            this.props.messenger.setState({currentConversation: response.data.conversationId});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className="messages" id="messages">
                    {this.state.messages ? (
                        <>
                            {this.state.messages.map((message, i) => (
                                <div className="message" key={"message__" + i}>
                                    <div className="message-username" key={"message-username__" + message.uniqueId}
                                         onClick={this.setCurrentUser.bind(this, message.user)}>
                                        <a href="#" >{this.state.users == null ? message.id : this.state.users[message.user]} </a>
                                    </div>
                                    <div className="message-text" key={"message-text__" + message.uniqueId}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (<p>No messages.</p>)}
                </div>
                <div ref={el => {
                    this.el = el;
                }}>
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
        console.log(this.state);
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages',
            data: {
                content: this.state.content
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(function (response) {
                console.log("Message sent successfully");
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
        // this.setState({name: '', descr: '', formFields: []});
        // await this.props.main.loadTasks();
        // this.props.main.forceUpdate();

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

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <MessagesList messenger={this.props.messenger}/>
                <MessageSubmit messenger={this.props.messenger}/>
            </main>
        );
    }
}

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.props.setCurrentConversation;
        console.log("Conv" + this.props.conversation.id);
    }

    render() {
        var className = this.props.active ? "active side-menu-elem" : "side-menu-elem";
        console.log("active" + className);
        return (
            <a className={className} href="#"
               onClick={this.onClickHandler}>
                {this.props.conversation.participant == null ? "Public" : this.props.conversation.participant}
            </a>
        );

    }
}

class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: null};
    }

    setCurrentConversation(id) {
        console.log("Set" + id);
        this.props.messenger.setState({currentConversation: id});
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
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
                                          setCurrentConversation={this.setCurrentConversation.bind(this, conversation.id)}
                                          active={conversation.id === this.props.messenger.state.currentConversation}
                                          key={"conversation__" + this.props.uniqueId}/>
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
        this.state = {currentConversation: "public"};
    }

    updateAfterLogin() {
        this.state.conversations.loadData();
    }

    render() {
        return (
            <div>
                <Header app={this.props.app}/>
                <div className="container">
                    <ConversationList app={this.props.app} messenger={this}/>
                    <Main app={this.props.app} messenger={this}/>
                    <aside>aside</aside>
                </div>
                <footer> footer</footer>
            </div>
        );
    }
}

export default Messenger;
