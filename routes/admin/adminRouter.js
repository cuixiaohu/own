var express = require('express');
var router = express.Router();
var userRouter = require('./userRouter')
var newsRouter = require('./newsRouter')
var doctorsRouter = require('./doctorsRouter')
var patientsRouter = require('./patientsRouter')

//判断是否符合条件进入后台
function permisson(req, res, next) {
    if (req.session.name == undefined) {
        //没登录
        // res.render('info/info', {
        //     title: '尚未登录',
        //     content: '请重新登录',
        //     href: '/rl/login',
        //     hrefText: '登录页'
        next()

        // })
    } else {


    }
}
router.get('/', permisson, function (req, res, next) {
    res.send('后台首页');
});
//后台用户管理
router.use('/user', userRouter)
//后台新闻管理
router.use('/news', newsRouter)
//后台医生管理
router.use('/doctors', doctorsRouter)
//后台患者管理
router.use('/patients', patientsRouter)
module.exports = router;