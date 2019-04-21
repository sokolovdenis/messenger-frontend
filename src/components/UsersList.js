import React, { Component } from 'react';
import {getUser} from "../Api";


class UsersList extends Component {
    constructor(props) {
        super(props);

        this.getUserPage = this.getUserPage.bind(this);
    }

    getUserPage() {
        /*getUser()
            .then( response =>
                response.json().then(messages => ({messages, response}))
            ).then(({messages, response}) => {
            if (response.ok) {
                this.setState({'messages': messages});
            } else if (response.status === 401) {
                console.log("Need authentication");
            } else {
                console.log(response.statusText);
            }
        }).catch(e => console.log("Error: ", e));*/
    }

    render() {
        return (
            <div>
                <ul className='users-list'>
                    {this.props.users.map(user => {
                        return (
                            <li key={user.id} onClick={this.getUserPage}>
                                <div>
                                    {user.name}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default UsersList