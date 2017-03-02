const apiUrl = '//pg-api.azurewebsites.net/api';

const loginUrl = `${ apiUrl }/User/Login`;
const chatCreateUrl = `${ apiUrl }/Chat/Create`;

const wsUrl = 'ws://pg-api.azurewebsites.net/api';

//todo: grab from form
let userData = {
	"username": "bob",
	"password": "123"
};

const appHeaders = {
	"Content-Type": "application/json"
};

const saveAuthToken = (response) => {
	appHeaders.authToken = response.data.AuthToken;
	return response;
};


function sendRequest(method, url, data) {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		//set headers
		for (let header in appHeaders) {
			xhr.setRequestHeader(header, appHeaders[header]);
		}
		xhr.addEventListener('load', resolve);
		xhr.send(JSON.stringify(data));
	});
}

function debug(data) {
	console.log(data);
	return data;
}

function getResponse(event) {
	const response = event.target.responseText;
	return JSON.parse(response);
}



let configureAuthHeaders = (baseHeaders) => {
	let authHeaders = Object.create(baseHeaders);
	authHeaders['authToken'] = authToken;
	return authHeaders;
};


console.clear();

const loginPromise = sendRequest('post', loginUrl, userData, appHeaders)
	.then(getResponse)
	.then(debug)
	.then(x => JSON.parse(x))
	.then((x) => new Promise((res, rej) => res(x)))
	.then(debug)
	.then(saveAuthToken)
	.catch(z => console.warn('err', z));


let chatData = {
	"id": "string",
	"name": "string"
};
let chatDataJson = JSON.stringify(chatData);


loginPromise
	.then(function () {
		return configureAuthHeaders(appHeaders);
	}).then(createChat)
	.then(getResponse)
	.then(x => console.log(x));


function createChat(headers) {
	return sendRequest('post', chatCreateUrl, chatDataJson, headers);
}
