import React, {Component} from 'react';
import { getPublicMessages } from './api'
import Message from './message'

class MessagesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        console.log("MessagesList -> constructor(): state.messages = " + this.state.messages);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadNewMessages = this.loadNewMessages.bind(this);
        this.convertTimeStampToDate = this.convertTimeStampToDate.bind(this);

        this.socket = new WebSocket(`ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=${this.props.token}`);

        this.socket.onmessage = (event) => {
            console.log("MessagesList -> socket.onmessage");
            let oldMessages = this.state.messages;
            let newMessage = JSON.parse(event.data);
            newMessage = {
                conversationId: newMessage.ConversationId,
                timestamp: newMessage.Timestamp,
                user: newMessage.User,
                content: newMessage.Content,
                id: newMessage.Id
            };
            oldMessages.push(newMessage)
            this.setState({messages: oldMessages});
        }
    };

    loadNewMessages(token) {
        getPublicMessages(token, 0, 500).then(messages => {
            this.setState({messages: messages});
        });
    }

    convertTimeStampToDate(timestamp) {
        let splittedStamp = timestamp.split("T");
        let date = splittedStamp[0];
        let time = splittedStamp[1].split(".")[0];
        return [date, time].join(" ");
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.loadNewMessages(this.props.token)
        // }, 10000);
        this.loadNewMessages(this.props.token)
        console.log("MessagesList -> componentDidMount()");
    }

    render() {
        console.log("MessagesList -> render()");
        return (
            <div>
                {
                    this.state.messages.slice(400).map((message, i) => {
                        return <div key={i}>
                            <Message
                                userId={message.user}
                                text={message.content}
                                time={this.convertTimeStampToDate(message.timestamp)}
                            />
                        </div>
                    })
                }

            </div>
        );
    }
}

export default MessagesList;