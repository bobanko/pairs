export function getFieldSize() {
	const apiUrl = 'https://kde.link/test/get_field_size.php';
	return $.getJSON(apiUrl);
}
