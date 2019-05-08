const axios = require('axios')
const react = require('react')

import React from 'react'
import ReactDom from 'react-dom'
import "./App.css"

import {HashRouter, Link, Route, NavLink} from 'react-router-dom'

let Router = HashRouter;

const api = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/'


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            tokenExpired: null
        }
    }

    errorMsg() {
        return (<div>Incorrect login or password!</div>);
    }

    // Возвращает: token, время истечения token
    async signIn(event) {
        event.preventDefault();
        var badLoginPath = "/bad-login";

        var login = this.refs.login.value;
        var password = this.refs.password.value;

        // Путь /sign-in/bad-login => возвращаемся к /sign-in
        if (location.href.endsWith(badLoginPath)) {
            location.href = location.href.replace(badLoginPath, '');
        }

        function onFulfied(response) {
            this.setState(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );
        }

        function onReject(error) {
            location.href += badLoginPath;
        }

        await axios({
            method: 'post',
            url: api + 'signin',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                login: login,
                password: password
            }
        }).then(onFulfied.bind(this), onReject);
    }


    render() {

        return (
            <Router>
                <form className="Form" onSubmit={this.signIn.bind(this)}>
                    <Route exact path="/sign-in/bad-login" render={this.errorMsg}/>
                    <input type="text" ref="login" placeholder="Login" className="FiledToFill" required/>
                    <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                    <input type="submit" value="Go!" className="Go"/>
                    <Link to="/sign-up">
                        <button className="Go">SignUp</button>
                    </Link>
                </form>
            </Router>
        );
    }

}

class Entering extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Link to="/sign-up">
                        <button className="Go">SignUp</button>
                    </Link>
                    <Link to="/sign-in">
                        <button className="Go">SignIn</button>
                    </Link>
                </div>
            </Router>

        );
    }

}

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorStatus: null,
            login: null,
            password: null,
            name: null
        }
    }

    errorMsg() {
        switch (this.state.errorStatus) {
            case 400: {
                return (<div>Login name or password has the wrong length!</div>);
            }
            case 409: {
                return (<div>Record already exists!</div>);
            }
        }
    }

    // Возвращает: token, время истечения token
    async signUp(event) {
        event.preventDefault();
        var badLoginPath = "/bad-login";
        var login = this.refs.login.value;
        var password = this.refs.password.value;
        var name = this.refs.name.value;

        // Путь /sign-up/bad-login => возвращаемся к /sign-up
        if (location.href.endsWith(badLoginPath)) {
            location.href = location.href.replace(badLoginPath, '');
        }

        function onFulfied(response) {
            this.setState(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );
        }

        function onReject(error) {
            this.setState(
                {
                    errorStatus: error.response.status,
                }
            );

            location.href += badLoginPath;
        }

        await axios({
            method: 'post',
            url: api + 'signup',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                login: login,
                password: password,
                name: name
            }
        }).then(onFulfied.bind(this), onReject.bind(this));
    }

    render() {
        return (
            <Router>
                <form className="Form" onSubmit={this.signUp.bind(this)}>
                    <Route exact path="/sign-up/bad-login" render={this.errorMsg.bind(this)}/>
                    <input type="text" ref="login" placeholder="Login" className="FiledToFill" required/>
                    <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                    <input type="name" ref="name" placeholder="Name" className="FiledToFill" required/>
                    <input type="submit" value="Go!" className="Go"/>
                    <Link to="/sign-in">
                        <button className="Go">SignIn</button>
                    </Link>
                </form>
            </Router>

        );
    }

}

// Класс процедуры регистрации
class App extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            login: "",
            password: "",
            token: null,
            tokenExpired: null
        }
    }

    render() {

        return (
            <Router>
                <div className="Main">
                    <h1 style={{textAlign: "center"}}>Chat</h1>
                    <Route exact path="/" component={Entering}/>
                    <Route path="/sign-in" component={SignIn}/>
                    <Route path="/sign-up" component={SignUp}/>
                </div>
            </Router>
        )

    }
}

export {App}