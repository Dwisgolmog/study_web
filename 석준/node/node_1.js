if(true){
    var a =1;
}
console.log(a);
//출력 가능
if(true){
    const b =1 ;
}
console.log(b);
// console.log(b)는 출력 불가 const는 블록 범위 내에서만 사용 가능
//-----------------------------------------------------------------
const c =0;
c=1;
//재할당 x

const d =0;
d=0;

//const e; //error 발생 초기화시에 값을 할당해야함..
//----------------------------------------------------------
//var num1 =1;
//var num2=2;
//var result=3;

//var string1=num1 + '더하기' + num2+'는\''+result+'\'';
//console.log(string1);

const num1=1;
const num2=2;
const result=3;

const string2=`${num3} 더하기 ${num4}는 '${result2}'`;
// `` 백틱 사용 변수사용 가능
//---------------------------------------------------------------------
var sayNode=function(){
    console.log('node');
}
var es ='ES';
var oldObject={
    sayJS: function(){
        console.log('js');
    },
    sayNode:sayNode,//두번
};
oldObject[es+6]='fantastic'; // 새로운 속성명 바깥에서 생성
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);

// 밑에처럼 간단히 사용 가능
const newObject={
    sayJS(){
        console.log('js');
    },
    sayNode,//한번
    [es+6]:'fantastic', // 새로운 속성면 객체 안에서 생성 가능해짐
};
newObject.sayJS();
newObject.sayNode();
console.log(newObject.ES6);
//-------------------------------------------------------
function add1(x,y){
    return x+y;
}
const add2=(x,y)=>{return x+y;};
const add3=(x,y)=>x+y;
const add4=(x,y)=>(x+y);
// add 1,2,3,4 다 같은 기능
function not1(x){
    return !x;
}
const not2 = x=>!x;
// => 화살표 함수는 return을 줄이는 문법에서 주로 사용
//--------------------------------------------------------
var relationship1 ={
    name: 'zero',
    friends:['nero','hero','xero'],
    logFriends: function(){
        var that = this;
        this.friends.forEach(function(friend){//forEach는for 반복문
            console.log(that.name,friends);
        });
    },
};
relationship1.logFriends();

var relationship2={
    name: 'zero',
    friends:['nero','hero','zero'],
    logFriends(){
        this.friends.forEach(friend=>{ //화살표 함수로 function()을 지울수 있음
            console.log(this.name,friend);
        });
    },
};
relationship2.logFriends();

//-----------------------------------------------------------------------
var candyMachine={
    status: {
        name : 'node',
        count : 5,
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    },
};
var getCandy=candyMachine.getCandy;
var count=candyMachine.status.count;

const candyMachine={
    status:{
        name: 'node',
        count: 5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    },
};
const{getCandy, status:{count}}=candyMachine;
//candyMachine의 getCandy
//candyMachine의 status의 count
//--------------------------------------------------------------------------
// 배열 구조 분해 할당
const array=['node.js',{},10,true];

var node=array[0];//node.js
var node=array[1];//{}
var node=array[3];//true
// 동일
const [node,obj,,bool]=array;
// node=node.js
// obj={}
// bool=true
// 10은 할당 x
// 구조 분해 할당
//--------------------------------------------------------------------------
// prototype 상속
var Human=function(type){
    this.type=type||'human';
};
Human.isHuman=function(human){
    return human instanceof Human;
}
Human.prototype.breathe=function(){
    alert('h-a-a-a-m');
};
var Zero=function(type,firstName,lastName){
    Human.apply(this, arguments);
    this.firstname=firstName;
    this.lastName=lastName;
};
Zero.prototype =Object.create(Human.prototype);
Zero.prototype=constructor=Zero;
Zero.prototype.sayName=function(){
    alert(this.firstName+''+this.lastName);
};
var oldZero=new Zero('human','Zero','Cho');
Human.isHuman(oldZero);
// 클래스 기반 상속
class Human{
    cnstructor(type='human'){
        this.type=type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        alert('h-a-a-a-m');
    }
}
class Zero extends Human{
    constructor(type, firstName,lastName){
        super(type);
        this.firstName=firstName;
        this.lastName=lastName;
    }
    sayName(){
        super.breathe();
        alert('${this.firstName}${this.lastName}');
    }
}
const newZero = new Zero('human','Zero','Cho');
Human.isHuman(newZero); 
