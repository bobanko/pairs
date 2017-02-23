const apiUrl = 'https://pg-api.azurewebsites.net/api';
const loginUrl = `${ apiUrl }/User/Login`;
const chatCreateUrl = `${ apiUrl }/Chat/Create`;

const wsUrl = 'ws://';

//todo: grab from form
let userData = {
	"username": "bob",
	"password": "string"
};
let userDataJson = JSON.stringify(userData);

// function handler(event){ console.log(event.target.responseText)};
// console.clear();
// var xhr = new XMLHttpRequest();
// xhr.open('post',loginUrl);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.addEventListener('load', handler);
//xhr.send(userDataJson);

function sendRequest(method, url, data, headers) {
	return new Promise(function(resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		for (let header in headers) {
			xhr.setRequestHeader(header, headers[header]);
		}
		xhr.addEventListener('load', resolve);
		xhr.send(data);
	});
}

function debug(data) {
	console.log(data);
	return data;
}

function getResponse(event){
	return event.target.responseText;
}

let authToken = null;
let saveAuthToken = (response) => {
	authToken = response.data.AuthToken;
	return response;
};

let configureAuthHeaders = (baseHeaders) =>{
	let authHeaders = Object.create(baseHeaders);
	authHeaders['authToken'] = authToken;
	return authHeaders;
};

let appJsonHeaders = {
	"Content-Type": "application/json"
};

console.clear();

const loginPromise = sendRequest('post', loginUrl, userDataJson, appJsonHeaders)
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
	.then(function(){
		return configureAuthHeaders(appJsonHeaders);
	}).then(createChat)
	.then(getResponse)
	.then(x=>console.log(x));




function createChat(headers) {
	return sendRequest('post', chatCreateUrl, chatDataJson, headers);
}
