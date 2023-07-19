var router =require('express').Router();

function logintrue(요청, 응답, next){
  if(요청.user){
    next()
  }else{
    응답.send('로그인안함')
  }
}

router.use('/shirts', logintrue);// 모든url에 적용할 미들웨어

router.get('/shirts',function(요청, 응답){
  응답.send('셔츠 파는 페이지입니다.');
});

router.get('/pants',function(요청, 응답){
  응답.send('바지 파는 페이지입니다.');
}); 

module.exports=router;