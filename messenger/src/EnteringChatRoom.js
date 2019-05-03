const axios = require('axios')
const react = require('react')

const api = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/'

// Класс процедуры регистрации
class EnteringChatRoom extends react.Component {
    constructor(props) {
        super(props);
        this.token = null;
        this.tokenExpired = null;
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

        this.token = token;
        this.tokenExpire = tokenExpired;
    }
}

let entering = new EnteringChatRoom()
let login = 'ggggg'

//entering.signUp(login, login, login)
entering.signIn(login, login)