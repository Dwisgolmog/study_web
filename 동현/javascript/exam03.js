let dateTime = prompt('셀 날짜를 쉼표로 나누어서 입력해주세요.\n ex)2000,05,27')
let graduate = new Date(dateTime);
let result = 0;

calcTime();

//계산한 날짜 값에 따른 표현 불류
if(result >= 0){
    document.querySelector('#days').innerText = result;
    document.querySelector('#afterText').innerText = '지났습니다.'
}else{
    document.querySelector('#days').innerText = result * -1;
    document.querySelector('#afterText').innerText = '남았습니다.'
}

//날짜 계산기
function calcTime(){
    nowTime = Date.now();
    howTime  = nowTime - graduate;
    result = Math.round(howTime / (1000 * 60 * 60 * 24));
    
}

