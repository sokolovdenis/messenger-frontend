import React, {Component} from 'react';
import {getPublicMessages, postPrivateMessage} from "./api";
import Message from "./message";
import "./App.css"

class MessagesList extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            messages: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateMessages = this.updateMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem("token"));
        this.socket.onmessage = (event) => {
            var old_messages = this.state.messages;
            old_messages.push(JSON.parse(event.data));
            this.setState({messages: old_messages});
        }
    };

    updateMessages(token) {
        getPublicMessages(token, 0, 1000).then(messages => {
            this.setState({messages: messages});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let text = document.getElementsByName("message")[0].value;
        console.log(text);
        postPrivateMessage(this.state.user_id, text);
    }

    componentDidMount() {
        this.updateMessages(this.props.token);
    }

    render() {
        let i = 0;
        return (
            <div>
                <div>
                    {
                        this.state.messages.map(function(msg) {
                            return (
                                <div className="Message_css" key={i++} >
                                    <Message user={msg.user || msg.User} msg={msg.content || msg.Content} time={msg.timestamp || msg.Timestamp} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MessagesList;