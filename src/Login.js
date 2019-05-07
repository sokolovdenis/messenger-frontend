import React, { Component } from 'react';
import './Login.css';
import { Auth } from './Utils'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remember : false
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleRememberChange = (event) => {
    const { checked } = event.target;
    this.setState ({
      "remember" : checked
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    Auth(this.state.login, this.state.password, null, this.state.remember);
  }

  render() {
    return (
      <div className="center">
        <div className="login">
          <form onSubmit={this.onSubmit}>
            <h2>Добро пожаловать!</h2>
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
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <input
                id="remember"
                type="checkbox"
                name="remember"
                placeholder="Запомнить пользователя"
                onChange={this.handleRememberChange}
              />
            <label or="remember">Запомнить пользователя</label>
            </div>
          <input className="form-submit" type="submit" value="Войти"/>
          <p className="register-text">Впервые здесь? -&nbsp;
            <a
              href="\Register"
              target="_blank"
            >
            регистрация
            </a>
          </p>
          </form>
        </div>
        
      </div>
    );
  }
}
