import React, { Component } from 'react';

const axios = require('axios');

async function getUserName(user, token) {
  console.log(1);
  if (user) {
    let url = `http://messenger.westeurope.cloudapp.azure.com/api/users/${user}`;
    let config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }

    let response = await axios.get(
      url, config
    ).catch(error => {
      console.log(error);
    });
    console.log(response);
    return response;
  } else {
    return;
  }
}

export default class ConversationCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.changeConversation = this.changeConversation.bind(this);
  }

  componentWillMount() {
    getUserName(this.props.conversationCard.participant, this.props.token).then(response => {
      if (response) {
        this.setState({
          name: response.data.name
        });
      } else {
        this.setState({
          name: 'Public Chat'
        });
      }
    });
  }

  changeConversation() {
    this.props.changeConversation(this.props.conversationCard.id, this.props.conversationCard.participant);
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversationCard.participant !== prevProps.conversationCard.participant) {
      getUserName(this.props.conversationCard.participant, this.props.token).then(response => {
        if (response) {
          this.setState({
            name: response.data.name
          })
        } else {
          this.setState({
            name: 'Public Chat'
          });
        }
      });
    }
  }

  render() {
    if (this.state.name) {
      return (
        <li className='nav-item __conversation__card' onClick={this.changeConversation}>
          {this.state.name}
        </li>
      );
    } else {
      return (
        <>
        </>
      );
    }
  }
}
