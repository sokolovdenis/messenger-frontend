import React from 'react';
import './Register.css';
import AuthService from './AuthService';
import { minLoginLength, maxLoginLength, minNameLength, maxNameLength, minPasswordLength, maxPasswordLength } from './Constants';
import { FormError } from "./FormError";

function errorMessageFromCode(code) {
  switch(code) {
    case 409:
      return "Логин занят другим пользователем.";
    default:
      return `Неизвестная ошибка. Код ${code}.`
  }
}

export default class Register extends AuthService {
  constructor(props) {
    super(props)
    this.state = {
      login : "",
      name : "",
      password : "",
      confirmedPassword : "",
      hasSubmit : false, // Не показываем сообщения о некорретных данных до первого submit.
      formErrors : {
        login : "",
        name : "",
        password : "",
        confirmedPassword : "",
        auth : "",
      }
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentWillMount() {
    if(super.IsLoggedIn()) {
      this.props.history.replace("/chat");
    }
  }

  handleValidation(name, value) {
    let errors = this.state.formErrors;
    switch(name) {
      case "login":
        if(value.length < minLoginLength || value.length > maxLoginLength ) {
          errors["login"] = `Некорректная длина логина.\n
          Длина должна быть не меньше ${minLoginLength} и не больше ${maxLoginLength}`;
        } else {
          errors["login"] = "";
        }
        // При смене логина убираем ошибку о повторном логине.
        errors["auth"] = "";
        break;
      case "name":
        if(value.length < minNameLength || value.length > maxNameLength) {
          errors["name"] = `Некорректная длина отображаемого имени.\n
          "Длина должна быть не меньше ${minNameLength} и не больше ${maxNameLength}`;
        } else {
          errors["name"] = "";
        }
        break;
      case "password":
        if(value.length < minPasswordLength || value.length > maxPasswordLength) {
          errors["password"] = `Некорректная длина пароля.\n
          "Длина должна быть не меньше ${minPasswordLength} и не больше ${maxPasswordLength}`;
        } else {
          errors["password"] = "";
        }
      case "confirmedPassword":
        if(this.state.password !== this.state.confirmedPassword) {
          errors["confirmedPassword"] = "Пароль и подтверждение не совпадают";
        } else {
          errors["confirmedPassword"] = "";
        }
        break;
      default:
        break;
    }
    this.setState({formErrors : errors});
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({[name]: value},
      () => {this.handleValidation(name, value)});
  }

  isFormValid() {
    let errors = this.state.formErrors;
    for(let key in errors) {
      if(errors[key].length > 0) {
        return false;
      }
    }
    return true;
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.isFormValid()) {
      super.Register(this.state.login, this.state.password, this.state.name)
      .then( _ => {
        this.props.history.replace("/chat");
      })
      .catch(err => {
          let errors = this.state.formErrors;
          errors["auth"] = errorMessageFromCode(err);
          console.log(errors);
          this.setState({formErrors : errors});
      })
    }
    this.setState({hasSubmit : true});
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
            <FormError hasSubmit = {this.state.hasSubmit} error = {this.state.formErrors["login"]}/>
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
            <FormError hasSubmit = {this.state.hasSubmit} error = {this.state.formErrors["name"]}/>
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
            <FormError hasSubmit = {this.state.hasSubmit} error = {this.state.formErrors["password"]}/>
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
            <FormError hasSubmit = {this.state.hasSubmit} error = {this.state.formErrors["confirmedPassword"] + "\n"
              + this.state.formErrors["auth"] }/>
          <input className="form-submit" type="submit" value="Зарегистрировать"/>
          </form>
        </div>
      </div>
    );
  }
}
