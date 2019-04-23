import React, { Component } from 'react';
import SignOut from "./SignOut";
import ConversationsList from "./ConversationsList";
import {findUsersByName, getAllConversations, getUser} from "../Api";


class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations : [],
            users : [],
            templateName : ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadAllData = this.loadAllData.bind(this);

        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem('token'));
        this.socket.onmessage = (event) => {
            this.loadAllData();
        }
    }

    componentDidMount() {
        this.loadAllData();
    }

    handleNameChange(event) {
        this.setState({'templateName': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        findUsersByName(this.state.templateName)
            .then( response =>
                response.json().then(users => ({users, response}))
            ).then(({users, response}) => {
                if (response.ok) {
                    this.setState({'findedUsers': users});
                    console.log(this.state.findedUsers);
                } else if (response.status === 400) {
                    console.log("Some parameters are not valid");
                } else if (response.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e));

        console.log("filter conversations, this method doesn't work now");

        document.getElementById('users').value = '';
        document.getElementById('users').focus();
        this.setState({'templateName' : ''});
    }

    loadAllData() {
        getAllConversations()
            .then( response =>
                response.json().then(conversations => ({conversations, response}))
            ).then(({conversations, response}) => {
            if (response.ok) {
                this.setState({'conversations': conversations, 'users': Array(conversations.length)});
                conversations.forEach((conversation, i) => {
                    if (conversation.participant === null) return;
                    getUser(conversation.participant)
                        .then(response =>
                            response.json().then(user => ({user, response}))
                        ).then(({user, response}) => {
                            let users = this.state.users;
                            users[i] = response.ok ? user.name : "Some Person";
                            this.setState({'users' : users});
                    });
                });
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch(e => console.log("Error: ", e));
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <section>
                <SignOut />
                <section className="content">
                    <article>
                        Your best Messenger
                    </article>

                    <form onSubmit={this.handleSubmit}>
                        <p>Find user by name: </p>
                        <input id="users" onChange={this.handleNameChange} placeholder="" required autoFocus />
                        <br/>
                        <br/>
                        <button type="submit">Find conversations</button>
                    </form>

                    <ConversationsList conversations={this.state.conversations} users={this.state.users} socket={this.socket}/>
                </section>
            </section>
        );
    }
}

export default Messenger;
