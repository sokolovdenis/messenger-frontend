import React, { Component } from 'react';


import SignOut from "./SignOut";
import ChatList from "./ChatList";

import {findUsersByName, getAllConversations, getUser} from "../Api";

import {
    Container,
    Header,
    Body,
    Content,
    Aside,
    Footer
} from 'react-holy-grail-layout'



class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations : [],
            users : [],
            templateName : '',
            findedUsers : []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadAllData = this.loadAllData.bind(this);


        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" +
            localStorage.getItem('token'));
        this.socket.onmessage = (event) => {
            this.loadAllData();
        };
    }

    componentDidMount() {
        this.loadAllData();
    }

    handleNameChange(event) {
        this.setState({'templateName': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.templateName === '') {
            this.setState({'findedUsers': []});
        } else {
            findUsersByName(this.state.templateName)
                .then(response =>
                    response.json().then(users => ({users, response}))
                ).then(({users, response}) => {
                if (response.ok) {
                    this.setState({'findedUsers': users, 'templateName': ''});
                } else if (response.status === 400) {
                    console.log("Some parameters are not valid");
                } else if (response.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e));
        }

        document.getElementById('users').value = '';
        document.getElementById('users').focus();
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


    render() {
        return (
            <div>
                <Container>
                    <Header bg="lightgreen" p={2}>
                        <SignOut/>
                        <article > Home page </article>
                    </Header>
                <Body>
                    <Content bg="white" p={2}>
                        <article> All avalible chats </article>
                        <ChatList conversations={this.state.conversations} users={this.state.users} socket={this.socket}/>
                    </Content>
                </Body>
                </Container>
            </div>
        );
    }
}

export default Messenger;
