import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PrivateConversation from "./PrivateConversation";
import {getUser} from "../Api";


class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.openPrivateConversation = this.openPrivateConversation.bind(this);
    }

    openPrivateConversation(event) {
        ReactDOM.render(
            <PrivateConversation userId={event.target.id}/>,
            document.getElementById('root')
        );
    }

    /*componentWillMount() {
        this.props.messages.map( message => {
            getUser(message.user)
                .then( response =>
                    response.json().then( user => ({user, response}))
                ).then(({user, response}) => {
                if (response.ok) {
                    this.setState({'users' : [...this.state.users, user.name]});
                } else if (response.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error ", e));
        });
    }*/

    render() {
        return (
            <div>
                <ul className='messages-list'>
                    {this.props.messages.map((message, i) => {
                        return (
                            <lo key={message.id}>
                                <section>
                                    <a id={message.user} onClick={this.openPrivateConversation}>
                                        {
                                            (this.props.users.length > i) ?
                                            this.props.users[i] :
                                            'Some person'
                                        }
                                    </a>
                                    <br/>
                                    <p className="info">
                                        {message.content}
                                    </p>
                                    <br/>
                                    <br/>
                                </section>
                            </lo>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessagesList;