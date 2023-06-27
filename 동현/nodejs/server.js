const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;

//ejs 사용
app.set('view engine','ejs');

//npm install method-override 사용
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//static 파일을 보관하기 위해 public 폴더를 쓸것임
app.use('/public',express.static('public'));

var db;
//몽고 DB 연결
MongoClient.connect('mongodb+srv://donghyung2000:qwer1234@cluster0.tjqsheh.mongodb.net/',{ useUnifiedTopology: true } ,function(e, client){
  if (e) return console.log(e);
    
  db = client.db('todoapp');

  app.listen(8080, function() {
    console.log('listening on 8080')
  })

})


app.get('/write',function(rq,rp){
    rp.render('write.ejs');
})

//  => '/' 은 홈페이지
app.get('/',function(rq,rp){
    rp.render('index.ejs');
})


// /add라는 경로로  POST 요청이 왔을경우
app.post('/add',function(request,response){
    //response.send('전송 성공');
    response.send("<script>alert('전송 성공'); window.location.href = '/write';</script>");

    // counter라는 DB에 있는 게시물갯수를 가져옴
    db.collection('counter').findOne({name : '게시물갯수'},function(e,result){
        var totalPost = result.totalPost

        //post라는 DB에 응답.name의 값을 저장함
        db.collection('post').insertOne( {_id: totalPost+1,제목 : request.body.title , 날짜:request.body.date} ,function(e,result){
            console.log('저장완료');

            // $set ==> 바꿀값 , $inc ==> 기존값에 더해줄 값
            db.collection('counter').updateOne({name:'게시물갯수'},{ $inc : {totalPost:1}},function(e,result){
                if(e){return console.log(e)}
            })
        });

        
    })
})

app.get('/list',function(rq,rp){

    // post에 저장된 모든 데이터를 가져올수 있음
    db.collection('post').find().toArray(function(e,result){
        console.log(result);
        //모든 데이터의 값을 posts라는 이름으로 ejs파일에 넣는다.
        rp.render('list.ejs', {posts : result});
    });

})

app.delete('/delete',function(rq,rp){
    console.log(rq.body);
    rq.body._id = parseInt(rq.body._id);
    db.collection('post').deleteOne(rq.body,function(e,result){
        console.log('삭제완료');
        //서버에 응답 성공(200)이라고 전해줌
        rp.status(200).send({message : '성공했습니다'});
    })
})

// :id ==> url의 파라미터와 같음
app.get('/detail/:id',function(req,res){
    // :id 값과 동일한  post DB의 id를 가져옴
    db.collection('post').findOne({_id:parseInt(req.params.id)},function(e,result){
        if(result == null){
            res.send('존재하지 않는 게시물입니다.');
        }
        console.log(result);
        res.render('detail.ejs',{data : result});
    })
})

app.get('/edit/:id',function(req,res){
    db.collection('post').findOne({_id:parseInt(req.params.id)},function(e,result){
        if(result == null){
            res.send('존재하지 않는 게시물입니다.');
        }
        res.render('edit.ejs',{data:result});
    })
    
})

app.put('/edit',function(req,res){
    db.collection('post').updateOne({_id:parseInt(req.body.id)},
    {$set:{ 제목:req.body.title,날짜:req.body.date}},function(e,result){
        console.log("수정 완료");
        //수정 완료시 /list 페이지로 이동
        res.redirect('/list');
    });
    
})