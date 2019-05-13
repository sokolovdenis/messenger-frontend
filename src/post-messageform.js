import React, {Component} from 'react';
import MessagesList from './messages-list';
import { postPublicMessage } from "./api";

class PostMessageForm extends Component {

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        postPublicMessage(this.state.value).then(msg => {
            this.setState({
                value: '',
            });
        })
    }

    render() {
        return (
            <div>
                <section><MessagesList token={this.props.token}/></section>
                <section> <PostMessageForm /> </section>

            </div>
        );
    }
}

export default PostMessageForm;