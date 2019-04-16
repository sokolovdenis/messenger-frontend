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
export const authenticationService = {
    signIn,
    signUp,
    logout,
    getCurrentUser
};

function signIn(login, password) {
    return fetch(SERVER + API_SIGNIN, {
            method: 'post',
            body: JSON.stringify({login: login, password: password}),
            headers: { 'content-type': 'application/json' }
        }).then(response => {
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // это ошибки связанные с авторизацией
                    authenticationService.logout();
                    window.location.reload(true);
                }
                const error = response.text() || response.statusText;
                return Promise.reject(error);
            }

            return response.json();
        }).then(user => {
            // запоминаем пользователя
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
    // не забыть поймать искючения в месте где вызываю метод
}

function signUp(name, login, password) {
    return null;
}

function logout() {
    // удаляем данные о пользователе из хранилища
    localStorage.removeItem('currentUser');
}

function getCurrentUser() { 
    // если в хранилище нет currentUser возвращается null
    return localStorage.getItem('currentUser'); 
}