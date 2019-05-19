import React, { Component } from 'react';
import '../css/SendMessageForm.css'


class SendMessageForm extends Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    }
    
    render() {
        return (
            <div className="message-form">
                <div className="message-form-input">
                    <form
                        onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Type a message"
                            onChange={this.handleChange}
                            value={this.state.message} />
                    </form>
                    <button className="message-form-button" type="button" onClick={this.handleSubmit}>Send</button>
                </div>
            </div>
        )
    }
}

export default SendMessageForm
