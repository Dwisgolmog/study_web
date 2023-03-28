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

let target_remove = document.querySelector('#target-remove');

let removebtn = document.querySelector('.remove_button');

addBtn.addEventListener('click', function () {
  let li = document.createElement('li');
  let ul = document.querySelector('ul');
  li.textContent = inputBox.value; //텍스트 추가

  let button = document.createElement('button');
  button.textContent = 'x';
  //button.setAttribute('class', 'remove_button');
  button.classList.add('remove_button');
  button.addEventListener('click', removeParentNode);
  li.appendChild(button);
  ul.appendChild(li); //ul 안에 li 추가
  inputBox.value = ''; // inputbox초기화
  inputBox.focus(); //input자동 커서
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

target_remove.addEventListener('click', function () {
  let targetLi = document.querySelector('li#target');
  targetLi.remove();
});

removebtn.addEventListener('click', removeParentNode);

function removeParentNode(event) {
  event.target.parentNode.remove();
  inputBox.value = ''; // inputbox초기화
  inputBox.focus(); //input자동 커서
}
d;
