import React, {Component} from 'react';
import {getPrivateMessages} from "./api";
import "./App.css"
import Message from "./message";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.user_id,
            user_name: this.props.user_name,
            messages: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem("token"));
        this.socket.onmessage = (event) => {
            var old_messages = this.state.messages;
            old_messages.push(JSON.parse(event.data));
            this.setState({messages: old_messages});
        }
    }


    componentDidMount() {
        getPrivateMessages(
            this.state.user_id, 0, 1000
        ).then(messages => this.setState({messages: messages}));
    }

    render() {
        let i = 0;
        return (
            <div>
                <div className="ChatName">
                    {this.state.user_name}
                </div>
                <div className="PrivateChat">
                    {
                        this.state.messages.map(function (msg) {
                            return (
                                <div className="Message_css" key={i++}>
                                    <Message user={msg.user || msg.User} msg={msg.content || msg.Content} time={msg.timestamp || msg.Timestamp}/>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}

export default Chat;