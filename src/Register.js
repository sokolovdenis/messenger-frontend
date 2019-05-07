import React, { Component } from 'react';
import './Register.css';
import { Auth } from './Utils'
import { minLoginLength, maxLoginLength, minNameLength, maxNameLength, minPasswordLength, maxPasswordLength } from './Constants'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login : "",
      name : "",
      password : "",
      confirmedPassword : ""
    };
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleValidation() {
    let input = this.state;
    let errors = {};
    let inputIsValid = true;
    
    if(!input["login"]) {
      inputIsValid = false;
      errors["login"] = "Не может быть пустым.";
    } else if( input["login"].length < minLoginLength || input["login"].length > maxLoginLength ) {
      inputIsValid = false;
      errors["login"] = `Некорректная длина логина. Длина должна быть не меньше ${minLoginLength} и не больше ${maxLoginLength}`;
    }

    if(!input["name"]) {
      inputIsValid = false;
      errors["name"] = "Не может быть пустым.";
    } else if( input["name"].length < minNameLength || input["name"].length > maxNameLength ) {
      inputIsValid = false;
      errors["name"] = `Некорректная длина отображаемого имени.
      "Длина должна быть не меньше ${minNameLength} и не больше ${maxNameLength}`;
    }

    if(!input["password"]) {
      inputIsValid = false;
      errors["password"] = "Не может быть пустым.";
    } else if( input["login"].length < minPasswordLength || input["login"].length > maxPasswordLength ) {
      inputIsValid = false;
      errors["password"] = `Некорректная длина пароля.
      "Длина должна быть не меньше ${minPasswordLength} и не больше ${maxPasswordLength}`;
    } else if(input["password"] !== input['confirmedPassword']) {
      inputIsValid = false;
      errors["pasword"] = "Пароль и подтверждение не совпадаеют";
    }

    return inputIsValid;
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.handleValidation()) {
      Auth(this.state.login, this.state.password, this.state.name);
    } else {

    }
  }

  render() {
    return (
      <div className="center">
        <div className="login">
          <form onSubmit={this.onSubmit}>
            <h2>Регистрация</h2>
            <div>
              <input
                className="form-item"
                type="text"
                name="login"
                placeholder="Логин"
                onChange={this.handleInputChange}
                required
              /> 
            </div>
            <div>
              <input
                className="form-item"
                type="text"
                name="name"
                placeholder="Отображаемое имя"
                onChange={this.handleInputChange}
                required
              /> 
            </div>
            <div>
              <input
                className="form-item"
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={this.handleInputChange}
                required
              /> 
            </div>
            <div>
              <input
                className="form-item"
                type="password"
                name="confirmedPassword"
                placeholder="Подтверждение пароля"
                onChange={this.handleInputChange}
                required
              />
            </div>
          <input className="form-submit" type="submit" value="Зарегистрировать"/>
          </form>
        </div>
        
      </div>
    );
  }
}
