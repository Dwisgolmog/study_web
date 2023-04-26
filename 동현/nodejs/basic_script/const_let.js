if(true){
    var x = 3;
}
console.log(x); //3
//var는 함수 스코프(범위)를 가지기 때문에 블럭과 관계없이 접근 가능

if(true){
    const y = 3;
}
console.log(y); //오류 발생!
//const와 let은 블럭 스코프(범위)를 가지므로 블럭 밖에서 접근 불가능

const a = 0;
a = 1; //오류 발생! 재할당 불가능
let b = 0;
b = 1; //1
const c; //오류 발생! 초기화시 값을 할당해야함!
