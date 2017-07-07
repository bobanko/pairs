'use strict';
const imageCount = 12;

import './styles/index.less';

import {getFieldSize} from './components/field/fieldSize.service';
import {Field} from './components/field/field';
import {getRandomInt} from './helpers/getRandomInt';
import {getLevelTimeout} from './helpers/getLevelTimeout';
import {Timer} from './components/timer/timer';


getFieldSize()
	.then(getPairs)
	.then(drawField)
	.then(setTimer)
	.then(win)
	.catch(fail)
	.then(()=>console.log('afterfail'));


function fail() {
	$('.timer').text('you failed 😰');
	return Promise.resolve();
}

function win() {
	$('.timer').text('you won 👑 ✊')
}


function setTimer(data) {
	return new Promise(function (resolve, reject) {

		const pairCount = data.size.width * data.size.height;
		const timeout = getLevelTimeout(pairCount);

		const timer = new Timer(timeout);

		function getLastTwo(number) {
			return number < 10 ? '0' + number : number;
		}

		timer.addEventListener('tick', (time) => {
			const dateTime = new Date(time);
			$('.timer').text(`${ getLastTwo(dateTime.getMinutes())} : ${ getLastTwo(dateTime.getSeconds()) } `);


			if($('.field item:not(.hidden)').length===0){
				resolve();
				timer.stop();
			}
		});

		timer.addEventListener('stop', (time) => {
			reject();
		});

	});
}


function getPairs(size) {

	//size = {width: 8, height: 8};//todo: stub

	let pairCount = size.width * size.height / 2;

	let pairs = [];
	for (let i = 0; i < pairCount; i++) {
		pairs.push(getRandomInt(1, imageCount));
	}

	pairs = pairs.concat(pairs);
	pairs.sort((a, b) => getRandomInt(0, 1));

	size.pairs = pairs;


	return {size: size, pairs: pairs};
}

function drawField(data) {
	let field = new Field(data.size);
	field.draw(data.pairs);

	return data;
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


