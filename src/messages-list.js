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
        setInterval(
            () => this.updateMessages(this.props.token),
            100,
        );
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
                                    <Message user={msg.user} msg={msg.content} time={msg.timestamp} />
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