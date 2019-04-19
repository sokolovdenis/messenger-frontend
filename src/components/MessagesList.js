import React, { Component } from 'react';
import './MessagesList.css';


class MessagesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourMessage : ''
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMessageChange(event) {
        this.setState({'yourMessage': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log("It doesn't work");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let obj = document.getElementsByClassName('btn btn-default')[0];
        obj.scrollIntoView(false);
    }

    render() {
        return (
            <div>
                <ul className='messages-list'>
                    {this.props.messages.map((message, i) => {
                        return (
                            <li key={message.id}>
                                <div>
                                    {this.props.users[i]}
                                    {this.props.user}
                                    <br/>
                                    {message.content}
                                    <br/>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <label htmlFor="inputName" className="sr-only">Your message: </label>
                <input type="text" name="inputName" onChange={this.handleMessageChange} className="form-control" placeholder="" required autoFocus />
                <br/>
                <br/>
                <button className="btn btn-default" type="submit">Send message</button>
            </div>
        );
    }
}

export default MessagesList;