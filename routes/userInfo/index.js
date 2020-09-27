var express = require('express');
var router = express.Router();
var sqlQuery = require('../../module/mysql')
var urlencode = require('urlencode')
router.get('/',async function(req, res, next) {
  let nickName = req.query.nickName;
  let avatarUrl = req.query.avatarUrl;
  let openid = req.query.openid;
  let a = urlencode.encode(nickName)
  let b = urlencode.encode(avatarUrl)
  let sqlStr = "select * from wxuser where nickName = ?"
  let result = await sqlQuery(sqlStr,[a])
  if(result.length != 0 ){
      let obj = {
          code:400,
          msg:'用户名已存在',
          data:{}
      }
      res.send(obj)
  }else{
      sqlStr = "insert into wxuser (nickName,avatarUrl,openid) values (?,?,?)"
      await sqlQuery(sqlStr,[a,b,openid])
      let obj = {
          code:200,
          msg:'ok',
          data:{}
      }
      res.send(obj)
  }
});

module.exports = router;
