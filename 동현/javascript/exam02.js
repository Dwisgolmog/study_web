sayWord();

var word1 = 'hello'; //전역 변수 (var은 재선언이 가능하다.)

function sayWord(){
    var word2 = ' javascript'; //지역 변수
    let num = 3; //블럭 변수(재선언이 불가능하다.)
    for(let i =1; i<num+1; i++){
        alert(word1+word2+'\ntry:'+i);
    }
}