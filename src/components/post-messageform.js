import React, {Component} from 'react';
import {postPublicMessage} from "./api";

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

        postPublicMessage(this.props.token, this.state.value).then(msg => {
            this.setState({
                message: ''
            })
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.message} onChange={this.handleChange} required autoFocus/>
                <input type='submit' value='Send!'/>
            </form>
        );
    }
}

export default PostMessageForm;