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
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
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
                    <button className="msg-send-btn" type="button">
                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default SendMessageForm