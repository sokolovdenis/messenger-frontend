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
        this.tmp = 'SignUp';
    }

    handleSignUp(e) {
        e.preventDefault()
        console.log("handleSignUp");
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.onSignIn(username, password)
    }

    render() {

        this.tmp = 'SignIn';
        console.log('SignUp2');
        return (
            <form className="Form" onSubmit={this.handleSignUp.bind(this)}>
                <input type="text" ref="Login" placeholder="Login" className="FiledToFill" required/>
                <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                <input type="submit" value="Go!" className="Go"/>
                <Link to="/"><input type="submit" value="SignUp" className="Go"/></Link>
            </form>
        );
    }


}

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSignUp(e) {
        e.preventDefault()
        console.log("handleSignUp");
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.onSignIn(username, password)
    }

    render() {

        this.tmp = 'SignIn';
        console.log('SignUp2');
        return (
            <Router>
                <form className="Form" onSubmit={this.handleSignUp.bind(this)}>
                    <input type="text" ref="Login" placeholder="Login" className="FiledToFill" required/>
                    <input type="password" ref="password" placeholder="Password" className="FiledToFill" required/>
                    <input type="name" ref="name" placeholder="Name" className="FiledToFill" required/>
                    <input type="submit" value="Go!" className="Go"/>
                    <Link to="/sign-in"><input type="submit" value="SignIn" className="Go"/></Link>
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