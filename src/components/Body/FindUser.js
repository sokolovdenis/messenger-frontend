import React, { Component } from 'react';

const axios = require('axios');

export default class FindUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(conversationId) {
    let participants = document.getElementsByClassName('__find__user__result');
    for (let participant of participants) {
      participant.remove();
    }
    this.props.changeConversation(null, conversationId);
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let url = `http://messenger.westeurope.cloudapp.azure.com/api/users/?query=${this.state.name}`;
    let config = {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    };

    axios.get(
      url, config
    ).then(response => {
      if (response.status === 200) {
        for (let element of response.data) {
          let form = document.getElementById('__find__user__form');
          let html = `<p class='__find__user__result' id='${element.id}'>${element.name}</p></br>`;
          form.insertAdjacentHTML('afterend', html);
          let participant = document.getElementById(element.id);
          participant.onclick = () => (this.handleClick(element.id));
        }
      } else {
        throw new Error('Error during FindUser');
      }
    }).catch(error => {
      console.log(error);
    });

    this.setState({
      name: ''
    });
  }

  render() {
    return (
      <nav className='__find__user__list'>
        <form id='__find__user__form' className='input-group' onSubmit={this.handleSubmit}>
          <input type='text' className='form-control' value={this.state.name} onChange={this.handleChangeName} />
          <div className='input-group-append'>
            <button className='btn btn-outline-success' type='submit'>Find User</button>
          </div>
        </form>
      </nav>
    )
  }
}