var express = require('express');
var router = express.Router();
var sqlQuery = require('../../module/mysql')
router.get('/', async function (req, res, next) {
    let phone = req.query.phone
    let name = req.query.name
    let age = req.query.age
    let card = req.query.card
    let openid = req.query.openid
    let sex = req.query.sex
    let sqlStr = "UPDATE wxuser SET phone = ?,name = ?,age = ?,card = ?,sex = ? WHERE openid = ?"
    let result = await sqlQuery(sqlStr, [phone, name, age, card, sex, openid])
    console.log(result.changedRows)
    if (result) {
        let obj = {
            code: 200,
            msg: 'ok',
            data: {}
        }
        res.send(obj)
    }
});

router.get('/userInfo',async function(req,res,next){
    let openid = req.query.openid
    let sqlStr = "select * from wxuser where openid= ?"
    let result = await sqlQuery(sqlStr,[openid])
    let obj = {
        code:200,
        msg:'ok',
        data:{result}
    }
    res.send(obj)
})
module.exports = router;
