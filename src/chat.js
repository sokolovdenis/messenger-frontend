import React, {Component} from 'react';
import {getPrivateChat} from "./api";
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
    }


    componentDidMount() {
        setInterval(
            () => getPrivateChat(
                this.state.user_id, 0, 1000
            ).then(messages => this.setState({messages: messages})),
            500,
        );
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
                                    <Message user={msg.user} msg={msg.content} time={msg.timestamp}/>
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