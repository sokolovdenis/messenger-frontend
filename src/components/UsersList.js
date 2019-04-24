import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Conversation from "./Conversation";


class UsersList extends Component {
    constructor(props) {
        super(props);

        this.openConversation = this.openConversation.bind(this);
    }

    openConversation(event) {
        ReactDOM.render(
            <Conversation userId={event.target.id} isPublic={false} socket={this.props.socket} />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <ul className='users-list'>
                    {this.props.users.map(user => {
                        if (localStorage.getItem('userId') === user.id) {
                            return;
                        }
                        return (
                            <li key={user.id}>
                                <section>
                                    <b id={user.id} onClick={this.openConversation}>
                                        {user.name}
                                    </b>
                                    <br/>
                                </section>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default UsersList;