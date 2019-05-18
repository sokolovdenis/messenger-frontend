import React, {Component} from 'react';
import MessagesList from './messages-list'
import PostMessageForm from './post-messageform'

class Messenger extends Component {
    render() {
        console.log("Messenger -> render()");
        return (
            <div>
                <section><MessagesList token={this.props.token}/></section>
                <section><PostMessageForm token={this.props.token}/></section>
            </div>
        );
    }
}

export default Messenger;
