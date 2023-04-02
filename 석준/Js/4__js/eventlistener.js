let btn1 = document.querySelector('.btn1')
let btn2 = document.querySelector('.btn2')

btn1.onclick=function(){
    alert('hi')
}
// 이벤트 리스너 여러개 지정가능
btn2.addEventListener('click',helloEvent)
function helloEvent(){
    alert('하위')
}

btn2.addEventListener('click',function(){
    alert('바위')
})
// 제거
btn2.removeEventListener('click',helloEvent());

//Event 객체
