import React, { Component } from 'react';

const axios = require('axios');

export default class SendMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeText(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.text) {
      let url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages`;
      if (this.props.participantId) {
        url = `http://messenger.westeurope.cloudapp.azure.com/api/conversations/${this.props.participantId}/messages`;
      }
      let data = {
        content: this.state.text
      };
      let config = {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      };

      axios.post(
        url, data, config
      ).catch(error => {
        console.log(error);
      });

      this.setState({
        text: ''
      });
    }
  }

  render() {
    return (
      <div className='__send__message'>
        <form className='input-group' onSubmit={this.handleSubmit}>
          <input type='text' className='form-control' value={this.state.text} onChange={this.handleChangeText} />
          <div className='input-group-append'>
            <button className='btn btn-outline-success' type='submit'>Send</button>
          </div>
        </form>
      </div>
    );
  }
}
