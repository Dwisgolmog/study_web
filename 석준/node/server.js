//server open basic setting
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {ObjectId}= require('mongodb');
const path = require('path');

const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
require('dotenv').config();

app.use('/public',express.static('public'));
const methodEoverride =require('method-override')
app.use(methodEoverride('_method'))

const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb+srv://admin:sksl3296@cluster0.yku7bkv.mongodb.net/?retryWrites=true&w=majority', function (에러, client) {
  if (에러) {
    console.error('MongoDB 연결 오류:', 에러);
    return;
  }

  db=client.db('todoapp');//todoapp이라는 db연결

  // db.collection('post').insertOne({이름: 'john', 나이 : '20', _id: 100}, function(에러, 결과){
  //   console.log('저장완료');
  // });


  // 포트번호, 실행할 코드
  http.listen(8080, function () {
    console.log('listening on 8080');
  });
});

app.get('/socket', function(요청, 응답){
  응답.render('socket.ejs')
})

io.on('connection',function(socket){
  console.log('유저 접속함')
  socket.on('room1-send',function(data){
    io.to('room1').emit('broadcast',data)
  })

  socket.on('joinroom',function(data){
    socket.join('room1');
  })

  socket.on('user-send',function(data){
    console.log(data)

  
    io.emit('broadcast',data)//단체
    //io.to(socket.id).emit('broadcast',data) // 서버<-> 개인
  })
  
})


app.get('/pet', function(요청, 응답){
  응답.send('펫용품 쇼핑할 수 있는 페이지 입니다.')
})
app.get('/beauty', function(요청, 응답){
  응답.send('뷰티 쇼핑할 수 있는 페이지 입니다.')
})
app.get('/', function(요청, 응답){
  응답.render(__dirname+'/basic.ejs')//파일 보낼수 있음
})
app.get('/write', function(요청, 응답){
  응답.render(__dirname+'/write.ejs')
})

//db에 데이터 전송
// 번호 달기
// auto increment
// Post 요청
app.post('/add',function(요청,응답){
  
  응답.send('전송완료임')
  db.collection('counter').findOne({name: '게시물갯수'}, function(에러, 결과){
    console.log(결과.totalPost)
    var count= 결과.totalPost;//var let const 가능 게시물갯수 변수에 저장

    var save = {_id : count + 1,작성자 : 요청.user._id, 제목: 요청.body.title, 날짜: 요청.body.date, }
    db.collection('post').insertOne(save, function(){
      console.log('저장완료임')
      //operator
      // $set 바꿀값
      // $inc 증가
      // counter라는 콜렉션의 name을 찾아서 totalPost 값 1 증가하기
      db.collection('counter').updateOne({name: '게시물갯수'},{$inc:{totalPost: 1}},function(에러, 결과){
        if(에러){return console.log(에러)}
        응답.send('증가완료');

      })
    });
    // db.collection('counter').findOneAndUpdate({_id : totalPost},{$inc:{value: 1}},function(에러, 결과){
    //   응답.send('증가완료');
    // })
  });
})

// /list로 get요청으로 접속하면 db에 저장된 데이터들로 예쁘게 꾸며진 html 보여줌
app.get('/list',function(요청, 응답){
  //디비에 저장된 post라는 collection안의 데이터를 꺼내주세요
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과);
    //결과를 ejs안에 넣기
  응답.render('list.ejs',{posts : 결과});
  });//모든 데이터 가져오기

})

app.get('/detail/:id', function(요청, 응답){
  db.collection('post').findOne({_id: parseInt(요청.params.id)},function(에러 ,결과){
    console.log(결과)
    응답.render('detail.ejs',{ data : 결과})
  })
  
})
app.get('/edit/:id',function(요청,응답){
  db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러, 결과){
    console.log(결과)
    응답.render('edit.ejs',{post: 결과})
  })
})
app.put('/edit',function(요청,응답){
  db.collection('post').updateOne({_id : parseInt(요청.body.id)},{$set: {제목 : 요청.body.title, 날짜 : 요청.body.date}},function(에러, 결과){
    console.log('수정완료')
    응답.redirect('/list')
  })
})

//미들웨어 웸서버는 요청-응답 중간에 뭔가 실행되는 코드
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy
const session =require('express-session')

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session())

app.get('/login',function(요청, 응답){
  응답.render('login.ejs')
})
//passport.authnticate 인증
app.post('/login',passport.authenticate('local',{failureRedirect : '/fail'}),function(요청, 응답){
  응답.redirect('/')
})
//마이페이지
app.get('/mypage',logintrue,function(요청,응답){
  요청.user
  응답.render('mypage.ejs',{사용자 : 요청.user})
})

function logintrue(요청, 응답, next){
  if(요청.user){
    next()
  }else{
    응답.send('로그인안함')
  }
}

app.post('/chatroom', logintrue, function(요청, 응답){

  var saveData ={
    title : 'chatroom123',
    member: [요청.body.당한사람id,요청.user._id],
    date : new Date()
  }

  db.collection('chatroom').insertOne(saveData).then((결과)=>{
    응답.send('성공')
  })
})

app.get('/chat', logintrue, function(요청, 응답){ 

  db.collection('chatroom').find({ member : 요청.user._id }).toArray().then((결과)=>{
    console.log(결과);
    응답.render('chat.ejs', {data : 결과})
  })

});

app.post('/message', logintrue, function(요청, 응답){

  var save={
    parent : 요청.body.parent,
    content : 요청.body.content,
    userid : 요청.user._id,
    date : new Date(),
  }

  db.collection('message').insertOne(save).then(()=>{
    console.log('db저장성공')
    응답.send('db 저장성공')
  })
})

app.get('/message/:parentid', logintrue, function(요청, 응답){

  응답.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  db.collection('message').find({parent : 요청.params.id}).toArray()
  .then((결과)=>{
    응답.write('event: test\n');
    응답.write('data: '+JSON.stringify(결과)+'\n\n');
  })
  const pipeline=[
    {$match:{ 'fullDocument.parent' : 요청. params.id}}
  ];
  const collection =db.collection('message');
  const changeStream = collection.watch(pipeline);
  changeStream.on('change',(result)=>{
    console.log(result.fullDocument)
    응답.write('event: test\n');
    응답.write('data: '+JSON.stringify(result.fullDocument)+'\n\n');
  })
});

//인증하는방법을 Strategy
passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    //done -> 서버에러
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

//세션 검사
// id를 이용해서 세션을 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

// 나중에(마이페이지 접속시 실행)
passport.deserializeUser(function (아이디, done) {
  //위에있는 user.id로 유ㅜ저를 찾은 뒤에 유저 정보를 {에 넣음}
  db.collection('login').findOne({id : 아이디}, function(에러, 결과){
    done(null, {결과})
  })
}); 

app.post('/register',function(요청,응답){
  db.collection('login').insertOne({id : 요청.body.id, pw : 요청.body.pw}, function(에러, 결과){
    응답.redirect('/')
  })
})

// 삭제 db에서 찾아서 삭제하기
app.delete('/delete',function(요청,응답){
  console.log(요청.body)
  요청.body._id=parseInt(요청.body._id)

  var deleteData ={_id : 요청.body._id, 작성자 : 요청.user._id}
  db.collection('post').deleteOne(deleteData,function(에러, 결과){
    console.log('삭제했습니다')
    if(결과){console.log(결과)}
    응답.status(200).send({message : '성공함'});
  })

})

//aggregate Search index에서 검색하기

app.get('/search',(요청, 응답)=>{
  console.log(요청.query.value)
  var option = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: 요청.query.value,
          path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        }
      }
    },
    { $sort : {_id : 1}},
    { $limit : 10}, // 검색갯수
    { $project : { 제목 : 1, _id: 0,score:{$meta: 'searchScore'}}} // 필터주기
  ]
  db.collection('post').aggregate(option).toArray((에러, 결과)=>{
    console.log(결과)
    응답.render('search.ejs',{posts : 결과})
  })
})

app.use('/shop',require('./routes/shop.js'))//shop 관련 라우트들
app.use('/board/sub',require('./routes/board.js'))//board 관련 라우트들

let multer = require('multer');
var storage =multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './public/image')
  },
  filename : function(req,file,cb){
    cb(null, file.originalname + '날짜'+ new Date())
  },
  //파일 확장자로 거르기
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    callback(null, true)
  },
  //파일 사이즈
  limits:{
    fileSize: 1024 * 1024
  }
})

var upload = multer({storage : storage})

app.get('/upload',function(요청, 응답){
  응답.render('upload.ejs')
})

//이미지를 db에 저장하는 것보다 일반하드에 저장하는게 싸다
//.
app.post('/upload',upload.single('profile') ,function(요청, 응답){
  응답.send('업로드 완려')
});

app.get('/image/:imageName',function(요청, 응답){
  응답.sendFile( __dirname+'/public/image/'+요청.params.imageName)
})

// <!-- 요청은 4개 방식이 있음-->
// <!-- 1. 읽기 Get -->
// <!-- 2. 쓰기 Post -->
// <!-- 3. 수정 Put -->
// <!-- 4. 삭제 Delete -->

// <!-- 어떤사람이 /list 라는 페이지를 GET요청하면 거기 해당하는 list.html파일을 보내줌 -->
// <!-- node.js를 이용해서 javascript로 문법  -->

// <!-- html 웹페이지에 그림 글 쓰는거 가능 -->
// <!-- javaScript 웹페이지를 다이나믹하게 바꿔줌 -->
// <!-- javaScript 해석은 브라우저가 함(크롭 앳지 등) -->
// <!-- 크롬 v8 -->
// <!-- 파이어폭스 spidermonkey -->
// <!-- node.js v8 실행환경-->
// /////////////////////////////////

// <!-- node.js 특징 -->
// <!-- 빠른거 먼저함 Non-blocking i/o -->

// app.get('/add', function(요청, 응답){
//   응답.send('전송완료')
//   console.log(요청.body.date)
//   console.log(요청.body.title)
// })
// 이런게 api
// rest api
// api 란
// application programming interface
// 웹서버와 고객간의 소통방법
// 어떻게 해야 통신할 수 있을까
// rest api
// 1. uniform interface
// 2. client-server 역할구분
// 3. stateless
// 4. cacheable
// 5. layered system
// 6. code on demand

//회원인증 방식
//1. session
//2. token
//3. open authentication 