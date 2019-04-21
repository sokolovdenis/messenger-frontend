import React, { Component } from 'react';
import SignOut from "./SignOut";
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
            <section>
                <SignOut />
                <section className="content">
                    <article>
                        Your best Messenger
                    </article>
                    <ConversationsList conversations={this.state.conversations} />
                </section>
            </section>
        );
    }
}

export default Messenger;
