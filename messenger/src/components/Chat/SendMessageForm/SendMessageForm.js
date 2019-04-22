import React, { Component } from 'react';
import './SendMessageForm.css'


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
        console.log("handleChange");
        this.setState({
            message: event.target.value
        })
    }
    
    handleSubmit(e) {
        console.log("handleSubmit");
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    }
    
    render() {
        return (
            <div className="type-msg">
                <div className="input-msg-write">
                    <form
                        onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            className="write-msg" 
                            placeholder="Type a message"
                            onChange={this.handleChange}
                            value={this.state.message} />
                    </form>
                    <button className="msg-send-btn" type="button" onClick={this.handleSubmit}>
                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default SendMessageForm