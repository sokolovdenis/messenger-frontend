import React, {Component} from 'react';
import { postPublicMessage } from './api'

class PostMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }

        console.log("PostMessageForm -> constructor(): state.message = " + this.state.message);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);	
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("PostMessageForm -> handleSubmit()");

        postPublicMessage(this.props.token, this.state.message).then(msg => {
            this.setState({
                message: ''
            })
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.message} onChange={this.handleMessageChange} required autoFocus/>
                <input type='submit' value='Send!'/>
            </form>
        );
    }
}

export default PostMessageForm;
