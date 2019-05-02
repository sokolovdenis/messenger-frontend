const axios = require('axios')
const react = require('react')

const api = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/'

// Класс процедуры регистрации
class EnteringChatRoom extends react.Component {
    constructor(props) {
        super(props);
        this.token = null;
        this.tokenExpire = null;
    }

    // TODO: повесить callback на кнопку
    // Возвращает: token, время истечения token
    signUp(login, password, name) {
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
        }).then(function (response) {
            response = JSON.parse(response)
            console.log(`SignUp!`);
            this.token = response.data.token;
            this.tokenExpire = response.data.expires;
        }).catch(function (error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
        });
    }

    signIn(login, password) {
        return axios({
            method: 'post',
            url: api + 'signin',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                login: login,
                password: password
            }
        }).then(function (response) {
            console.log(`SignIn!`);
            // TODO: исправить падение
            this.token = 1;
            let x = response.data.token;
            this.token = x;
            this.tokenExpire = response.data.expires;
        }).catch(function (error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
        });
    }

    getToken() {
        return this.token;
    }
}


let entering = new EnteringChatRoom()
let login = 'ggggg'

//entering.signUp(login, login, login)
entering.signIn(login, login)
console.log(entering.getToken())