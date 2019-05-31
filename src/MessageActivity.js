import React from 'react';
import ReactDOM from 'react-dom';

import * as axios from "axios";

var karimPhoto ="https://pp.userapi.com/c831508/v831508051/a9977/PMlfqUSLSLM.jpg"

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="logoHeader">Messenger</div>
                <div className="logout">
                    <button onClick={this.props.app.logout}> Logout</button>
                </div>
            </header>
        );
    }
}

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dialogs: [], currentOponent:""};

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
                this.setState({dialogs: response.data});
                //console.log(this.state.dialogs.map(dialog =>(dialog.participant)));
                let userIds = Array.from(new Set(response.data.map(message => message.participant)));
                //console.log(userIds);
                //this.props.messageController.loadUserData([userIds[2]]);
                this.props.messageController.loadUserData(userIds);
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    componentDidMount() {
        this.loadConversationsData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.messageController.loadMessages(false);
    }

    handleChangeDialog(userId) {
        this.props.messageController.setState({currentUser: userId});
        //"this.props.messageController.users[dialog.participant]"
    }

    render() {
        return (
            <div> {this.state.dialogs ? (
                <>
                    {
                    this.state.dialogs.map((dialog, i) => (
                        <button className="dialogButton"
                            onClick={this.handleChangeDialog.bind(this, dialog.participant)}
                            value={dialog.participant}>{this.props.messageController.state.users == null ? "none" :
                            (dialog.participant ? "User: " + this.props.messageController.state.users[dialog.participant]: "public")}
                            </button>
                    ))}
                </>
            ) : (<p>No conversations</p>)}

            </div>);
    }

}


class MessagePlate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }



    async handleSubmit(event) {
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
                content: this.state.value
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({value: ''});
            } else {
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }


    render() {
        return (
            <div className="writing-message">

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" className="inputText" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" className="submitButton" value="Submit" />
                </form>
            </div>
        );
    }
}

class Logo extends React.Component {
    render() {
        return (
            <div className="logo">
                <img src={this.props.value} className="logoImg" alt="description of image"></img>
            </div>
        );
    }
}

class BlockName extends React.Component {
    render() {
        return (
            <div className="block-name">
                {this.props.value}
            </div>
        );
    }
}

class BlockText extends React.Component {
    render() {
        return (
            <div className="block-text">
                {this.props.value}
            </div>
        );
    }
}

function renderMessageBlock(logo, name, text){
    return (
        <div className="message-block">
            <Logo value={logo}/>
            <BlockName value={name}/>
            <BlockText value={text}/>

        </div>
    );
}

class MessagesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    setCurrentUser(userId) {
        this.props.messageController.setState({
            currentUser: userId
        });
    }


    render() {
        return (
            <>
                <div>
                    {this.props.messagesList !== null ? (
                        <>
                            {this.props.messagesList.map((message, i) => (
                                renderMessageBlock(karimPhoto,
                                    this.props.messageController.state.users == null ? "none" : this.props.messageController.state.users[message.user],
                            message.content)
                            ))}
                        </>
                    ) : (<p>No messages.</p>)}
                </div>
            </>
        );
    }
}

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentUser: undefined, messagesList: [], top: 0};
        this.props.messageController.loadMessages = this.loadMessagesData.bind(this);

        this.socket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${localStorage.getItem('token')}`);

        this.socket.onmessage = (event) => {
            let incomingMessage = JSON.parse(event.data);
            incomingMessage = {user: incomingMessage.User, content: incomingMessage.Content};
            this.props.messageController.loadUserData([incomingMessage.user]);
            if (this.props.currentUser === incomingMessage.user || this.props.messageController.state.me.id === incomingMessage.user)
            {
                let oldMessages = this.state.messagesList;
                oldMessages.push(incomingMessage);
                this.setState({messagesList: oldMessages});
            }
        };
    }

    componentDidMount() {
        this.props.messageController.loadMessages(false);
    }


    loadMessagesData(loadNewMessages) {
        let count = 10;
        let from = undefined;
        if (this.state.currentUser !== this.props.currentUser) {
            this.setState({currentUser: this.props.currentUser, messagesList:[]});
            from = -count;
            console.log(from);
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

            // userId всех юзеров из текущей беседы (без повторений)
            let userIds = Array.from(new Set(response.data.map(message => message.user)));
            //console.log(userIds);
            this.props.messageController.loadUserData(userIds);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <main>
                <MessagesList messageController={this.props.messageController} currentUser={this.props.currentUser}
                              messagesList={this.state.messagesList}/>
            </main>
        );
    }
}
class MessageController extends React.Component {
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
                <Header app={this.props.app}/>
                <div className="bodyLike">
                    <div className="dialog">
                        <Dialogs messageController={this}/>
                    </div>
                    <div className="message-activity">
                        <div className="message-part">

                            <Messages app={this.props.app} messageController={this} currentUser={this.state.currentUser}/>
                            <MessagePlate currentUser={this.state.currentUser}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default MessageController;
