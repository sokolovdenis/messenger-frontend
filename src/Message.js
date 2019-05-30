import React, {Component} from 'react';

import './Message.css'

const backend_url = "http://messenger.westeurope.cloudapp.azure.com/";

class Message extends Component {
    state = {
        user: ''
    }

    getUserById = id => {
        let url = backend_url + "api/users/" + id;
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.token
          }
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        });
      };

    componentDidMount() {
      this.getUserById(this.props.message.user)
      .then(data => {
        console.log(data.name);
        this.setState({
            user: data.name
        });
      });
    }


    render() {
        const { message } = this.props;
        return (
            <div className='Message-container'>
                <div className='User'>FROM: {this.state.user}</div>
                <div className='Content'>{message.content}</div>
                <div className='Time'>{message.timestamp.replace('T', ' ').substr(0, 19)}</div>
            </div>
        );
    }
}

export default Message;