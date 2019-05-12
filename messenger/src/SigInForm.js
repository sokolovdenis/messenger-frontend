const axios = require('axios')
const react = require('react')

import React from 'react'
import ReactDom from 'react-dom'
import "./App.css"

import {HashRouter, Link, Route, NavLink} from 'react-router-dom'

let Router = HashRouter;

const api = 'http://messenger.westeurope.cloudapp.azure.com/api/';
const chat = "/chat";
const sign_in = '/sign-in';
const sign_up = '/sign-up';

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
        var chat = "/chat";
        var login = this.refs.login.value;
        var password = this.refs.password.value;

        // Путь /sign-in/bad-login => возвращаемся к /sign-in
        if (location.href.endsWith(badLoginPath)) {
            location.href = location.href.replace(badLoginPath, '');
        }

        function onFulfied(response) {
            console.log("Successful signin!");
            this.setState(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );

            this.props.saveToken(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );

            location.href = location.href.replace(sign_in, '');
            location.href += chat;
        }

        function onReject(error) {
            location.href += badLoginPath;
        }

        await axios({
            method: 'post',
            url: api + 'authentication/signin',
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
                <div className="Main">
                    <h1 style={{textAlign: "center"}}>Chat</h1>
                    <form className="Form" onSubmit={this.signIn.bind(this)}>
                        <Route exact path="/sign-in/bad-login" render={this.errorMsg}/>
                        <input type="text" ref="login" placeholder="Login" className="FiledToFill" required/>
                        <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                        <input type="submit" value="Go!" className="Go"/>
                        <Link to="/sign-up">
                            <button className="Go">SignUp</button>
                        </Link>
                    </form>
                </div>
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
                <div className="Main">
                    <h1 style={{textAlign: "center"}}>Chat</h1>
                    <div>
                        <Link to="/sign-up">
                            <button className="Go">SignUp</button>
                        </Link>
                        <Link to="/sign-in">
                            <button className="Go">SignIn</button>
                        </Link>
                    </div>
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
            console.log("Successful signup!");

            this.setState(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );

            this.props.saveToken(
                {
                    token: response.data.token,
                    tokenExpired: response.data.expires
                }
            );

            location.href = location.href.replace(sign_up, '');
            location.href += chat;
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
            url: api + 'authentication/signup',
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
                <div className="Main">
                    <h1 style={{textAlign: "center"}}>Chat</h1>
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
                </div>
            </Router>

        );
    }

}

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            id: null
        };
        this.getName();
    }

    async getName() {

        function onFulfied(response) {
            console.log("Successful get!");

            this.setState(
                {
                    token: response.data.name,
                    tokenExpired: response.data.id
                }
            );

        }

        function onReject(error) {
            console.log("Error!")
        }

        await axios({
            method: 'post',
            url: api + 'users/me',
            headers: { Authorization: `Bearer ${this.props.tokenInfo.token}` }
        }).then(onFulfied.bind(this), onReject.bind(this));
    }

    render() {

        return (
            <Router>
                <div className="ChatRoom" align="center">
                        this.state.name
                </div>
            </Router>

        );
    }

}

// Класс процедуры регистрации
class App extends react.Component {



    constructor(props) {
        super(props);

        this.state = {
            token: null,
            tokenExpired: null
        }
    }

    saveToken = (tokenInfo) => {
        this.setState(tokenInfo);
    };

    render() {

        return (
            <Router>
                <Route exact path="/" component={Entering}/>
                <Route path="/chat" render={(props) => <ChatRoom tokenInfo={this.state} {...props}/>} />
                <Route path="/sign-in" render={(props) => <SignIn saveToken={this.saveToken} {...props}/>}/>
                <Route path="/sign-up" render={(props) => <SignUp saveToken={this.saveToken} {...props}/>}/>
            </Router>
        )

    }
}

export {App}