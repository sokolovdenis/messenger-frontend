import React from 'react';
import './Login.css';
import AuthSerivce from './AuthService';
import { FormError } from './FormError';

function errorMessageFromCode(code) {
  switch(code) {
    case 400:
      return "Неверные логин/пароль.";
    default:
      return `Неизвестная ошибка. Код ${code}.`
  }
}

export default class Login extends AuthSerivce {
  constructor(props) {
    super(props)
    this.state = {
      hasSubmit : false,
      authError : "",
      remember : false
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    if(super.IsLoggedIn()) {
      this.props.history.replace("/chat")
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleCheckboxChange = (event) => {
    console.log( this.state.remember );
    const { checked, name } = event.target;
    this.setState ({
      [name] : checked
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    super.Login( this.state.login, this.state.password, this.state.remember)
    .then(res => {
      this.props.history.replace("/chat");
    })
    .catch(err => {
       this.setState({authError: errorMessageFromCode(err)});
    })
    this.setState({hasSubmit : true});
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
                onChange={this.handleCheckboxChange}
              />
            <label or="remember">Запомнить пользователя</label>
            </div>
            <FormError hasSubmit = {this.state.hasSubmit} error = {this.state.authError}/>
          <input className="form-submit" type="submit" value="Войти"/>
          <p className="register-text">Впервые здесь? -&nbsp;
            <a href="\Register">регистрация</a>
          </p>
          </form>
        </div>
      </div>
    );
  }
}
