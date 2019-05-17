import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import "./Chat.css";

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            message:""
        };
    }

    getUserName(userId){
        if ( this.props.knownUserMap.has(userId) ){
            return this.props.knownUserMap.get(userId);
        } else {
            return 'Unknown user';
        }
    }

    handleClick(idx, event){
        if(!this.props.private) {
            this.props.updateChat(idx, false);
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message:""})
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm() {
        return this.state.message.length > 0;
    }




    render() {
        return (
            <div>
            <div className="Message-list">
                {this.props.messages.map(message=>
                    {
                        return (
                            <div

                                onClick={this.handleClick.bind(this, message.user)}
                                className="Item"

                            >
                                {this.getUserName(message.user)} : {message.content}
                            </div>
                        );
                    }
                )
                }
            </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="message">
                            <Form.Label>Message Text</Form.Label>
                            <Form.Control
                                autoFocus
                                type="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Send Message
                        </Button>

                    </Form>
                </div>
            </div>
        );
    }
}