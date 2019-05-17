import React, { Component } from 'react';
import { SendPublicMessage, SendPrivateMessage, LoadPublicMessages, LoadUserMessages, GetUserById, GetUserName } from './requests.js'
import { Form, FormGroup, FormControl, Button, Row, Col } from "react-bootstrap";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            userId: props.userId,
            chatId: props.chatId,
            name: props.name == null ? "Public" : props.name,
            messages: [],
            loaded: true,
            socket: null, 
            updateCallback: props.updateCallback
        }

        this.getMessages();

        this.state.socket = new WebSocket("ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + localStorage.getItem("token"));

        this.state.socket.onmessage = (e) => {
            let messages = this.state.messages;
            let newMessage = this.convertMessage(JSON.parse(e.data));
            console.log(newMessage);
            if (this.state.chatId == null && newMessage.user === localStorage.getItem("MyId")) {
                this.setState({chatId: newMessage.id});
                this.state.updateCallback();
            }
            if (newMessage.id === this.state.chatId) {
                this.setUserName(newMessage);
                messages.push(newMessage);
                this.setState({ "messages": messages }, () => {
                    let objDiv = document.getElementById(this.state.messages[this.state.messages.length - 1].id);
                    objDiv.scrollIntoView({ behavior: "smooth" });
                });
            }
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            message: "",
            userId: props.userId,
            chatId: props.chatId,
            name: props.name == null ? "Public" : props.name,
            messages: [],
            loaded: false
        });
        console.log('rec')
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateUserNames();
    }

    componentDidUpdate() {
        if (!this.state.loaded) {
            this.setState({ loaded: true });
            this.getMessages();
        }
    }

    convertMessage = socket =>
        ({
            "conversationId": socket.ConversationId,
            "timestamp": socket.Timestamp,
            "user": socket.User,
            "content": socket.Content,
            "id": socket.Id
        })

    updateUserNames = () => {
        this.state.messages.map(m => { this.setUserName(m); return m });
    }

    getMessages = async => {
        console.log(this.state)
        let promise;
        if (this.isPublic()) {
            promise = LoadPublicMessages();
            console.log("load public");
        } else {
            promise = LoadUserMessages(this.state.userId);
        }
        promise.then(
            json => {
                this.setState({ messages: json });
                this.updateUserNames();
                this.setState({});
                return json;
            }
        );
    }

    isPublic() {
        return this.state.userId == null;
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            "message": e.target.value
        });
    }

    setUserName(message) {
        message.userName = GetUserName(message.user,
            (user, name) => {
                let m = this.state.messages.find(mes => mes.id === message.id);
                m.userName = name;
                this.setState({});
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let model = {
            "content": this.state.message,
            "user": localStorage.getItem("MyId")
        };

        if (this.isPublic()) {
            SendPublicMessage(this.state.message)
            /*.then(resp => {
                if (resp.ok) {
                    this.state.socket.send(JSON.stringify(model));
                }
            })*/

        }
        else {
            SendPrivateMessage(this.state.message, this.state.userId);
            /*.then(resp => {
                if (resp.ok) {
                    this.state.socket.send(JSON.stringify(model));
                }
            })*/
        }

        this.setState({ "message": "" });
    }

    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <div className="Chat">
                    {
                        this.state.messages.map((msg, i) =>
                            <div key={msg.id} id={msg.id}>
                                <div><b>{msg.userName}</b></div>
                                <div>{msg.content}</div>
                            </div>)
                    }
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <FormControl type="text" value={this.state.message} onChange={this.handleChange}></FormControl>
                        </Col>
                        <Col>
                            <Button type="submit">Send</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Chat;
