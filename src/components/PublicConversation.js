import React, { Component } from 'react';
import {getPublicConversation, getUser, sendMessageToPublicConversation} from "../Api";
import SignOut from "./SignOut";
import MessagesList from "./MessagesList";
import ReactDOM from "react-dom";
import Messenger from "./Messenger";


class PublicConversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
            users : [],
            yourMessage : ''
        };
/*
        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem('token'));
        this.socket.onmessage = function (event) {
            let newMessage = event.data;
            this.setState({'messages' : [...this.state.messages, newMessage]})
        };*/

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openMessenger = this.openMessenger.bind(this);
        this.addNewMessage = this.addNewMessage.bind(this);
    }

    componentDidMount() {
        getPublicConversation(0, 100)
            .then( response =>
                response.json().then(messages => ({messages, response}))
            ).then(({messages, response}) => {
            if (response.ok) {
                this.setState({'messages': messages.reverse()});
                messages.reverse().map( message => this.addNewMessage(message));
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch(e => console.log("Error: ", e));
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
                    //this.socket.send(message);
                    this.setState({'messages' : [message, ...this.state.messages]});
                    this.addNewMessage(message);
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
        /*getUser(message.user)
            .then( res =>
                res.json().then(user => ({user, res}))
            ).then(({user, res}) => {
                if (res.ok) {
                    this.setState({'users' : [...this.state.users, user.name]});
                } else if (res.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(res.statusText);
                }
            }).catch(e => console.log("Error ", e));*/
    }

    openMessenger() {
        ReactDOM.render(
            <Messenger />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <section>
                <SignOut />
                <section>
                    <a onClick={this.openMessenger}>All conversations</a>
                    <br/>
                    <article>
                        Public conversation
                    </article>

                    <form onSubmit={this.handleSubmit}>
                        <p>Your next message: </p>
                        <input id="message" type="text" onChange={this.handleMessageChange} placeholder="" required autoFocus />
                        <br/>
                        <br/>
                        <button type="submit">Send message</button>
                    </form>

                    <MessagesList messages={this.state.messages} users={this.state.users} />
                </section>
            </section>
        );
    }
}

export default PublicConversation;