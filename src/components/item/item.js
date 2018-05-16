const isOpenClassName = 'is-open';

export class Item {
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
