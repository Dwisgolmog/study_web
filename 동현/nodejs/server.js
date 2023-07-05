const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
//crypto를 사용해서 비밀번호 암호화하기
const crypto = require('crypto')
require('dotenv').config();

//ejs 사용
app.set('view engine', 'ejs');

//npm install method-override 사용
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//static 파일을 보관하기 위해 public 폴더를 쓸것임
app.use('/public', express.static('public'));

var db;
//몽고 DB 연결
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (e, client) {
    if (e) return console.log(e);

    db = client.db('todoapp');

    app.listen(process.env.PORT, function () {
        console.log('listening on 8080')
    })

})


app.get('/write', function (rq, rp) {
    rp.render('write.ejs');
})

//  => '/' 은 홈페이지
app.get('/', function (rq, rp) {
    rp.render('index.ejs');
})


// /add라는 경로로  POST 요청이 왔을경우
app.post('/add', function (request, response) {
    //response.send('전송 성공');
    response.send("<script>alert('전송 성공'); window.location.href = '/write';</script>");

    // counter라는 DB에 있는 게시물갯수를 가져옴
    db.collection('counter').findOne({ name: '게시물갯수' }, function (e, result) {
        var totalPost = result.totalPost

        //post라는 DB에 응답.name의 값을 저장함
        db.collection('post').insertOne({ _id: totalPost + 1, 제목: request.body.title, 날짜: request.body.date }, function (e, result) {
            console.log('저장완료');

            // $set ==> 바꿀값 , $inc ==> 기존값에 더해줄 값
            db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (e, result) {
                if (e) { return console.log(e) }
            })
        });


    })
})

app.get('/list', function (rq, rp) {

    // post에 저장된 모든 데이터를 가져올수 있음
    db.collection('post').find().toArray(function (e, result) {
        console.log(result);
        //모든 데이터의 값을 posts라는 이름으로 ejs파일에 넣는다.
        rp.render('list.ejs', { posts: result });
    });

})

app.delete('/delete', function (rq, rp) {
    console.log(rq.body);
    rq.body._id = parseInt(rq.body._id);
    db.collection('post').deleteOne(rq.body, function (e, result) {
        console.log('삭제완료');
        //서버에 응답 성공(200)이라고 전해줌
        rp.status(200).send({ message: '성공했습니다' });
    })
})

// :id ==> url의 파라미터와 같음
app.get('/detail/:id', function (req, res) {
    // :id 값과 동일한  post DB의 id를 가져옴
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (e, result) {
        if (result == null) {
            res.send('존재하지 않는 게시물입니다.');
        }
        console.log(result);
        res.render('detail.ejs', { data: result });
    })
})

app.get('/edit/:id', function (req, res) {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (e, result) {
        if (result == null) {
            res.send('존재하지 않는 게시물입니다.');
        }
        res.render('edit.ejs', { data: result });
    })

})

app.put('/edit', function (req, res) {
    db.collection('post').updateOne({ _id: parseInt(req.body.id) },
        { $set: { 제목: req.body.title, 날짜: req.body.date } }, function (e, result) {
            console.log("수정 완료");
            //수정 완료시 /list 페이지로 이동
            res.redirect('/list');
        });

})




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const GridFSBucket = require('mongodb/lib/gridfs-stream');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


//How(어떻게 인증할지) 작성
// 형식 --> LocalStrategy( { 설정 }, function(){ 아이디비번 검사하는 코드 } )
passport.use(new LocalStrategy({
    usernameField: 'email', //사용자가 제출한 아이디 위치
    passwordField: 'pw', //사용자가 제출한 비번 위치
    session: true,       //세션 유무
    passReqToCallback: false, //다른 정보 필요 유무
}, function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ email: 입력한아이디 }, function (에러, 결과) {
        if (에러) return done(`login error!!:${에러}`);

        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
        //암호화한 값 불러오기
        //console.log(결과.salt);
        const pw = hashTest(결과.salt,입력한비번);
        if (pw == 결과.pw) {
            //성공시 해달 결과값이 아래의 serializeUser의 user에 저장됨
            return done(null, 결과)
        } else {
            return done(null, false, { message: '비번틀렸어요' })
        }
    })
}));

app.get('/login', function (req, res) {
    res.render('login.ejs');
})

//passport 라이브러리를 이용하여 local 방식으로 아이디 비번 검사, 실패시(failureRedirect) --> /fail 페이지로 이동
app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function (req, res) {
    //login으로 post 요청시 홈 페이지로 이동
    res.redirect('/');
})

app.get('/mypage', loginCheck, function (req, res) {
    res.render('myPage.ejs', { user: req.user });
})

//미들웨어 검사 함수
function loginCheck(req, res, next) {
    if (req.user) {
        next();  //user가 있으면 통과
    } else {
        res.send('You not login!'); //user가 없으면 메세지 출력
    }
}

//유저의 id 데이터로 세션데이터 만들어줌 -->세션데이터아이디를 쿠키로 만들어 브라우저로 보내줌
passport.serializeUser(function (user, done) {
    done(null, user.email)
});

// 마이페이지 접속시 실행되는 함수
// 로그인한 사용자의 정보를 넘겨줌
passport.deserializeUser(function (아이디, done) {
    db.collection('login').findOne({ email: 아이디 }, function (e, result) {
        done(null, result)
    })
});

app.get('/signup', function (req, res) {
    res.render('signUp.ejs');
})

app.post('/signUp', function (req, res) {
    //아이디 중복확인
    db.collection('login').findOne({ email: req.body.email }, function (e, result) {
        //중복이 아닐시
        if (result != null) {
            //아이디가 중복임을 알리고 회원가입 다시하기
            res.send("<script>alert('아이디가 중복입니다! 다시 시도해주세요.'); window.location.href = '/signUp';</script>");
        } else { //중복이 아닐시
            //비밀번호 암호화
            const pwInformation = hashTest(null,req.body.pw);            
            //회원가입창에 있는 내용을 DB에 저장
            db.collection('login').insertOne({ email: req.body.email,salt:pwInformation[0] ,pw: pwInformation[1], ad1: req.body.ad1, ad2: req.body.ad2, name: req.body.name }, function (e, result) {
                if (e) console.log(`error!!:${e}`);
            })

            //회원가입 성공시 alert창과 함께 로그인 페이지로 이동
            res.send("<script>alert('회원 가입 성공!'); window.location.href = '/login';</script>");  

        }
    })
})

//암호화 해주는 함수
function hashTest(salt,password) {
    //salt에 null값이 들어왔을때는 회원가입으로 간주하고 salt값 생성
    if(salt == null){
        const pwInformation = [];
        //salt를 생성해서 db에 저장
        const salt = crypto.randomBytes(32).toString('hex')
        pwInformation.push(salt);
        pwInformation.push(crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex'));
        return pwInformation;
    }

    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex')
}
