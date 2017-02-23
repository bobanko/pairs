const apiUrl = 'https://kde.link/test/get_field_size.php';
const imageCount = 12;

$.getJSON(apiUrl).then(getPairs).then(drawField);


function getPairs(size) {

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

	console.log(data.size);
	let rows= [];
	for (let rowIndex = 0; rowIndex < data.size.height; rowIndex++) {

		let row = $('<div class="row"></div>');

		for (let cellIndex = 0; cellIndex < data.size.width; cellIndex++) {

			let rndImageIndex = data.pairs.shift();
			let cell = $(`<div class="cell">
							<item data-id=${ rndImageIndex }></item>
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
			let isSame = selectedPairs
				.map((element) => $(element).data('id'))
				.reduce((a, b) => {
					return a === b;
				});

			if (isSame) {
				selectedPairs.forEach((e) => setTimeout(() => $(e).toggleClass('hidden'), 500));
			} else {
				selectedPairs.forEach(e => setTimeout(() => $(e).toggleClass('open', false), 500));
			}
			//clear pairs arr
			selectedPairs.length = 0;
		}
	}
}

document.querySelector('.field').addEventListener('click', selectItem);


