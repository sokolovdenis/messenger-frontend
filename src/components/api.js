const api = 'http://messenger.westeurope.cloudapp.azure.com/';

export function postPublicMessage(token, content) {
	let model = {
		"content": content
    }
    console.log('postPublicMessage() -> model: ', model);
    
    let url = api + 'api/conversations/public/messages';
    console.log('postPublicMessage() -> url: ', url);

	return fetch(url, {
                        method: "POST",
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(model)
                    })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log("postPublicMessage()->fetch(): response status is ok" );
                    return response.json();
                } else {
                    console.log("postPublicMessage()->fetch(): response status is NOT ok" );
                    console.log("postPublicMessage()->fetch(): response status = " + response.status );
                }
            })
}

export function getPublicMessages(token, from, count) {
	let url = api + `api/conversations/public/messages?from=${from}&count=${count}`;

	return fetch(url, {
                        method: "GET",
                        headers: { 'Authorization': 'Bearer ' + token }
                    })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    // console.log("getPublicMessages()->fetch(): response status is ok" );
                    return response.json();
                } else {
                    console.log("getPublicMessages()->fetch(): response status is NOT ok" );
                    console.log("getPublicMessages()->fetch(): response status = " + response.status );
                }
            })
}



export function signin(login, password) {
    let model = {
        "login": login,
        "password": password
    }
    console.log('signin() -> model: ', model);

    let url = api + 'api/authentication/signin';
    console.log('signin() -> url: ', url);


    return fetch(url, {
                        method: 'POST', 
                        headers: { 'Content-Type': 'application/json' }, //T
                        body: JSON.stringify(model)
                    })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log("signin()->fetch(): response status is ok" );
                    return response.json();
                }
                else {
                    console.log("signin()->fetch(): response status is NOT ok" );
                    console.log("signin()->fetch(): response status = " + response.status );
                }
            })
            .then(json => {
                console.log('signin(): returning json = ' + json)
                return json.token
            });
}

export function signup(login, password, name) {
    let model = {
        "login": login,
        "password": password,
        "name": name,
    };
    
    console.log('signup() -> model: ', model);

    let url = api + 'api/authentication/signup';

    console.log('signup() -> url: ', url);

    return fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(model),
                    })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log("signup()->fetch(): response status is ok" );
                    return response.json();
                } else {
                    console.log("signup()->fetch(): response status is NOT ok" );
                    console.log("signup()->fetch(): response status = " + response.status );
                }
            })
            .then(json => {
                console.log('signup(): returning json.token = ' + json.token)
                return json.token;
            });
}

export function getUserInfo(userId) {
    
    let url = api + `api/users/${userId}`;

    let token = localStorage.getItem("token");

	return fetch(url, {
                        method: "GET",
                        headers:  {
                            'Authorization': 'Bearer ' + token,
                            'content-type': 'application/json'
                        }
                    })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    // console.log("getUserInfo()->fetch(): response status is ok" );
                    return response.json();
                } else {
                    console.log("getUserInfo()->fetch(): response status is NOT ok" );
                    console.log("getUserInfo()->fetch(): response status = " + response.status );
                }
            })
}
