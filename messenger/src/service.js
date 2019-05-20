const apiURL = 'http://messenger.westeurope.cloudapp.azure.com';

function fetchStatusCheck(response) {
	if (!response.ok) {
		const error = response.text() || response.statusText;
		return Promise.reject(error);
	}
	return response.json();
}

export default class Service{

	get(endpoint, token, options = null){
		return fetch(`${apiURL}/${endpoint}`, {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		}).then(fetchStatusCheck)
	}

	post(endpoint = "", data = {}){
		const url = `${apiURL}/${endpoint}`;
		return fetch(url, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {'content-type': 'application/json'},
		}).then(fetchStatusCheck)
	}


	postSignUp(login, password, name){
		return fetch(apiURL + '/api/authentication/signup', {
			method: 'post',
			body: JSON.stringify({login: login, password: password, name: name}),
			headers: { 'content-type': 'application/json' }
		})
			.then(fetchStatusCheck)
	}
	postSignIn(login, password){
		return fetch(apiURL + '/api/authentication/signin', {
			method: 'post',
			body: JSON.stringify({login: login, password: password}),
			headers: { 'content-type': 'application/json' }
		})
			.then(fetchStatusCheck)
	}
	getConversations(token){
		return fetch(apiURL + '/api/conversations', {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}
	getPrivateMessages(token, userId, from=0, count=50){
		let url = new URL(apiURL + `/api/conversations/${userId}/messages`);
		url.searchParams.append('From', from);
		url.searchParams.append('Count', count);
		return fetch(url, {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}
	postPrivateMessages(token, userId, message){
		return fetch(apiURL + `/api/conversations/${userId}/messages`, {
			method: 'post',
			body: JSON.stringify({content: message}),
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck)
	}
	getPublicMessages(token){
		return fetch(apiURL + '/api/conversations/public/messages', {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}
	postPublicMessages(token, message){
		return fetch(apiURL + '/api/conversations/public/messages', {
			method: 'post',
			body: JSON.stringify({content: message}),
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck)
	}

	getMe(token){
		return fetch(apiURL + '/api/users/me', {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}
	getUser(token, userId){
		return fetch(apiURL + `/api/users/${userId}`, {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}
	findUser(token, query){
		return fetch(apiURL + '/api/users?query=' + query, {
			method: 'get',
			headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token }
		})
			.then(fetchStatusCheck);
	}

	getWebSocket(token) {
		return 'ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token='+ token;
	}
}