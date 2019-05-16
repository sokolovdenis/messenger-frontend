import React from 'react';
import API from './Api';
import AuthService from './AuthService';
import ChannelList from './ChannelList';
import './Chat.css';
import FindList from './FindList';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

export default class Chat extends AuthService {
    constructor(props) {
        super(props)
        this.state = {
            search : "", // Состояние строки поиска пользователя.
            foundUsers : [], // Найденные по текущему запросу пользователи.
            channels : [], // public + возможно еще какие-то участники.
            activeChannel : "public", // Открытый чат.
            messages : [], // Список сообщений в активном чате.
            message : "", // Набираемое сообщение.
            userIdToName : {} // Id пользователя к отображемому имени.
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.getMe = this.getMe.bind(this);
        this.getActiveChannel = this.getActiveChannel.bind(this);
        this.setActiveChannel = this.setActiveChannel.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.findUsers = this.findUsers.bind(this);
        this.getFoundUsers = this.getFoundUsers.bind(this);
        this.addContact = this.addContact.bind(this);
        this.leftPane = this.leftPane.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.getNameFromId = this.getNameFromId.bind(this);
    }

    componentWillMount() {
        if(!super.IsLoggedIn()) {
            this.props.history.replace("/");
        } else {
            super.Fetch(API.get_conversations)
            .then(channels => {
                let channelsArray = this.state.channels;
                let updatedChatIdToName = this.state.chatIdToName;
                for(let i = 0; i < channels.length; i++) {
                    channelsArray.push(channels[i].participant ? channels[i].participant : "public");
                    if(channels[i].participant && !(channels[i].participant in this.state.userIdToName)) {
                        super.Fetch(API.get_users + `/${channels[i].participant}`)
                        .then( user => {
                            let updatedUserIdToName = this.state.userIdToName;
                            updatedUserIdToName[user.id] = user.name;
                            this.setState({userIdToName : updatedUserIdToName});
                        })
                        .catch(err => {
                            alert(err);
                        })
                    }
                }
                
                this.setState({channels : channelsArray, chatIdToName : updatedChatIdToName})
            })
            .catch(err => {
                alert(err);
            })

            this.setActiveChannel(this.state.activeChannel);

            super.Fetch(API.get_me)
            .then( me => {
                this.setState({me : me})
            })
            .catch(err=> {
                alert(err);
            })
        }
    }

    setActiveChannel(id) {
        super.Fetch(API.get_conversations + `/${id}/messages`)
        .then(messages => {
            let users = new Set();
            for(let i = 0; i < messages.length; i++) {
                users.add(messages[i].user);
            }
            for(let user of users) {
                if(!(user in this.state.userIdToName)) {
                    super.Fetch(API.get_users + `/${user}`)
                    .then( user => {
                        let updatedIdToName = this.state.userIdToName;
                        updatedIdToName[user.id] = user.name;
                        this.setState({userIdToName : updatedIdToName});
                    })
                    .catch(err => {
                        alert(err);
                    })
                }
            }
            this.setState({activeChannel : id, messages : messages});

        })
        .catch(err => {
            alert(err);
        })
    }

    getMe() {
        return this.state.me;
    }
    getActiveChannel() {
        return this.state.activeChannel;
    }
    getChannels() {
        return this.state.channels;
    }
    onLogout = (_) => {
        super.Logout();
    }
    findUsers(query) {
        super.Fetch(API.get_users + `?query=${query}`)
        .then( users => {
            let usersArray = []
            for(let i = 0; i < users.length; i++) {
                let userId = users[i].id;
                // Не выдаем в поисковой выдаче себя и уже добавленные контакты.
                if(userId !== this.state.me.id && this.state.channels.indexOf(userId) === -1) {
                    usersArray.push(users[i]);
                }
            }
            this.setState({foundUsers : usersArray});
        })
        .catch(err => {
            alert(err);
        })
    }
    getFoundUsers() {
        return this.state.foundUsers;
    }
    addContact(user) {
        let updatedChannels = this.state.channels;
        updatedChannels.push(user.id);
        let updatedIdToName = this.state.userIdToName;
        updatedIdToName[user.id] = user.name;
        this.setState({
            channels : updatedChannels,
            userIdToName : updatedIdToName,
            search : ""});
        this.setActiveChannel(user.id);
    }

    leftPane() {
        if(this.state.search.length > 0) {
            return <FindList
            getFoundUsers = {this.getFoundUsers}
            addContact = {this.addContact}
            />
        } else {
            return <ChannelList
            getChatNameFromId = {this.getNameFromId}
            getActiveChannel = {this.getActiveChannel}
            setActiveChannel = {this.setActiveChannel}
            getChannels = {this.getChannels}
            />
        }
    }

    handleFindChange = (event) => {
        event.preventDefault()
        const { value, name } = event.target;
        this.setState({[name]: value});
        if(value) {
            this.findUsers(value);
        }
    }

    handleMessageChange = (event) => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }

    getMessage() { 
        return this.state.message;
    }

    sendMessage = (event) => {
        event.preventDefault();
        super.Fetch(
            API.get_conversations +
            `/${this.state.activeChannel}/messages`,
            {method : "post", body: JSON.stringify({content: this.state.message})}
         )
        .catch(err=>{
            alert(err);
        })
        this.setState({message : ""})
    }

    getMessages() {
        return this.state.messages.sort();
    }

    getNameFromId(id) {
        return id === "public" ? "public" : (id in this.state.userIdToName ? this.state.userIdToName[id] : "Unknown");
    }

    render() {
        return (
            <div className="chat">
                <div className="find-form-div">
                    <input
                        className="find-form-input"
                        type="text"
                        name="search"
                        value={this.state.search}
                        placeholder="Поиск пользователя"
                        onChange={this.handleFindChange}
                    /> 
                </div>
                <div className="channel-list-div">
                {
                    this.leftPane()
                }
                </div>
                <div className="signout-div">
                    <button className="signout-button" onClick={this.onLogout}>Выход</button>
                </div>
                <div className="messages-div">
                    <MessageList
                    getMe={this.getMe}
                    getMessages={this.getMessages}
                    getUserNameFromId={this.getNameFromId}
                    />
                </div>
                <div className="output-message-div">
                    <SendMessageForm
                    handleMessageChange={this.handleMessageChange}
                    getMessage={this.getMessage}
                    sendMessage={this.sendMessage}
                    />
                </div>
            </div>
        );
    }
}
