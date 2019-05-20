import React, {Component} from 'react';
import {postPublicMessage} from "./api";
import './post-messageform.css'

class PostMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        postPublicMessage(this.props.token, this.state.message).then(message => {
            this.setState({
                message: message
            })
        })
    }

    render() {
        return (
            <form className={'postBox'} onSubmit={this.handleSubmit}>
                <input className={'messageInput'} placeholder='Enter your message' type='text' value={this.state.message} onChange={this.handleChange} required autoFocus />
                <input className={'messageSendButton'} type='submit' value='Send!'/>
            </form>
        );
    }
}

export default PostMessageForm;