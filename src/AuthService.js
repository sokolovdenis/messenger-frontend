import { Component } from 'react';
import {tokenStr, expiresStr} from './Constants';
import API from './Api';

function storageHasValidToken(storage) {
    return storage.getItem(tokenStr) && (new Date((storage.getItem(expiresStr))) > Date.now());
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

function checkStatus(res) {
    if(res.status !== 200) {
        throw res.status;
    }

    return res.json();
}

function auth(login, password, name, remember = false ) {
    return fetch(name ? API.sign_up : API.sign_in, {
        method: 'POST',
        body: JSON.stringify(name ? {login, name, password} : {login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(checkStatus)
    .then(user => {
        saveUser(user.token, user.expires, sessionStorage);
        if(remember) {
            saveUser(user.token, user.expires, localStorage);
        }
    })
}

export default class AuthService extends Component {
    constructor(props) {
        super(props)
        this.Register = this.Register.bind(this);
        this.Login = this.Login.bind(this);
        this.IsLoggedIn = this.IsLoggedIn.bind(this);
        this.Logout = this.Logout.bind(this);
        this.Fetch = this.Fetch.bind(this);
    }

    Register(login, password, name) {
        return auth(login, password, name);
    }

    Login(login, password, remember) {
        return auth(login, password, null, remember);
    }

    IsLoggedIn() {
        return token() !== null;
    }
    
    Logout() {
        logoutFromStorage(sessionStorage);
        logoutFromStorage(localStorage);
        
        this.props.history.replace("/")
    }

    Fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.IsLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + token();
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(checkStatus);
    }
}