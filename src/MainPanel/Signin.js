import React from 'react';
import { HttpRequestSignIn } from '../HttpRequest'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', 
                    password: ''
                    };

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({ login: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        HttpRequestSignIn(this.state.login, this.state.password)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    /*  var error = new Error(response.statusText);*/
                    /* var error.response = response;*/
                    throw response;
                }
            })
            .then((data) => {
                /*Получили токен*/
                /*localStorage.setItem("token", data.token);
                localStorage.setItem("expires", data.expires);*/
                /* нужно что-то делать! */
                this.props.updateToken(data.token, data.expires);
            })
            .catch((error) => {
                console.log(error);
                if (error.statusText === undefined) {
                    /* Явно вернулся не JSON */
                    alert('Ошибка API (наверное)');
                    console.log(error);
                } else {
                    error.text().then(errorMessage => {
                        document.getElementById("infoText").innerHTML = errorMessage;
                    })
                }
            })
    }

    render() {
        return (
            <form className="main" onSubmit ={this.handleSubmit}>
                    <div className="login-form-element">
                        <h2 id="login-form-h2">
                            Вход
                        </h2>
                    </div>
                    <div className="login-form-element">
                        <input id="login"
                            name="login"
                            placeholder="Логин"
                            type="text"
                            className="inputText"
                            value={this.state.login}
                            onChange={this.handleChangeLogin} />
                    </div>
                    <div className="login-form-element">
                        <input id="password"
                            name="password"
                            placeholder="Пароль"
                            type="password"
                            className="inputText"
                            value={this.state.password}
                            onChange={this.handleChangePassword} />
                    </div>
                    <div className="login-form-element">
                        <label id="infoText" className="infoText"></label>
                    </div>
                    <div className="login-form-element">
                        <input id="submitButton" type="submit" value="Войти"  />
                    </div>
                    <div className="login-form-element">
                        <button type="button"  className="link-button" onClick={this.props.onClick}>
                            Впервые? Создайте аккаунт!
                            </button>
                    </div>
            </form>
        );
    }
}

export default Signin;