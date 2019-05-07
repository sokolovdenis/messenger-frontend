const axios = require('axios')
const react = require('react')

import React from 'react'
import ReactDom from 'react-dom'
import "./App.css"

import {HashRouter, Link, Route, NavLink} from 'react-router-dom'

let Router = HashRouter;

const api = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/'

const Home = () => (
    <div>
        <h1>Welcome to the Tornadoes Website!</h1>
    </div>
)

class SignIn extends React.Component {

    constructor(props) {
        super(props);
    }

    errorMsg() {
        return (
            <div>
                <h1>Error MSG!</h1>
            </div>);
    }

    // Возвращает: token, время истечения token
    async signIn(event) {
        event.preventDefault();
        var badLoginPath = "/bad-login";
        var token;
        var tokenExpired;
        var login = this.refs.login.value;
        var password = this.refs.password.value;

        // Путь /sign-in/bad-login => возвращаемся к /sign-in
        if (location.href.endsWith(badLoginPath)) {
            location.href = location.href.replace(badLoginPath, '');
        }

        function onFulfied(response) {
            token = response.data.token;
            tokenExpired = response.data.expires;
        }

        function onReject(error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`);
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
        }).then(onFulfied, onReject);
    }


    render() {

        return (
            <Router>
                <form className="Form" onSubmit={this.signIn.bind(this)}>
                    <Route exact path="/sign-in/bad-login" render={this.errorMsg}/>
                    <input type="text" ref="login" placeholder="Login" className="FiledToFill" required/>
                    <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                    <input type="submit" value="Go!" className="Go"/>
                    <Link to="/">
                        <button className="Go">SignUp</button>
                    </Link>
                </form>
            </Router>
        );
    }

}

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    errorMsg() {
        return (
            <div>
                <h1>Error MSG!</h1>
            </div>);
    }

    // Возвращает: token, время истечения token
    async signUp(event) {
        event.preventDefault();
        var badLoginPath = "bad-login";
        var token;
        var tokenExpired;
        var login = this.refs.login.value;
        var password = this.refs.password.value;
        var name = this.refs.name.value;

        // Путь /sign-in/bad-login => возвращаемся к /sign-in
        if (location.href.endsWith(badLoginPath)) {
            location.href = location.href.replace(badLoginPath, '');
        }

        function onFulfied(response) {
            token = response.data.token;
            tokenExpired = response.data.expires;
        }

        function onReject(error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
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
        }).then(onFulfied, onReject);
    }

    render() {

        return (
            <Router>
                <form className="Form" onSubmit={this.signUp.bind(this)}>
                    <Route exact path="/bad-login" render={this.errorMsg}/>
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
                    <Route exact path="/" component={SignUp}/>
                    <Route path="/sign-in" component={SignIn}/>
                </div>
            </Router>
        )

    }

    // // TODO: повесить callback на кнопку
    // // Возвращает: token, время истечения token
    // signUp(login, password, name) {
    //     var token;
    //     var tokenExpired;
    //
    //     function onFulfied(response) {
    //         console.log(`SignIn!`);
    //         token = response.data.token;
    //         tokenExpired = response.data.expires;
    //     }
    //
    //     function onReject(error) {
    //         console.log(`Error: ${error.response.status} : ${error.response.data}`)
    //     }
    //
    //     axios({
    //         method: 'post',
    //         url: api + 'signup',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         data: {
    //             login: login,
    //             password: password,
    //             name: name
    //         }
    //     }).then(token, tokenExpired);
    // }
    //
    // async signIn(login, password) {
    //
    //     var token;
    //     var tokenExpired;
    //
    //     function onFulfied(response) {
    //         console.log(`SignIn!`);
    //         token = response.data.token;
    //         tokenExpired = response.data.expires;
    //     }
    //
    //     function onReject(error) {
    //         console.log(`Error: ${error.response.status} : ${error.response.data}`)
    //     }
    //
    //     await axios({
    //         method: 'post',
    //         url: api + 'signin',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         data: {
    //             login: login,
    //             password: password
    //         }
    //     }).then(onFulfied, onReject);
    //
    //     this.state.token = token;
    //     this.state.tokenExpire = tokenExpired;
    // }
}

export {App}