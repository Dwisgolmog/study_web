var router = require('express').Router();

router.get('/shirts',function(req,res){
    res.send('sell the shirts');
})

router.get('/pants',function(req,res){
    res.send('sell the pants');
})

module.exports = router;