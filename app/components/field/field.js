import {Item} from '../item/item';
import $ from 'jquery';

export class Field {

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

				let item = new Item(rndImageIndex);

				row.append(item.element.outerHTML);
			}

			rows.push(row);
		}

		const maxSize = Math.max(this.size.height, this.size.width);

		//todo: do it without jquery
		$('.field').html(rows);
		$('.field')[0].dataset.maxSize = maxSize;

	}
}
