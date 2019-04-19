import React, { Component } from 'react';
import './Messenger.css';
import SignOut from "./SignOut";
import Menu from "./Menu";
import ConversationsList from "./ConversationsList";
import {getAllConversations} from "../Api";

class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations : []
        }

    }

    componentDidMount() {
        getAllConversations()
            .then( response =>
                response.json().then(conversations => ({conversations, response}))
            ).then(({conversations, response}) => {
                if (response.ok) {
                    this.setState({'conversations': conversations});
                } else if (response.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e));
    }

    render() {
        return (
            <div>
                <SignOut />
                <Menu />
                This is Messenger

                <ConversationsList conversations={this.state.conversations} />
            </div>
        );
    }
}

export default Messenger;
