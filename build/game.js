var game =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apiUrl = 'https://kde.link/test/get_field_size.php';
var imageCount = 12;

$.getJSON(apiUrl).then(getPairs).then(drawField);

//debugger;

console.log(true);

function getPairs(size) {

	var pairCount = size.width * size.height / 2;

	var pairs = [];
	for (var i = 0; i < pairCount; i++) {
		pairs.push(getRandomInt(1, imageCount));
	}

	pairs = pairs.concat(pairs);
	pairs.sort(function (a, b) {
		return getRandomInt(0, 1);
	});

	size.pairs = pairs;

	return { size: size, pairs: pairs };
}

exports.getPairs = getPairs;

function drawField(data) {

	console.log(data.size);
	var rows = [];
	for (var rowIndex = 0; rowIndex < data.size.height; rowIndex++) {

		var row = $('<div class="row"></div>');

		for (var cellIndex = 0; cellIndex < data.size.width; cellIndex++) {

			var rndImageIndex = data.pairs.shift();
			var cell = $('<div class="cell">\n\t\t\t\t\t\t\t<item data-id=' + rndImageIndex + '></item>\n\t\t\t\t\t\t</div>');
			row.append(cell);
		}

		rows.push(row);
	}

	$('.field').html(rows);
}

function getRandomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

var selectedPairs = [];

function selectItem(event) {
	if (event.target.tagName === 'ITEM') {
		var element = event.target;

		var elementIndex = selectedPairs.indexOf(element);
		if (elementIndex >= 0) {
			$(element).toggleClass('open', false);
			selectedPairs.splice(elementIndex, 1);
			return;
		}

		selectedPairs.push(element);
		$(element).toggleClass('open', true);

		//second item opened - check both and decide
		if (selectedPairs.length === 2) {
			var isSame = selectedPairs.map(function (element) {
				return $(element).data('id');
			}).reduce(function (a, b) {
				return a === b;
			});

			if (isSame) {
				selectedPairs.forEach(function (e) {
					return setTimeout(function () {
						return $(e).toggleClass('hidden');
					}, 500);
				});
			} else {
				selectedPairs.forEach(function (e) {
					return setTimeout(function () {
						return $(e).toggleClass('open', false);
					}, 500);
				});
			}
			//clear pairs arr
			selectedPairs.length = 0;
		}
	}
}

document.querySelector('.field').addEventListener('click', selectItem);

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map