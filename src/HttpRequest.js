
const rootAPI = "http://messenger.westeurope.cloudapp.azure.com/api/";
const signinAPI = 'authentication/signin';
const signupAPI = 'authentication/signup';
const userInfoAPI = 'users/';
const conversations = 'conversations';
const findUsers = 'users';
/*
export function signInUser(email, password) {
    return fetch(API_ROOT + SIGN_IN, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
*/
export function HttpRequestSignIn(login, password) {
    return fetch(rootAPI + signinAPI,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    login: login,
                    password: password,
                })
        });
}


export function HttpRequestSignUp(login, password, name) {
    return fetch(rootAPI + signupAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                login: login,
                password: password,
                name: name
            })
    });
}

export function HttpRequestUserInfo(userid, token) {
    return fetch(rootAPI + userInfoAPI + userid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}


export function HttpRequestGetMessage(userid, token, from, count) {
    /* Count берет с первые, а не последние, пока выключаем */
    return fetch(rootAPI + 'conversations/' + userid + '/messages?From='+from+'&Count='+count, { /* '/messages?Count='+count */
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export function HttpRequestPostMessage(userid, token, content) {
    return fetch(rootAPI + 'conversations/' + userid + '/messages',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {
                    content: content
                })
        });
}

export function HttpRequestGetConversations(token) {
    return fetch(rootAPI + conversations, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export function HttpRequestFIndUsers(findName, token) {
    return fetch(rootAPI + findUsers + '?query='+findName, { /* '/messages?Count='+count */
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}