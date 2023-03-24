//elements 요소

// let li = document.createElement('li');
// let ul = document.querySelector('ul');
// li.textContent = '데드리프트'; //텍스트 추가
// ul.appendChild(li); //ul 안에 li 추가

let inputBox = document.querySelector('input');
console.log(inputBox.value);

let before = document.getElementById('before');

//이벤트
let addBtn = document.getElementById('button');

addBtn.addEventListener('click', function () {
  let li = document.createElement('li');
  let ul = document.querySelector('ul');
  li.textContent = inputBox.value; //텍스트 추가
  ul.appendChild(li); //ul 안에 li 추가
});

before.addEventListener('click', function () {
  let li = document.createElement('li');
  let ul = document.querySelector('ul');
  let targetLi = document.querySelector('li#target');
  console.log(targetLi);
  li.textContent = inputBox.value;
  //ul.appendChild(li);
  ul.insertBefore(li, targetLi);
  //alert('추가되었습니다.');
});
