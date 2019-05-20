import React, { Component } from 'react';
import {getPublicConversation, getUser, sendMessageToPublicConversation} from "../Api";

import MessegesList from "./MessegesList";
import ReactDOM from "react-dom";
import Messenger from "./Messenger";

import {Aside, Body, Container, Content, Footer, Header} from "react-holy-grail-layout";


class PulicChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
            users : [],
            userName : '',
            yourMessage : '',
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.openMessenger = this.openMessenger.bind(this);


        this.addNewMessage = this.addNewMessage.bind(this);
        this.loadAllData = this.loadAllData.bind(this);

        this.openConversation = this.openConversation.bind(this);

        this.props.socket.addEventListener("message", (event) => {
            this.addNewMessage(JSON.parse(event.data));
        });
    }

    componentDidMount() {
        this.loadAllData();
    }

    handleMessageChange(event) {
        this.setState({'yourMessage': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        sendMessageToPublicConversation(this.state.yourMessage)
            .then( response =>
                response.json().then(message => ({message, response}))
            ).then(({message, response}) => {
            if (response.ok) {
                this.props.socket.send(JSON.stringify(message));
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch( e => console.log("Error: ", e));


        document.getElementById('message').value = '';
        document.getElementById('message').focus();
        this.setState({'yourMessage' : ''});
    }

    addNewMessage(message) {
        let id = message.id;
        let userId = message.user;
        if (id === undefined) {
            id = message.Id;
            userId = message.User;
        }

        if (this.state.messages.find(function(mess) {return mess.id === id;}) === undefined) {
            this.setState({'messages': [message, ...this.state.messages]});
            getUser(userId)
                .then(response =>
                    response.json().then(user => ({user, response}))
                ).then(({user, response}) => {
                    if (response.ok) {
                        let name = response.ok ? user.name : "Some Person";
                        this.setState({'users' : [name, ...this.state.users]});
                    }
                });
        }
    }

    openMessenger() {
        ReactDOM.render(
            <Messenger />,
            document.getElementById('root')
        );
    }

    loadAllData() {
        getPublicConversation(0, 200)
            .then( response =>
                response.json().then(messages => ({messages, response}))
            ).then(({messages, response}) => {
            this.setState({'messages': messages.reverse(), 'users': Array(messages.length)});
            messages.forEach((message, i) => {
                getUser(message.user)
                    .then(response =>
                        response.json().then(user => ({user, response}))
                    ).then(({user, response}) => {
                        let users = this.state.users;
                        users[i] = response.ok ? user.name : "Some Person";
                        this.setState({'users' : users});
                    });
                    });

        }).catch(e => console.log("Error: ", e));

    }

    openConversation(event) {
        ReactDOM.render(
            <PulicChat userId={event.target.id} isPublic={false} socket={this.props.socket} />,
            document.getElementById('root')
        );
    }

    render() {
        let topic = "Public conversation";
        return (
            <div className="Login">
                <Container>
                    <Header bg="lightgreen" p={2}>
                        <b onClick={this.SignOut}>Sign Out</b>
                        <p>
                            <form onSubmit={this.handleSubmit} className="messageForm">
                                <p>Your message: </p>
                                <input id="message" type="text" onChange={this.handleMessageChange} placeholder="" required autoFocus />
                                <br/>
                                <br/>
                                <button type="submit">Send message</button>
                            </form>
                        </p>
                    </Header>
                    <Body>
                        <Content bg="white" p={2}>
                            <b onClick={this.openMessenger}>All conversations.</b>
                            <br/>
                            <article>{topic}</article>
                            <MessegesList messages={this.state.messages} users={this.state.users} socket={this.props.socket}/>
                        </Content>
                        <Aside bg="gray" left primary p={2}>
                            All Users:
                            <ul>
                                <li> user1 </li>
                                <li> user2 </li>
                                <li> user3 </li>
                            </ul>
                        </Aside>
                    </Body>
                </Container>
            </div>
        );
    }
}

export default PulicChat;