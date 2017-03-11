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
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item_item__ = __webpack_require__(4);


class Field {

	constructor(fieldSize) {
		this.size = fieldSize;

	}

	init(items) {
		this.draw(items);
	}

	draw(items) {
		let rows = [];
		this.element = document.createElement('div');
		for (let rowIndex = 0; rowIndex < this.size.height; rowIndex++) {

			let row = $('<div class="row"></div>');

			for (let cellIndex = 0; cellIndex < this.size.width; cellIndex++) {

				let rndImageIndex = items.shift();

				let item = new __WEBPACK_IMPORTED_MODULE_0__item_item__["a" /* Item */](rndImageIndex);

				row.append(item.element.outerHTML);
			}

			rows.push(row);
		}
		$('.field').html(rows);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getFieldSize;
function getFieldSize() {
	const apiUrl = 'https://kde.link/test/get_field_size.php';
	return $.getJSON(apiUrl);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomInt;
function getRandomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const isOpenClassName = 'is-open';

class Item {
	constructor(imageIndex) {
		this.initElement(imageIndex);

		//this.imageId = imageIndex;
	}

	initElement(imageIndex) {

		const element = document.createElement('div');
		element.classList.add('cell');
		element.innerHTML = `<item data-id=${ imageIndex }></item>`;
		this.element = element;
	}

	toggle(isOpen) {
		if (isOpen === undefined) {
			this.isOpen = !this.isOpen;
		} else {
			this.isOpen = isOpen;
		}
	}


	get cell() {
		this.element.querySelector('cell');
	}


	get imageId() {
		return this.cell.dataset.id;
	}

	set imageId(value) {
		this.cell.dataset.id = value;
	}

	get isOpen() {
		return this.element.classList.contains(isOpenClassName);
	}

	set isOpen(value) {
		this.element.classList.toggle(isOpenClassName, value);
	}


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_less__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_field_fieldSize_service__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_field_field__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_getRandomInt__ = __webpack_require__(2);

const imageCount = 12;







__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__components_field_fieldSize_service__["a" /* getFieldSize */])().then(getPairs).then(drawField);


function getPairs(size) {

	let pairCount = size.width * size.height / 2;

	let pairs = [];
	for (let i = 0; i < pairCount; i++) {
		pairs.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_getRandomInt__["a" /* getRandomInt */])(1, imageCount));
	}

	pairs = pairs.concat(pairs);
	pairs.sort((a, b) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_getRandomInt__["a" /* getRandomInt */])(0, 1));

	size.pairs = pairs;


	return {size: size, pairs: pairs};
}

function drawField(data) {

	let field = new __WEBPACK_IMPORTED_MODULE_2__components_field_field__["a" /* Field */](data.size);

	field.draw(data.pairs);

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
			let isSame = selectedPairs
				.map((element) => $(element).data('id'))
				.reduce((a, b) => {
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
//# sourceMappingURL=game.js.map