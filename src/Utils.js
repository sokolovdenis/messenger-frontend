import API from './Api'

import {tokenStr, expiresStr} from './Constants'

function processSignResponce(res) {
    console.log( res );
    if(res.status !== 200) {
        // process errors;
    }
    return res.json();
}

function saveUser(token, expires, storage) {
    storage.setItem(tokenStr, token);
    storage.setItem(expiresStr, expires);
}

export function Auth(login, password, name, remember = false ) {
    fetch(name ? API.sign_up : API.sign_in, {
        method: 'POST',
        body: JSON.stringify(name ? {login, name, password} : {login, password}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(processSignResponce)
    .then(user => {
        saveUser(user.token, user.expires, sessionStorage);
        if(remember) {
            saveUser(user.token, user.expires, localStorage);
        }
    })
    .catch( err => {
      console.error(err);
      alert('Error logging in please try again');
    });
}