import $ from 'jquery';

export function getFieldSize() {
	const apiUrl = 'https://kde.link/test/get_field_size.php';
	return $.getJSON(apiUrl);

	const size = {width: 8, height: 8};
	return Promise.resolve(size);
}
