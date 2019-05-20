import React, { Component } from 'react';


class MessegesList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <ul className='messages-list'>
                    {this.props.messages.map((message, i) => {
                        return (
                            <li className="messageBuble" key={message.id !== undefined ? message.id : message.Id}>
                                <div>
                                    <p id={message.user !== undefined ? message.user : message.User} >
                                        { this.props.users[i] }
                                    </p>
                                    <br/>
                                    <p className="info">{message.content !== undefined ? message.content : message.Content}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessegesList;