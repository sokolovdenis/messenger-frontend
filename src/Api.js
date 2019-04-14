const api = 'http://messenger.westeurope.cloudapp.azure.com';


function signUp(login, password, name) {
    let model = {
        'login' : login,
        'password' : password,
        'name' : name
    };

    let url = api + '/api/authentication/signup';

    return fetch(url, {
        method : 'post',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(model)
    });
}

function signIn(login, password) {
    let model = {
        'login' : login,
        'password' : password
    };

    let url = api + '/api/authentication/signin';

    return fetch(url, {
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(model)
    });
}

function getSelfUser() {
    let url = api + '/api/users/me';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    });
}

function findUsersByName(query) {
    let url = api + '/api/users';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'query' : query
        },
        mode : 'no-cors'
    });
}

export { signUp, signIn, getSelfUser, findUsersByName };