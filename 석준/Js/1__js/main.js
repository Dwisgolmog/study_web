// 콘솔 메세지
console.log("hello java");
console.log('hello','bye');

//경고
// alert('hello bye!!!!')

//숫자표현, 문자, 세미콜론
console.log('하이',123);

//변수
let str = 'hello java';
console.log('문자열: ',str);
let number = 123;
console.log('숫자 : ',number);
//함수
function sayHello(){
    console.log('hello1');
    console.log('hello2');
    console.log('hello3');
}
sayHello();
console.log('------------------------------------');

//객체
let obj={
    number:2222,//프로퍼티(속성)
    sayHello:function(){

        console.log('obj>hello1');
        console.log('obj>hello2');
        console.log('obj>hello3');

    },
};

console.log(obj.number);
obj.sayHello();
//이벤트

