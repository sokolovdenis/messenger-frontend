import React, {Component} from 'react';
import './FindList.css';

export default class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.getFoundUsers = props.getFoundUsers;
        this.addContact = props.addContact;
    }

    render() {
        return (
            <ul className="find-list">
            {           
                this.getFoundUsers().map((user, index) => {
                    if(user) {
                        return (
                            <li key={index} className="user">
                                <a onClick={()=>this.addContact(user)} href="/chat#" className="user-name">{user.name}</a>
                            </li>
                        );
                    }
                }
                )
            }
            </ul>
        )
    }
}
