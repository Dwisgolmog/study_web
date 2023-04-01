let rectangele = document.querySelector('#rectangle');
let body = document.querySelector('body');

rectangele.addEventListener('mousedown', function (event) {
  // console.log('mousedown');
  console.log('clientX: ', event.clientX, 'clientY : ', event.clientY); // 브라우저 기준
  console.log('pageX: ', event.pageX, 'pageY : ', event.pageY); //전체 페이지 기준
  console.log(event.target.getBoundingClientRect());
});
body.addEventListener('click', function () {
  console.log('pagex ', event.pageX, 'pagey ', event.pageY);
  let div = document.createElement('div');
  div.classList.add('circle');
  div.style.left = event.pageX - 25 + 'px';
  div.style.top = event.pageY - 25 + 'px';
  body.appendChild(div);
});
// rectangele.addEventListener('mouseup',function(event){
//     console.log('mouseup');
// })
// rectangele.addEventListener('mouseenter',function(event){
//     console.log('mouseenter');
// })
// rectangele.addEventListener('mouseleave',function(event){
//     console.log('mouseleave');
// })
// rectangele.addEventListener('mousemove',function(event){
//     console.log('mousemove');
// })
