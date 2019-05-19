import {postpublicmessage} from "./Api";
import React, {Component} from 'react';


class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.setState({'text': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        postpublicmessage(this.state.text).then(token => {
            console.log(token);
        });
        document.getElementsByName("postform")[0].value = "";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="PostForm">
                <input type="text" name="postform" id="element" placeholder="Your message..." onChange={this.handleTextChange}/>
                <button type="submit" id="element">Send</button>
            </form>
        );
    }
}

export default PostForm;