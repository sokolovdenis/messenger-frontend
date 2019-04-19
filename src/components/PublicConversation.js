import React, { Component } from 'react';
import './PublicConversation.css';
import {getPublicConversation, getUser} from "../Api";
import SignOut from "./SignOut";
import Menu from "./Menu";
import MessagesList from "./MessagesList";


class PublicConversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
            users : []
        }
    }

    componentDidMount() {
        getPublicConversation(0, 100)
            .then( response =>
                response.json().then(messages => ({messages, response}))
            ).then(({messages, response}) => {
            if (response.ok) {
                this.setState({'messages': messages});
                messages.map( mess => {
                    getUser(mess.user)
                        .then( res =>
                            res.json().then(user => ({user, res}))
                        ).then(({user, res}) => {
                            if (res.ok) {
                                this.setState({'users' : [...this.state.users, user.name]});
                            } else if (res.status === 401) {
                                console.log("Need authentication");
                            } else {
                                console.log(res.statusText);
                            }
                        }).catch(e => console.log("Error ", e));
                });
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
                This is Public conversation

                <MessagesList messages={this.state.messages} users={this.state.users} />
            </div>
        );
    }
}

export default PublicConversation;