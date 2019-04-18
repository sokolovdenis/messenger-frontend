import React from 'react';
import {HttpRequestSignUp} from '../HttpRequest'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', login: '', password: '' };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeLogin(event) {
        this.setState({ login: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.login);
        HttpRequestSignUp(this.state.login, this.state.password, this.state.name)
            .then(function (response) {
                if (response.status >= 200 && response.status <= 400) {
                    return response;
                }
                else {
                    var error = new Error(response.statusText)
                    error.response = response
                    throw error
                }
            })
            .then(function parseJSON(response) {
                return response.json()
            })
            .then((data) => {
                if (data.status === 400) {
                    if (typeof (data.errors.Name) != "undefined") {
                        document.getElementById("infoText-Name").innerHTML = data.errors.Name;
                    } else { document.getElementById("infoText-Name").innerHTML = ''; }
                    if (typeof (data.errors.Login) != "undefined") {
                        document.getElementById("infoText-Login").innerHTML = data.errors.Login;
                    } else { document.getElementById("infoText-Login").innerHTML = ''; }
                    if (typeof (data.errors.Password) != "undefined") {
                        document.getElementById("infoText-Password").innerHTML = data.errors.Password;
                    } else { document.getElementById("infoText-Password").innerHTML = ''; }
                }
                else{
                this.props.updateToken(data.token, data.expires);
                }

            }).catch(function (error) {
                /*if (error.status === 400) {
                    if (typeof (data.errors.Name) != "undefined") {
                        document.getElementById("infoText-Name").innerHTML = data.errors.Name;
                    } else { document.getElementById("infoText-Name").innerHTML = ''; }
                    if (typeof (data.errors.Login) != "undefined") {
                        document.getElementById("infoText-Login").innerHTML = data.errors.Login;
                    } else { document.getElementById("infoText-Login").innerHTML = ''; }
                    if (typeof (data.errors.Password) != "undefined") {
                        document.getElementById("infoText-Password").innerHTML = data.errors.Password;
                    } else { document.getElementById("infoText-Password").innerHTML = ''; }
                }
                else{
                document.getElementById("infoText").innerHTML = error;
                }*/
            })
    }

    render() {
        return (
            <form className="main" onSubmit={this.handleSubmit} >
                    <div id="login-form" className="element">
                        <div className="login-form-element">
                            <h2 id="login-form-h2">
                                Регистрация
                        </h2>
                        </div>
                        <div className="login-form-element">
                            <input id="name"
                                name="name"
                                placeholder="Имя"
                                type="text"
                                className="inputText"
                                value={this.state.name}
                                onChange={this.handleChangeName} />
                        </div>
                        <div className="login-form-element">
                            <label id="infoText-Name" className="infoText"></label>
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
                            <label id="infoText-Login" className="infoText"></label>
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
                            <label id="infoText-Password" className="infoText"></label>
                        </div>
                        <div className="login-form-element">
                            <label id="infoText" className="infoText"></label>
                        </div>
                        <div className="login-form-element">
                            <input id="submitButton" type="submit" value="Создать аккаунт" />
                        </div>
                        <div className="login-form-element">
                            <button type="button"  className="link-button" onClick={this.props.onClick}>
                            Уже есть аккаунт? Выполните вход
                            </button>
                        </div>
                    </div>
            </form>
        );
    }
}


export default Signup;