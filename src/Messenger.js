import React, {Component} from 'react';
import Conversations from "./Conversations";
import './App.css';
import Chat from "./Chat";

class Messenger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatId: null
        };

        this.chatIdReceiveHandler = this.chatIdReceiveHandler.bind(this);
    }

    chatIdReceiveHandler(id) {
        this.setState({
            chatId: id
        });
    }

	render() {
		return (
		    <div className='Messenger'>
            {
                this.state.chatId ?
                    <Chat token={this.props.token} id={this.state.chatId}/> :
                    <Conversations token={this.props.token} handler={this.chatIdReceiveHandler}/>
            }
            </div>
		);
	}
}

export default Messenger;
