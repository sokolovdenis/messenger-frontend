const api = 'http://messenger.westeurope.cloudapp.azure.com/';

export function postPublicMessage(token, content) {
    let url = api + 'api/conversations/public/messages';

    let model = {
        "content": content,
    };

    return fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            console.log("postPublicMessage Ok");
        } else {
            console.log("postPublicMessage Not Ok");
        }
    });
}


export function getPublicMessages(token, from, count) {
    let url = api + `api/conversations/public/messages?from=${from}&count=${count}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
            if (response.status >= 200 && response.status <= 299) {
                console.log("getPublicMessagesOK");
                return response.json();
            } else {
                console.log("getPublicMessages not OK");
            }
        })
}



export function signin(login, password) {
    let model = {
        "login": login,
        "password": password,
    };

    let url = api + 'api/authentication/signin';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            console.log("signin OK");
            return response.json();
        } else {
            console.log("signin Not OK");
        }
    }).then(json => {
        console.log(json.token);
        return json.token;
    } );
}

export function signup(login, password, name) {
    let model = {
        "login": login,
        "password": password,
        "name": name,
    };

    let url = api + 'api/authentication/signup';

    console.log(model);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    }).then(function (response) {
        if (response.status >= 200 && response.status <= 299) {
            console.log("Signup OK");
            return response.json();
        } else {
            console.log("Signup not OK");
        }
    }).then(json => {
        return json.token;
    });
}

export function getUserInfo(userId) {

    let url = api + `api/users/${userId}`;

    let token = localStorage.getItem("token");

    return fetch(url, {
        method: "GET",
        headers:  {
            "Authorization": `Bearer ${token}`,
            'content-type': 'application/json'
        }
    })
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                console.log("GetUserInfo OK");
                return response.json();
            } else {
                console.log("GetUserInfo not OK");
            }
        })
}