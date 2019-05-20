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

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }

    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    getUserName(this.props.user, this.props.token).then(response => {
      if (response) {
        this.setState({
          name: response.data.name
        })
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      getUserName(this.props.user, this.props.token).then(response => {
        if (response) {
          this.setState({
            name: response.data.name
          })
        }
      });
    }
  }

  formatDate(date) {
    let dateObject = new Date(date);
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    let hour = dateObject.getHours();
    let minute = dateObject.getMinutes();
    let second = dateObject.getSeconds();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (second < 10) {
      second = '0' + second;
    }

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }

  render() {
    console.log(4);
    if (this.props.timestamp) {
      console.log(5);
      return (
        <div className='__message'>
          {this.state.name}<br />
          {this.props.content}<br />
          <div className='__date'>{this.formatDate(this.props.timestamp)}</div>
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}
