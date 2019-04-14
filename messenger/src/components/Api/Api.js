const SERVER = 'http://messenger.westeurope.cloudapp.azure.com';
// Authentication
const API_SIGNIN = '/api/authentication/signin';
const API_SIGNUP = '/api/authentication/signup';
//Conversations
const API_CONVERSATIONS = '/api/conversations';
function get_user_conservartions(userId) {
    return `/api/conversations/${userId}/messages`;
}
const API_PUBLIC_CONVERSATIONS = 'api/conversations/public/messages';
//Users
function get_user_info(userId) {
    return `/api/users/${userId}`;
}
const API_ME_INFO = '/api/users/me';
const API_FIND_USER = '/api/users';

// Requests

function signIn(data) {
    return fetch(SERVER + API_SIGNIN, {
        method: 'post',
        body: JSON.stringify({login: data.email, password: data.password}),
        headers: { 'content-type': 'application/json' }
    }).then(response => response.json());
    // не забыть поймать искючения в месте где вызываю метод
}