//고유한 id 할당 받기
let title=document.getElementById('title');
console.log(title);
title.textContent='헬스 3대 운동';

//html 요소 가져오기
let items=document.getElementsByClassName('item');
console.log(items);
console.log('스쿼트',items[0]);
console.log('벤치',items[1]);
console.log('데드',items[2]);

let lilist=document.getElementsByTagName('li');
console.log(lilist);

//쿼리 메소드document.querySelector(css selector)

//2) html 요소 쿼리

let h2=document.querySelector('#title');
console.log(h2);
let item=document.querySelector('.item');
console.log(item);
//쿼리는 하나만 가져옴
let allitem=document.querySelectorAll('.item');
console.log(allitem[0]);
console.log(allitem[1]);
console.log(allitem[2]);

//HTML 요소 조작하기..
//h2.textContent="운동임";
// h2.innerHTML='<span>운동</span>';

//console.log(H2.textContent);

//속성 제어하기
let input=document.querySelector('input');
input.setAttribute('placeholder', '헬스 종목 입력');
input.removeAttribute('placeholder');
// input.setAttribute('required','');//요소에서 주어진 이름의 속성값을 입력합니다.
// input.setAttribute('required');//이름의 속성값을 제거합니다.

//html 요소 스타일링
//style 사용하기
//css 클래스 이용

let helloitem=document.querySelector('.hello');
console.log(helloitem);
// helloitem.style.color='blue';
// helloitem.style.background='black';
helloitem.classList.add('dark,one');
helloitem.classList.remove('dark,one');




