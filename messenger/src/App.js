const axios = require('axios')

let x = JSON.stringify({
    login: "2113",
    password: "3q4",
    name: "3423asdasdasd4"
});

let y = JSON.parse(x)

axios({
    method: 'post',
    url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup',
    headers: {
        'content-type': 'application/json',
    },
    data: x
}).then(function (response) {
    console.log(response)
}).catch(function (error) {
    console.log(error.config)
});
