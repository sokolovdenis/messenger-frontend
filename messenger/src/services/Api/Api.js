const SERVER = 'http://messenger.westeurope.cloudapp.azure.com';
// Authentication
const API_SIGNIN = '/api/authentication/signin';
const API_SIGNUP = '/api/authentication/signup';
//Conversations
const API_CONVERSATIONS = '/api/conversations';
function get_user_conservartions(userId) {
    return `/api/conversations/${userId}/messages`;
}
const API_PUBLIC_MESSAGES = '/api/conversations/public/messages';
//Users
function get_user_info(userId) {
    return `/api/users/${userId}`;
}
const API_ME = '/api/users/me';
const API_FIND_USER = '/api/users';

function API_WEBSOCKET() {
    return 'ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token='+ getCurrentUser().token;
}

function fetchStatusCheck(response) {
    // console.log(response)
    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            // это ошибки связанные с авторизацией
            authenticationService.logout();
            // window.location.reload(true);
        }
        const error = response.text() || response.statusText;
        return Promise.reject(error);
    }
    return response.json();
  }

// Requests
export const authenticationService = {
    signIn,
    signUp,
    logout,
    getCurrentUser,
    getConversations,
    getPublicMessages,
    postPublicMessages,
    getPrivateMessages,
    postPrivateMessages,
    getMe,
    getUserInfo,
    findUsers,
    API_WEBSOCKET,
};

function signIn(login, password, remember) {
    return fetch(SERVER + API_SIGNIN, {
            method: 'post',
            body: JSON.stringify({login: login, password: password}),
            headers: { 'content-type': 'application/json' }
            })
        .then(fetchStatusCheck)
        .then(user => {
            // запоминаем пользователя
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('expires', user.expires);
            if (remember) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('expires', user.expires);
            }
            return user;
            })
        ;
    // не забыть поймать искючения в месте где вызываю метод
}

function signUp(login, password, name, remember) {
    return fetch(SERVER + API_SIGNUP, {
        method: 'post',
        body: JSON.stringify({login: login, password: password, name: name}),
        headers: { 'content-type': 'application/json' }
        })
    .then(fetchStatusCheck)
    .then(user => {
        // запоминаем пользователя
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('expires', user.expires);
        if (remember) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('expires', user.expires);
        }
        return user;
        })
    ;
    // не забыть поймать искючения в месте где вызываю метод
}

function logout() {
    // удаляем данные о пользователе из хранилища
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expires');
    if (localStorage.getItem('token') && localStorage.getItem('expires')) {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
    }
}

function getCurrentUser() { 
    // если в хранилище нет currentUser возвращается null
    if (sessionStorage.getItem('token') && sessionStorage.getItem('expires'))
        return {"token": sessionStorage.getItem('token'), 
                "expires": sessionStorage.getItem('expires')};
    else {
        if (localStorage.getItem('token') && localStorage.getItem('expires')) {
            sessionStorage.setItem('token', localStorage.getItem('token'));
            sessionStorage.setItem('expires', localStorage.getItem('expires'));
            return {"token": sessionStorage.getItem('token'), 
                    "expires": sessionStorage.getItem('expires')};
        }
        return null;
    }
}

function getConversations() {
    return fetch(SERVER + API_CONVERSATIONS, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
            })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}

function getPublicMessages() {
    return fetch(SERVER + API_PUBLIC_MESSAGES, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}

function postPublicMessages(message) {
    return fetch(SERVER + API_PUBLIC_MESSAGES, {
            method: 'post',
            body: JSON.stringify({content: message}),
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck)
        .then(function(json) {
            return [json, null]
        });
    // не забыть поймать искючения в месте где вызываю метод
}

function getPrivateMessages(id, from=0, count=9999) {
    var url = new URL(SERVER + get_user_conservartions(id)),
        params = { From: from, Count: count}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}

function postPrivateMessages(id, message) {
    return fetch(SERVER + get_user_conservartions(id), {
            method: 'post',
            body: JSON.stringify({content: message}),
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck)
        .then(function(json) {
            return [json, id]
        });
    // не забыть поймать искючения в месте где вызываю метод
}

function getMe() {
    return fetch(SERVER + API_ME, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}

function getUserInfo(id) {
    return fetch(SERVER + get_user_info(id), {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}

function findUsers(query) {
    return fetch(SERVER + API_FIND_USER + '?query=' + query, {
            method: 'get',
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + getCurrentUser().token }
        })
        .then(fetchStatusCheck);
    // не забыть поймать искючения в месте где вызываю метод
}
