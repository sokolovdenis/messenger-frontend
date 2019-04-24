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
    let url = api + '/api/users?query=' + query;

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    });
}

function getUser(id) {
    let url = api + '/api/users/' + id;

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'id' : id
        }
    });
}

function getAllConversations() {
    let url = api + '/api/conversations';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
    });
}

function getPublicConversation(from, count) {
    let url = api + '/api/conversations/public/messages';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'From' : from,
            'Count' : count
        }
    });
}

function getPrivateConversation(userId, from, count) {
    let url = api + '/api/conversations/' + userId + '/messages';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'userId' : userId,
            'From' : from,
            'Count' : count
        }
    });
}

function sendMessageToPublicConversation(request) {
    let model = {
        'content' : request
    };

    let url = api + '/api/conversations/public/messages';

    return fetch(url, {
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
        body : JSON.stringify(model)
    });
}

function sendMessageToPrivateConversation(userId, request) {
    let model = {
        'content' : request
    };

    let url = api + '/api/conversations/' + userId + '/messages';

    return fetch(url, {
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'userId' : userId
        },
        body : JSON.stringify(model)
    });
}

export { signUp, signIn, getSelfUser, findUsersByName, getUser,
    getAllConversations, getPublicConversation, getPrivateConversation,
    sendMessageToPublicConversation, sendMessageToPrivateConversation};