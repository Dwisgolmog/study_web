let h2 = document.querySelector('h2');
h2.dataset.test = 'hello java';
console.log('h2.dataset.test: ', h2.dataset.test);

let img = document.querySelector('img');
let lilist = document.querySelectorAll('li');
let select = document.querySelector('select-itme');
lilist[0].addEventListener('click', selectItem);
lilist[1].addEventListener('click', selectItem);
lilist[2].addEventListener('click', selectItem);

function selectItem(event) {
  selectItem.textContent = event.target.textContent;
  img.setAttribute('src', event.target.dataset.img);
}
