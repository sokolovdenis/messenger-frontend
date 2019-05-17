import React, {Component} from 'react';
import './SendMessageForm.css';
export default class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : ""
        }
        this.sendMessage = props.sendMessage;
    }

    handleMessageChange = (event) => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.sendMessage(this.state.message);
        this.setState({message : ""});
    }

    render() {
        return (
          <form onSubmit={this.onSubmit} className='message-form'>
              <input
                    className="message-input"
                    type="text"
                    name="message"
                    value={this.state.message}
                    placeholder="Введите сообщение"
                    onChange={this.handleMessageChange}
                    required
                /> 
          </form>  
        )
    }
}