document.querySelector('.field').addEventListener('click', selectItem);

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomPairImageUrl() {
  var randomImageIndex = getRandomInt(0, pairImageUrls.length - 1);
  return pairImageUrls[randomImageIndex];
}

function selectItem(event) {
  console.log(event);
  if (event.target.tagName === 'ITEM') {
    event.target.classList.toggle('open');
  }
}

var items = document.querySelectorAll('item');
for (let item of items) {
  setTimeout(() => item.classList.toggle('open'), Math.random() * 1000);
}

setTimeout(() => {
  for (let item of items) {
    setTimeout(() => item.classList.toggle('open'), Math.random() * 1000);
  }
}, 2000);