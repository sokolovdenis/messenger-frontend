function LoadPublicMessages() {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages";
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    })
}

function LoadUserMessages(id) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/" + id + "/messages";
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    }).then(messages => {
        return messages;
    })
}

function GetUserById(id) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/users/" + id;
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    })
}

function GetConversations() {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations";
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    })
}

function GetUserByName(name) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/users?query=" + name;
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    })
}

function GetMe() {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/users/me";
    let token = localStorage.getItem("token");
    return fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    })
}

function SendPublicMessage(message) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages";
    let token = localStorage.getItem("token");

    let model = {
        "content": message
    };

    return fetch(url, {
        "method": "POST",
        "headers": {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(model)
    });
}

function SendPrivateMessage(message, chatId) {
    console.log('send to');
    console.log(chatId);
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/" + chatId + "/messages";
    let token = localStorage.getItem("token");

    let model = {
        "content": message
    };

    return fetch(url, {
        "method": "POST",
        "headers": {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(model)
    });
}

function CreateUser(name, login, password) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup";

    let model = {
        "name": name,
        "login": login,
        "password": password
    };

    return fetch(
        url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model)
        });
}

function LoginUser(login, password) {
    let model = {
        "login": login,
        "password": password
    };

    let url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin";

    return fetch(
        url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model)
        });
}

function GetUserName(user, callback) {
    if (user == null) {
        return user;
    }
    let name = localStorage.getItem(user);
    if (name === null) {
        localStorage.setItem(user, "Loading");
        name = "Loading";
        let promise = GetUserById(user);
        promise.then(
            json => {
                localStorage.setItem(user, json.name);
                callback(user, json.name);
            }
        );
    }
    return name;
}

export {
    LoadPublicMessages,
    LoadUserMessages,
    GetUserById,
    GetConversations,
    GetUserByName,
    GetMe,
    SendPublicMessage,
    SendPrivateMessage,
    CreateUser,
    LoginUser,
    GetUserName
};