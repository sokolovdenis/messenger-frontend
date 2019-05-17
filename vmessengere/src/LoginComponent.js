import React, {
  Component
} from "react";
import {
  CreateUser,
  LoginUser
} from "./requests";
import { Form, FormGroup, FormControl, FormLabel, Button, ButtonToolbar } from "react-bootstrap";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      confirm_password: "",
      name: "",
      token: "",
      newUser: false,
      callback: props.callback
    };
  }

  validateString(str) {
    return (str.length >= 2 && str.length <= 50);
  }

  validateSignUpForm() {
    return (
      this.validateString(this.state.login) &&
      this.validateString(this.state.name) &&
      this.validateString(this.state.password) &&
      this.state.password === this.state.confirm_password
    );
  }

  validateLoginForm() {
    return (
      this.validateString(this.state.login) &&
      this.validateString(this.state.password)
    );
  }

  switchToSignUp = event => {
    event.preventDefault();
    this.setState({
      newUser: true
    });
  }

  switchToLogin = event => {
    event.preventDefault();
    this.setState({
      newUser: false
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.validateLoginForm()) {
      let promise = LoginUser(this.state.login, this.state.password);

      promise.then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          var error = new Error(resp.statusText);
          error.response = resp;
          throw error
        }
      }).then((json) => { return json.token })
        .then((token) => this.state.callback(token))
        .catch(err => {
          this.setState({ "error": "Unknown error" });
        })
    }
  }

  createUser = async event => {
    event.preventDefault();
    console.log('validat');
    if (this.validateSignUpForm()) {
      console.log('validated');
      let promise = CreateUser(this.state.name, this.state.login, this.state.password);

      promise.then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          var error = new Error(resp.statusText);
          error.response = resp;
          throw error
        }
      }).then((json) => {
        return json.token
      })
        .then((token) => this.state.callback(token))
        .catch(err => {
          if (err.response.status === 409) {
            this.setState({
              error: "This user already exist!"
            });
          } else {
            this.setState({
              error: "Unknown error"
            });
            console.log(err);
          }
        })
    }
  }

  renderLoginForm() {
    return (<div className="Login" >
      <div>
        {this.state.error}
      </div>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="login">
          <FormLabel>login</FormLabel>
          <FormControl
            autoFocus
            type="login"
            value={this.state.login}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>password</FormLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    );
  }

  renderSignUpForm() {
    return (<div className="SignUp" >
      <div>
        {this.state.error}
      </div>
      <Form onSubmit={this.createUser}>
        <FormGroup controlId="login">
          <FormLabel>login</FormLabel>
          <FormControl
            autoFocus
            type="login"
            value={this.state.login}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="name">
          <FormLabel>name</FormLabel>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>password</FormLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="confirm_password">
          <FormLabel>ConfirmationPassword</FormLabel>
          <FormControl
            type="password"
            value={this.state.confirm_password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>);
  }

  render() {
    return (
    <div className="SignUp" >
      <ButtonToolbar style={{display: "block"}}>
        <Button variant="primary" onClick={this.switchToLogin}> Login </Button>
        <Button variant="success" onClick={this.switchToSignUp}> SignUp </Button>
      </ButtonToolbar>
      {
        this.state.newUser === true ?
          this.renderSignUpForm() :
          this.renderLoginForm()
      }
    </div>
    );
  }
}