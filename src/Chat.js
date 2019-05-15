import React from 'react';
import './Chat.css';
import API from './Api';
import AuthService from './AuthService';
import ChannelList from './ChannelList';
import FindList from './FindList';
import SendMessageForm from './SendMessageForm';

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name ? name : this.id;
    }
}

export default class Chat extends AuthService {
    constructor(props) {
        super(props)
        this.state = {
            search : "",
            foundUsers : [],
            channels : [],
            added_channels : [],
            activeChannel : new User("public", "public"),
            messages : [],
            message : ""
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.getActiveChannel = this.getActiveChannel.bind(this);
        this.setActiveChannel = this.setActiveChannel.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.findUsers = this.findUsers.bind(this);
        this.getFoundUsers = this.getFoundUsers.bind(this);
        this.addContact = this.addContact.bind(this);
        this.leftPane = this.leftPane.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    componentWillMount() {
        if(!super.IsLoggedIn()) {
            this.props.history.replace("/");
        } else {
            super.Fetch(API.get_conversations)
            .then(channels => {
                let channelsArray = []
                for(let i = 0; i < channels.length; i++) {
                    channelsArray.push(new User(channels[i].id), channels[i].name);
                }
                this.setState({channels : channelsArray})
            })
            .catch(err => {
                alert(err);
            })
        }
    }
    getActiveChannel() {
        return this.state.activeChannel;
    }
    setActiveChannel(channel) {
        this.setState({activeChannel : channel});
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
                usersArray.push(users[i]);
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
        let newChannels = this.state.channels;
        newChannels.push(user);
        this.setState({channels : newChannels, activeChannel : user, search : ""});
    }

    leftPane() {
        if(this.state.search.length > 0) {
            return <FindList getFoundUsers = {this.getFoundUsers} addContact = {this.addContact}/>
        } else {
            return <ChannelList getActiveChannel = {this.getActiveChannel} setActiveChannel = {this.setActiveChannel} getChannels = {this.getChannels}/>
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
        super.Fetch(API.get_conversations + `/${this.state.activeChannel.id}/messages`, {content : this.state.message})
        .catch(err=>{
            alert(err);
        })
        event["value"] = "";
        this.setState({message : ""})
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
                </div>
                <div className="output-message-div">
                    <SendMessageForm handleMessageChange={this.handleMessageChange} getMessage={this.getMessage} sendMessage={this.sendMessage}/>
                </div>
            </div>
        );
    }
}
