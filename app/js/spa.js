"use strict";
import $ from 'jquery';

$('a.link').on('click', function (event) {
	event.preventDefault();

	$('.container').load(this.href);

});

/*
<a href="partials/chat.html" class="link">chat</a>
	<a href="partials/page2.html" class="link">page2</a>
	<a href="partials/page3.html" class="link">page3</a>
	<div class="container">
	content will be inserted here
</div>*/
