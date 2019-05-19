const api = 'http://messenger.westeurope.cloudapp.azure.com/';

export function signup(login, password, name) {
	let model = {
		'login': login,
		'password': password,
		'name': name
	};

	let url = api + 'api/authentication/signup';

	return fetch(url, {
		method: 'POST', 
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(model)
	}).then(response => {
		if (response.status >= 200 && response.status <= 299)
			return response.json();
		else
			console.log('error on singup');
	}).then(response => {
		return response.token;
	});
}

export function signin(login, password) {
	let model = {
		'login': login,
		'password': password
	};

	let url = api + 'api/authentication/signin';
	console.log(model, url);
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(model)
	}).then(response => {
		if (response.status >= 200 && response.status <= 299) {
			// console.log(response.json());
			return response.json();
		} else
			console.log('error on singin');
	}).then(response => {
		return response.token;
	});
}

export function conversations(token) {
	let url = api + 'api/conversations';

	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : 'Bearer ' + token
		}
	}).then( response => {
		if (response.status >= 200 && response.status <= 299)

			return response.json();
		else
			console.log('error on conversations token ' + localStorage.getItem('token'));
	});
}

export function getmessages(token) {
	let url = api + 'api/conversations/public/messages?from=0&count=1000';

	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : 'Bearer ' + token
		}
	}).then(response => {
		if (response.status >= 200 && response.status <= 299)
			return response.json();
		else
			console.log('error on getmessages');
	});
}

export function getuser(id) {
	let url = api + 'api/users/' + id;

	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : 'Bearer ' + localStorage.getItem('token')
		}
	}).then( response => {
		if (response.status >= 200 && response.status <= 299)
			return response.json();
		else
			console.log('error on getuser');
	});
}

export function postpublicmessage(message) {
	let url = api + 'api/conversations/public/messages';
	let model = {
		'content': message
	};

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify(model)
	}).then( response => {
		if (response.status >= 200 && response.status <= 299)
			return response.json();
		else
			console.log('error on postpublicmessage');
	});
}