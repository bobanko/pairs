var pairsLib =
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

const apiUrl = 'https://kde.link/test/get_field_size.php';
const imageCount = 12;

$.getJSON(apiUrl).then(getPairs).then(drawField);

debugger;

console.log(true);

function getPairs(size) {

	let pairCount = size.width * size.height / 2;

	let pairs = [];
	for (let i = 0; i < pairCount; i++) {
		pairs.push(getRandomInt(1, imageCount));
	}

	pairs = pairs.concat(pairs);
	pairs.sort((a, b) => getRandomInt(0, 1));

	size.pairs = pairs;

	return { size: size, pairs: pairs };
}

exports.getPairs = getPairs;

function drawField(data) {

	console.log(data.size);
	let rows = [];
	for (let rowIndex = 0; rowIndex < data.size.height; rowIndex++) {

		let row = $('<div class="row"></div>');

		for (let cellIndex = 0; cellIndex < data.size.width; cellIndex++) {

			let rndImageIndex = data.pairs.shift();
			let cell = $(`<div class="cell">
							<item data-id=${rndImageIndex}></item>
						</div>`);
			row.append(cell);
		}

		rows.push(row);
	}

	$('.field').html(rows);
}

function getRandomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

let selectedPairs = [];

function selectItem(event) {
	if (event.target.tagName === 'ITEM') {
		let element = event.target;

		let elementIndex = selectedPairs.indexOf(element);
		if (elementIndex >= 0) {
			$(element).toggleClass('open', false);
			selectedPairs.splice(elementIndex, 1);
			return;
		}

		selectedPairs.push(element);
		$(element).toggleClass('open', true);

		//second item opened - check both and decide
		if (selectedPairs.length === 2) {
			let isSame = selectedPairs.map(element => $(element).data('id')).reduce((a, b) => {
				return a === b;
			});

			if (isSame) {
				selectedPairs.forEach(e => setTimeout(() => $(e).toggleClass('hidden'), 500));
			} else {
				selectedPairs.forEach(e => setTimeout(() => $(e).toggleClass('open', false), 500));
			}
			//clear pairs arr
			selectedPairs.length = 0;
		}
	}
}

document.querySelector('.field').addEventListener('click', selectItem);

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map