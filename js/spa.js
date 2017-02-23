"use strict";
$('a.link').on('click', function (event) {
	event.preventDefault();

	$('.container').load(this.href);

});
