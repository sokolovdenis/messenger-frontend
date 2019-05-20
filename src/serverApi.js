const REST_URL = "http://messenger.westeurope.cloudapp.azure.com/api";
const WS_URL = "ws://messenger.westeurope.cloudapp.azure.com/socket/messages";


function fetch_api(url, method, data, authToken) {
    let fullUrl = new URL(REST_URL + url);
    let headers = {"content-type": "application/json"};
    if( authToken ) {
        headers["authorization"] = `Bearer ${authToken}`;
    }
    let requestInit = {
        method: method,
        headers: headers,
    };
    if( data && method === "POST" ) {
        requestInit["body"] = JSON.stringify(data)
    } else if( data && method === "GET" ) {
        fullUrl.search = new URLSearchParams(data);
    }
    return fetch(fullUrl, requestInit).catch((error) => {
        console.log("Fetch error: -S", error)
    }).then((response) => {
        if( response.status >= 200 && response.status < 300 ) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
}

export function signup(login, password, name) {
    const data = {login: login, password: password, name: name};
    return fetch_api("/authentication/signup", "POST", data, null).catch(
        status => {
            if( status === 400 ) {
                // If some request parameters are not valid.
                return Promise.reject("Incorrect login or password or name");
            } else if( status === 409 ) {
                // If some record is already exists in database. Check request parameters.
                return Promise.reject("User already exists");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function signin(login, password) {
    const data = {login: login, password: password};
    return fetch_api("/authentication/signin", "POST", data, null).catch(
        status => {
            if( status === 400 ) {
                // If some request parameters are not valid.
                return Promise.reject("Incorrect login or password");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function getAllConversations(authToken) {
    return fetch_api("/conversations", "GET", null, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function getPrivateMessages(userId, from, count, authToken) {
    const data = {From: from, Count: count};
    return fetch_api(`/conversations/${userId}/messages`, "GET", data, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function sendPrivateMessage(userId, message, authToken) {
    const data = {content: message};
    return fetch_api(`/conversations/${userId}/messages`, "POST", data, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function getPublicMessages(from, count, authToken) {
    const data = {From: from, Count: count};
    return fetch_api("/conversations/public/messages", "GET", data, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function sendPublicMessage(message, authToken) {
    const data = {content: message};
    return fetch_api("/conversations/public/messages", "POST", data, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function getMyProfile(authToken) {
    return fetch_api("/users/me", "GET", null, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function getUserProfile(id, authToken) {
    return fetch_api(`/users/${id}`, "GET", null, authToken).catch(
        status => {
            if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else if( status === 404 ) {
                // If some record is missing in database. Check request parameters.
                return Promise.reject("User doesn't exist");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function findUser(name, authToken) {
    const data = {query: name};
    return fetch_api("/users", "GET", data, authToken).catch(
        status => {
            if( status === 400 ) {
                // If some request parameters are not valid.
                return Promise.reject("User not found");
            } else if( status === 401 ) {
                // If Bearer token is not provided in request headers. Unable to authenticate.
                return Promise.reject("Unable to authenticate");
            } else {
                return Promise.reject("Unknown server error");
            }
        }
    );
}

export function configWebSoket(authToken, handleMessage) {
    let url = new URL(WS_URL);
    url.search = new URLSearchParams({token: authToken});

    this.socket = new WebSocket(url);

    let onopen = () => {
        console.log("Connected");
    };

    let onclose = event => {
        if( !event.wasClean ) {
            console.log("Reconnect");
            this.socket = new WebSocket(url);
            this.socket.onopen = onopen;
            this.socket.onclose = onclose;
            this.socket.onmessage = onmessage;
        }
    };

    let onmessage = event => {
        const message = JSON.parse(event.data);
        for( let k in message ) {
            message[k[0].toLowerCase() + k.slice(1)] = message[k];
            delete message[k];
        }
        handleMessage(message);
    };

    this.socket.onopen = onopen;
    this.socket.onclose = onclose;
    this.socket.onmessage = onmessage;
}