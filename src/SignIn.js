import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      error: ""
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleLoginChange(e) {
    this.setState({
      "login": e.target.value
    });
  }

  handlePassChange(e) {
    this.setState({
      "password": e.target.value
    });
  }

  validateField(name, value) {
    if (value.length < 2) {
      this.setState({"error": this.state.error + name + " is too short\n"});
      return false;
    }
    if (value.length > 50) {
      this.setState({"error": this.state.error + name + " is too long\n"});
      return false;
    }
    return true;
  }

  validateForm() {
    return this.validateField("login", this.state.login) &&
           this.validateField("password", this.state.password);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.error = "";
    if (! this.validateForm()) {
      return;
    }

    let model = {
      "login": this.state.login,
      "password": this.state.password
    };

    let url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin";

    var promise = fetch(
      url,
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model)
    });
    promise.then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        var error = new Error(resp.statusText);
        error.response = resp;
        throw error
      }
    }).then((json) => {return json.token})
      .then((token) => this.props.onTokenRecieve(token))
      .catch(err => {
        this.setState({"error": "Unknown error"});
      })
  }

  render() {
    return (
      <div className="Login">
        <div>
          {this.state.error}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Login</label> <br />
          <input className="Field" type="text" value={this.state.login} onChange={this.handleLoginChange}/> <br/>
          <label>Password</label> <br />
          <input className="Field" type="password" value={this.state.password} onChange={this.handlePassChange}/> <br/>
          <input className="Btn" type="submit" value="Submit"/>
          <Link className="Link" to="/signup"> Sign up </Link>
        </form>
      </div>
    );
  }
}

export default SignIn;
