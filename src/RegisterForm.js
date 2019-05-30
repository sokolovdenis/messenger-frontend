import React, { Component } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./RegisterForm.css";

class RegisterForm extends Component {
  render() {
    const { errorRegister, errorLogin } = this.props;
    return (
      <div className="RegisterForm">
        <div className="SignUp-container">
          <SignUp onRegister={this.props.onRegister} error={errorRegister} />
        </div>
        <div className="SignIn-container">
          <SignIn onLogin={this.props.onLogin} error={errorLogin} />
        </div>
      </div>
    );
  }
}

export default RegisterForm;
