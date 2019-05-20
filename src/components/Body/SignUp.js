import React, { Component } from 'react';

const axios = require('axios');

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      login: '',
      password: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeLogin(event) {
    this.setState({
      login: event.target.value
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let url = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup';
    let data = {
      name: this.state.name,
      login: this.state.login,
      password: this.state.password
    };

    axios.post(
      url, data
    ).then(response => {
      if (response.status === 200) {
        let token = response.data.token;
        let tokenExpirationDate = response.data.expires;
        this.props.updateToken(token, tokenExpirationDate);
      } else {
        throw new Error('Error during SignUp')
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <form className="input-group" onSubmit={this.handleSubmit}>
        <input type='text' className='form-control' placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
        <input type='text' className='form-control' placeholder="Login" value={this.state.login} onChange={this.handleChangeLogin} />
        <input type='password' className='form-control' placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
        <div className='input-group-append'>
          <button className='btn btn-outline-success' type='submit'>Sign Up</button>
        </div>
      </form>
    );
  }
}
