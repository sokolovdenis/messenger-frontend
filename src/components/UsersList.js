import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UsersList.css';


class UsersList extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <ul className='users-list'>
                    {this.props.users.map(user => {
                        return (
                            <li key={user.id}>
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

export default UsersList;