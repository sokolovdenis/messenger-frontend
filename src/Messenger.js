import React, {Component} from 'react'
import {LoadPublicMessages, GetMe, SendPublicMessage, GetUserById} from './util.js'
import { Link } from 'react-router-dom';
class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message :"",
            messages:[],
            users: new Map()
        }
        this.ws = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token="
        +localStorage.getItem("token"));

        this.ws.onmessage = (e) => {
            this.LoadMessages();
        }

        this.LoadMessages = this.LoadMessages.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({
            "message" : e.target.value
        });
    }


    onSubmit = e => {
        e.preventDefault();
        let content = {
            content: this.state.message
        };
        SendPublicMessage(this.state.message).then(resp => {
            if (resp.ok) {
              this.ws.send(JSON.stringify(content));
            } else {
                alert(JSON.stringify(resp))
            }
        });
        this.setState({"message": ""});
    }


    LoadMessages() {
        LoadPublicMessages().then(
            resp => {
                this.setState({"messages": resp});
                
                resp.forEach(msg => {
                    if (!this.state.users.has(msg.user)) {
                        GetUserById(msg.user).then(userResp => {
                            let users = this.state.users;
                            users.set(msg.user, userResp.name);
                            this.setState({"users": users});
                        });
                    }
                });
            }
        )
    }
    componentDidMount() {
        this.LoadMessages();
    }

    render () {
        return (
            <div className = "Messager">
                <div className = "MsgList">
                {
                    this.state.messages.map((msg, i) =>
                        <div className = "Message">
                            <div className = "author"><b>{this.state.users.has(msg.user) ? this.state.users.get(msg.user) : msg.user}</b></div>
                            <div className = "text">{msg.content}</div>
                        </div>
                    )
                }
                </div>
                <div className = "MsgForm">
                <br />
                    <form onSubmit = {this.onSubmit}>
                        <input className = "inputMsg" type = "text" placeholder = "Type your message..." value = {this.state.message} onChange={this.onChange}></input>
                        <input className = "inputBtn" type = "submit" value = "Send"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default Messenger;