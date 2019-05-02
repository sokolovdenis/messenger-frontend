const axios = require('axios')
const react = require('react')

// Класс процедуры регистрации
class EnteringChatRoom extends react.Component {
    constructor(props) {
        super(props)
    }

    // TODO: повесить callback на кнопку
    // Возвращает: token, время истечения token
    signUp(login, password, name) {
        axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup',
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
            return {
                token: response.token,
                tokenExpire: response.expires
            }
        }).catch(function (error) {
            console.log(`Error: ${error.response.status} : ${error.response.data}`)
        });
    }

    signIn() {

    }
}

let entering = new EnteringChatRoom()
entering.signUp("134", "567", "890")