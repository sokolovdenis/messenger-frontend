import React from 'react';
import './Chat.css';
import API from './Api';
import AuthService from './AuthService';
import ChannelList from './ChannelList';
import FindList from './FindList';

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
            activeChannel : "public",
            messages : [],

        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getActiveChannel = this.getActiveChannel.bind(this);
        this.setActiveChannel = this.setActiveChannel.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.findUsers = this.findUsers.bind(this);
        this.getFoundUsers = this.getFoundUsers.bind(this);
        this.addContact = this.addContact.bind(this);
        this.leftPane = this.leftPane.bind(this);
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
                console.log( channels )
            })
            .catch(err => {
                alert(err);
            })
        }
        console.log(this.state.channels);
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
        let activeChannel = user.name;
        this.setState({channels : newChannels, activeChannel : activeChannel, search : ""});
    }

    leftPane() {
        if(this.state.search.length > 0) {
            return <FindList getFoundUsers = {this.getFoundUsers} addContact = {this.addContact}/>
        } else {
            return <ChannelList getActiveChannel = {this.getActiveChannel} setActiveChannel = {this.setActiveChannel} getChannels = {this.getChannels}/>
        }
    }

    handleFindChange = (event) => {
        const { value, name } = event.target;
        this.setState({[name]: value});
        if(value) {
            this.findUsers(value);
        }
      }

    render() {
        return (
            <div className="chat">
                <div className="find-form-div">
                    <form className="find-form">
                        <input
                            className="find-form-input"
                            type="text"
                            name="search"
                            placeholder="Поиск"
                            onChange={this.handleFindChange}
                            required
                        /> 
                    </form>
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

                </div>
            </div>
        );
    }
}
