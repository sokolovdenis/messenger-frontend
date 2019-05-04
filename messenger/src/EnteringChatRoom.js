const axios = require('axios')
const react = require('react')

import React from 'react'
import ReactDom from 'react-dom'
import "./App.css"


const api = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/'

const Welcome = ({user, onSignOut})=> {

    return (
        <div style={{textAlign:"center",fontSize:30}}>
            <strong>{user.username}</strong>!<br />

            <a href="javascript:;" onClick={onSignOut}>Sign out</a>
        </div>
    )
}

class LoginForm extends React.Component {

    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.props.onSignIn(username, password)
    }

    render() {

        return (
            <form onSubmit={this.handleSignIn.bind(this)}>
                <input type="text" ref="Login" placeholder="Login" className="waves-effect waves-light Login" required/>
                <input type="password" ref="password" placeholder="Password" className="waves-effect waves-light Login" required/>
                <input type="submit" value="SignIn" className="SignIn"/>
            </form>
        )
    }

}

// Класс процедуры регистрации
class EnteringChatRoom extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            login: "",
            password: "",
            token : null,
            tokenExpired : null
        }
    }

    signIn(username, password) {

        this.setState({
            user: {
                username,
                password,
            }
        })
    }

    signOut() {

        this.setState({user: null})
    }

    render() {

        return (
            <div className="Main">
                <h1 style={{textAlign:"center"}}>Chat</h1>
                {
                    (this.state.login) ?
                        <Welcome
                            user={this.state.login}
                            onSignOut={this.signOut.bind(this)}
                        />
                        :
                        <LoginForm
                            onSignIn={this.signIn.bind(this)}
                        />
                }
            </div>
        )

    }

    // TODO: повесить callback на кнопку
    // Возвращает: token, время истечения token
    signUp(login, password, name) {
        var token;
        var tokenExpired;

        function onFulfied(response) {
            console.log(`SignIn!`);
            token = response.data.token;
            tokenExpired = response.data.expires;
        }

        function onReject(error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
        }

        axios({
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
        }).then(token, tokenExpired);
    }

    async signIn(login, password) {

        var token;
        var tokenExpired;

        function onFulfied(response) {
            console.log(`SignIn!`);
            token = response.data.token;
            tokenExpired = response.data.expires;
        }

        function onReject(error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
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

        this.state.token = token;
        this.state.tokenExpire = tokenExpired;
    }
}

export {EnteringChatRoom}