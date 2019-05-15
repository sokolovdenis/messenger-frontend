import React, {Component} from 'react';
import './SendMessageForm.css';
export default class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.handleMessageChange = props.handleMessageChange;
        this.getMessage = props.getMessage;
        this.sendMessage = props.sendMessage;
    }

    submitMessage = (event) => {
        event.value = "";
    }

    render() {
        return (
          <form onSubmit={this.sendMessage} className='message-form'>
              <input
                    className="message-input"
                    type="text"
                    name="message"
                    value={this.getMessage()}
                    placeholder="Введите сообщение."
                    onChange={this.handleMessageChange}
                    required
                /> 
          </form>  
        )
    }
}