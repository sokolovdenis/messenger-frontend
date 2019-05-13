const api = 'http://messenger.westeurope.cloudapp.azure.com/';

export function postPublicMessage(content) {
    let url = api + 'api/conversations/public/messages';
    let token = localStorage.getItem("token");

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
            console.log("Message is posted");
        } else {
            console.log("Error while posting public msg");
        }
    });
}

export function postPrivateMessage(user_id, content) {
    let url = api + `api/conversations/${user_id}/messages`;
    let token = localStorage.getItem("token");

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
            console.log("Message is posted");
        } else {
            console.log("Error while posting private msg");
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
    }).then(function (response){
        if(response.status >= 200 && response.status <= 299)
            return response.json();
        else {
            console.log('error');
            localStorage.token = "";
        }
    });
}

export function getPrivateMessages(token, user_id, from, count) {
    let url = api + `api/conversations/${user_id}/messages?from=${from}&count=${count}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(function (response){
        if(response.status >= 200 && response.status <= 299)
            return response.json();
        else
            console.log('error');
    });
}

export function getUser(user_id) {
    let url = api + `api/users/${user_id}`;
    let token = localStorage.getItem("token");
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
        if(response.status >= 200 && response.status <= 299) {
            console.log("All correct");
            return response.json();
        }
        else {
            console.log('error');
            return "";
        }
    });
}

export function getUserByName(user_name) {
    let url = api + `api/users?query=${user_name}`;
    let token = localStorage.getItem("token");
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
        if(response.status >= 200 && response.status <= 299) {
            console.log("All correct");
            return response.json();
        }
        else {
            console.log('error');
        }
    });
}

export function getPrivateChat(user_id, from, count) {
    let url = api + `api/conversations/${user_id}/messages?from=${from}&count=${count}`;
    let token = localStorage.getItem("token");
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
        if(response.status >= 200 && response.status <= 299) {
            console.log("All correct");
            return response.json();
        }
        else {
            console.log('error');
            localStorage.token = "";
        }
    });
}

export function getAllChats() {
    let url = api + `api/conversations`;
    let token = localStorage.getItem("token");
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).then(response => {
        if(response.status >= 200 && response.status <= 299) {
            console.log("All correct");
            return response.json();
        }
        else {
            console.log('error');
            localStorage.token = "";
        }
    });
}

export function signin(login, password) {
    let model = {
        "login": login,
        "password": password,
    };

    let url = api + 'api/authentication/signin';

    console.log(model);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            // this.setState({'token': response.token});
            console.log("All correct");
            return response.json();
        } else {
            console.log("We have some bugs, try later");
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
            // this.setState({'token': response.token});
            console.log("All correct");
            return response.json();
        } else {
            console.log("We have some bugs, try later");
        }
    }).then(json => {
        return json.token;
    });
}