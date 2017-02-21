document.querySelector('.field').addEventListener('click', selectItem);

var apiUrl = 'https://kde.link/test/get_field_size.php';
let imageCount = 12;

$.getJSON(apiUrl).then(getPairs).then(drawField);


function getPairs(size) {

	let pairCount = size.width * size.height /2;

	let pairs = [];
	for(let i=0; i<pairCount; i++){
		pairs.push(getRandomInt(1,imageCount));
	}

	pairs = pairs.concat(pairs);
	pairs.sort((a,b)=>getRandomInt(0,1));

	size.pairs = pairs;


	return { size: size, pairs: pairs};
}


function drawField(data) {

	console.log(data.pairs);
	console.log(data.size);
	for(let rowIndex=0;rowIndex<data.size.height; rowIndex++){

		let row = $('<div class="row"></div>');

		for(let cellIndex=0; cellIndex<data.size.width; cellIndex++){

			let rndImageIndex = data.pairs.shift();
			let cell = $(`<div class="cell">
							<item data-id=${ rndImageIndex }></item>
							</div>`);
			row.append(cell);

		}

		$('.field').append(row);
	}

}


function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomPairImageUrl() {
  var randomImageIndex = getRandomInt(0, pairImageUrls.length - 1);
  return pairImageUrls[randomImageIndex];
}

let selectedPairs=[];

function selectItem(event) {
  if (event.target.tagName === 'ITEM') {
    //event.target.classList.toggle('open');
	  var item = event.target;

	  selectedPairs.push(item);
	  $(item).toggleClass('open');

	  if(selectedPairs.length===2){
	  	console.log(selectedPairs);
	  	let isSame= selectedPairs.map((e)=>$(e).data('id')).reduce((a,b)=>{
	  		return a === b;
		  });

	  	if(isSame){
	  		selectedPairs.forEach((e)=>$(e).fadeOut(1000));
		}else{

	  		selectedPairs.forEach(e=>$(e).delay(1000, ()=> $(e).toggleClass('open')))
		}
		selectedPairs=[];

	  }

  }
}
