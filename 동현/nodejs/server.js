const express = require('express');
const app = express();

app.listen(8080,function(){
    console.log('listening on 8080');
});

app.get('/pet',function(rq,rp){
    rp.send('welecome pet!');
})

app.get('/write',function(rq,rp){
    rp.sendFile(__dirname + '/write.html');
})

//  => '/' 은 홈페이지
app.get('/',function(rq,rp){
    rp.sendFile(__dirname + '/index.html');
})