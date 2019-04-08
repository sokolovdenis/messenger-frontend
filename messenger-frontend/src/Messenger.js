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
                    <button className="side-menu-elem" onClick={this.props.app.logout}> Logout </button>
                </div>
            </header>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: null, content: "", users: null};

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;

        this.setState({
            [name]: event.target.value
        });
    }

    componentDidMount() {
        this.loadData();
        // const node = ReactDOM.findDOMNode(this);
        // node.scrollTop = node.scrollHeight;
    }

    loadData() {
        axios({
            method: 'get',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages',
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
            var users = {};
            var keys = Array.from(new Set(this.state.messages.map(message => message.user)));

            for (var i in keys) {
                const user = keys[i];
                axios({
                    method: 'get',
                    url: 'http://messenger.westeurope.cloudapp.azure.com/api/users/' + user,
                    data: {
                        //id: user
                    },
                    headers: {
                        responseType: 'json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        // console.log(response);
                        users[user] = response.data.name;
                        this.setState({users: users});
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            this.setState({users: users});
        }).catch(function (error) {
            console.log(error);
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

    render() {
        console.log(this.state);
        return (
            <main>
                <div className="messages" id="messages">
                    {this.state.messages ? (
                        <>
                            {this.state.messages.map((message, i) => (
                                <div className="message" key={"message__" + i}>
                                    <div className="message-username"
                                         key={"message-username__" + message.uniqueId}>{this.state.users == null ? message.id : this.state.users[message.user]}</div>
                                    <div className="message-text"
                                         key={"message-text__" + message.uniqueId}>{message.content}</div>
                                </div>
                            ))}
                        </>
                    ) : (<p>No messages.</p>)}
                </div>
                <form id="inputMessage" onSubmit={this.handleSignUp}>
                    <input type="text" id="content" value={this.state.content} onChange={this.handleChange}/>
                    <button onClick={this.handlePost} value="post">Send</button>
                </form>
            </main>
        );
    }
}

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: null};
        //this.props.app.state.append("conversations", this)

        //this.loadData = this.loadData.bind(this);
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
                // console.log("conversations");
                // console.log(response);
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
                            <a className="side-menu-elem" href="#" key={"message__" + conversation.uniqueId}>
                                {conversation.participant == null ? "Public" : conversation.participant}
                            </a>
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
        this.state = {conversations: null, currentConversation:null};
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => {
    //             return response.json();
    //         }).then(result => {
    //         this.setState({
    //             users: result
    //         });
    //     });
    // }

    updateAfterLogin() {
        this.state.conversations.loadData()
    }

    render() {
        return (
            <div>
                <Header app={this.props.app}/>
                <div className="container">
                    <SideMenu app={this.props.app}/>
                    <Main app={this.props.app} messenger={this}/>
                    <aside>aside</aside>
                </div>
                <footer> footer</footer>
            </div>
        );
    }
}

export default Messenger;
