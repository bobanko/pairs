var chat =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apiUrl = '//pg-api.azurewebsites.net/api';

var loginUrl = apiUrl + '/User/Login';
var chatCreateUrl = apiUrl + '/Chat/Create';

var wsUrl = 'ws://pg-api.azurewebsites.net/api';

//todo: grab from form
var userData = {
	"username": "bob",
	"password": "123"
};

var appHeaders = {
	"Content-Type": "application/json"
};

var saveAuthToken = function saveAuthToken(response) {
	appHeaders.authToken = response.data.AuthToken;
	return response;
};

function sendRequest(method, url, data) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		//set headers
		for (var header in appHeaders) {
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
	var response = event.target.responseText;
	return JSON.parse(response);
}

var configureAuthHeaders = function configureAuthHeaders(baseHeaders) {
	var authHeaders = Object.create(baseHeaders);
	authHeaders['authToken'] = authToken;
	return authHeaders;
};

console.clear();

var loginPromise = sendRequest('post', loginUrl, userDataJson, appHeaders).then(getResponse).then(debug).then(function (x) {
	return JSON.parse(x);
}).then(function (x) {
	return new Promise(function (res, rej) {
		return res(x);
	});
}).then(debug).then(saveAuthToken).catch(function (z) {
	return console.warn('err', z);
});

var chatData = {
	"id": "string",
	"name": "string"
};
var chatDataJson = JSON.stringify(chatData);

loginPromise.then(function () {
	return configureAuthHeaders(appHeaders);
}).then(createChat).then(getResponse).then(function (x) {
	return console.log(x);
});

function createChat(headers) {
	return sendRequest('post', chatCreateUrl, chatDataJson, headers);
}

/***/ })
/******/ ]);
//# sourceMappingURL=chat.js.map