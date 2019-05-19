const SERVER = 'http://messenger.westeurope.cloudapp.azure.com';
const SIGNIN = '/api/authentication/signin';
const SIGNUP = '/api/authentication/signup';
const CONVERSATIONS = '/api/conversations';
const MESSAGES = '/api/conversations/public/messages';
const ME = '/api/users/me';
const USERS = '/api/users';


function get_user_conservartions(userId) {
    return `/api/conversations/${userId}/messages`;
}

function get_user_info(userId) {
    return `/api/users/${userId}`;
}

function get_websocket() {
    return `ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=`+ get_current_user().token;
}

function fetch_status_check(response) {
    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            logout();
        }
        const error = response.text() || response.statusText;
        return Promise.reject(error);
    }
    return response.json();
}

function sign_in(login, password) {
    return fetch(SERVER + SIGNIN, {
        method: 'post',
        body: JSON.stringify({login: login, password: password}),
        headers: { 'content-type': 'application/json' }
    })
        .then(fetch_status_check)
        .then(user => {
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('expires', user.expires);
            return user;
        })
        ;
}

function sign_up(login, password, name) {
    return fetch(SERVER + SIGNUP, {
        method: 'post',
        body: JSON.stringify({login: login, password: password, name: name}),
        headers: { 'content-type': 'application/json' }
    })
        .then(fetch_status_check)
        .then(user => {
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('expires', user.expires);
            return user;
        });
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expires');
}

function get_current_user() {
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

function get_conversations() {
    return fetch(SERVER + CONVERSATIONS, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

function get_public_messages() {
    return fetch(SERVER + MESSAGES, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

function post_public_messages(message) {
    return fetch(SERVER + MESSAGES, {
        method: 'post',
        body: JSON.stringify({content: message}),
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check)
        .then(function(json) {
            return [json, null]
        });
}

function get_private_messages(id, from=0, count=9999) {
    let url = new URL(SERVER + get_user_conservartions(id));
    let params = { From: from, Count: count};

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

function post_private_messages(id, message) {
    return fetch(SERVER + get_user_conservartions(id), {
        method: 'post',
        body: JSON.stringify({content: message}),
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check)
        .then(function(json) {
            return [json, id]
        });
}

function get_me() {
    return fetch(SERVER + ME, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

function get_user(id) {
    return fetch(SERVER + get_user_info(id), {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

function find_users(query) {
    return fetch(SERVER + USERS + '?query=' + query, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + get_current_user().token }
    })
        .then(fetch_status_check);
}

export {
    logout,
    sign_in,
    sign_up,
    get_current_user,
    get_conversations,
    get_public_messages,
    post_public_messages,
    get_private_messages,
    post_private_messages,
    get_me,
    get_user,
    find_users,
    get_websocket,
};
