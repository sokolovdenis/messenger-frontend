import { Component } from 'react';
import {tokenStr, expiresStr} from './Constants';
import API from './Api';

function storageHasValidToken(storage) {
    return storage.getItem(tokenStr) && (Date(storage.getItem(expiresStr)) > Date.new());
}

function token() {
    if(storageHasValidToken(sessionStorage)) {
        return sessionStorage.getItem(tokenStr);
    } else if(storageHasValidToken(localStorage)) {
        return localStorage.getItem(tokenStr);
    }
    return null;
}

function logoutFromStorage(storage) {
    if(storage.getItem(tokenStr)) {
        storage.removeItem(tokenStr);
        storage.removeItem(expiresStr);
    }
}

function saveUser(token, expires, storage) {
    storage.setItem(tokenStr, token);
    storage.setItem(expiresStr, expires);
}

function errorMessageFromStatus(errorStatus) {
    switch(errorStatus) {
        case 400:
            return "Некорректные логин/пароль."
        case 409:
            return "Пользователь с таким логином уже существует."
        default:
            return "Непредвиденная ошибка. Попробуйте снова."
    }
}

function auth(auth, login, password, name, remember = false ) {

    fetch(name ? API.sign_up : API.sign_in, {
        method: 'POST',
        body: JSON.stringify(name ? {login, name, password} : {login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.status === 200) {
            let user = res.json;
            saveUser(user.token, user.expires, sessionStorage);
            if(remember) {
                saveUser(user.token, user.expires, localStorage);
            }
        } else {
            auth.setState({ authError : errorMessageFromStatus(res.status) } );
        }
    })
}

export default class AuthService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authError : ""
        };
        this.Register = this.Register.bind(this);
        this.Login = this.Login.bind(this);
        this.IsLoggedIn = this.IsLoggedIn.bind(this);
        this.Logout = this.Logout.bind(this);
        this.Fetch = this.Fetch.bind(this);
    }

    Register(login, password, name) {
        auth(this, login, password, name);
    }

    Login(login, password, remember) {
        auth(this, login, password, null, remember);
    }

    IsLoggedIn() {
        return token() !== null;
    }
    
    Logout() {
        logoutFromStorage(sessionStorage);
        logoutFromStorage(localStorage);
    }

    Fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.token();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json)
    }
}