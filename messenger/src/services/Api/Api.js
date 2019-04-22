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
    getMe,
    getUserInfo,
};

function signIn(login, password) {
    return fetch(SERVER + API_SIGNIN, {
            method: 'post',
            body: JSON.stringify({login: login, password: password}),
            headers: { 'content-type': 'application/json' }
            })
        .then(fetchStatusCheck)
        .then(user => {
            // запоминаем пользователя
            localStorage.setItem('token', user.token);
            localStorage.setItem('expires', user.expires);
            return user;
            })
        ;
    // не забыть поймать искючения в месте где вызываю метод
}

function signUp(name, login, password) {
    return null;
}

function logout() {
    // удаляем данные о пользователе из хранилища
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
}

function getCurrentUser() { 
    // если в хранилище нет currentUser возвращается null
    if (localStorage.getItem('token') && localStorage.getItem('expires'))
        return {"token": localStorage.getItem('token'), 
                "expires": localStorage.getItem('expires')};
    else
        return null;
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
        .then(fetchStatusCheck);
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