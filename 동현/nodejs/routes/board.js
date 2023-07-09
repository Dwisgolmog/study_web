var router = require('express').Router();

function loginCheck(req, res, next) {
    if (req.user) {
        next();  //user가 있으면 통과
    } else {
        console.log(req.user);
        console.log('loginCheck 오류발생!');
        return res.status(400).send({ message: '로그인을 해주세요!',showAlert:true}); //user가 없으면 메세지 출력
    }
}

//모든 라우터들에게 해당 미들웨어를 적용함
router.use(loginCheck);
//또는 원하는 라우터경로에만 미들웨어를 적용할 수 있음
//router.use('/gaem',loginCheck);

router.get('/sports',function(req,res){
    res.send('Welcome Sports Board!!');
})

router.get('/game',function(req,res){
    res.send('Welcome Game Board!!');
})

module.exports = router;
