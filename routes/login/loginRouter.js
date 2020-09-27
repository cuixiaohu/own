var express = require('express');
var router = express.Router();
var sqlQuery = require('../../module/mysql')
var crypto = require('crypto')

function jiami(str) {
    let salt = "asfasfasgasggasdas"
    let obj = crypto.createHash('md5')
    str = salt + str
    obj.update(str)
    return obj.digest('hex')
}
router.get('/login', function (req, res, next) {
    res.render('')
});
router.get('/register', function (req, res, next) {
    res.render('')
})
//注册
router.post('/register', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // //判断用户是否存在，如果没有用户才进行插入
    let sqlStr = "select * from user where username = ?"
    let result = await sqlQuery(sqlStr, [username])
    if (result.length != 0) {
        //告知此用户名已经存在，请直接登录或者找寻密码
        // res.render('info/info', {
        //     title: '注册失败',
        //     content: '用户已存在',
        //     href: "/rl/login",
        //     hrefText: "注册页"
        // })
        let obj = {
            code: 400,
            msg: 'err',
            data: {},
        }
        res.send(obj)
    } else {
        //告知注册成功
        sqlStr = "insert into user (username,password,roleid) values (?,?,1)"
        await sqlQuery(sqlStr, [username, jiami(password)])
        // res.render('info/info', {
        //     title: '注册成功',
        //     content: '注册成功，即将进入登录页',
        //     href: "/rl/login",
        //     hrefText: "登录页"
        // })
        let obj = {
            code: 200,
            msg: 'ok',
            data: {}
        }
        res.send(obj)
    }
})
router.post('/login', async (req, res) => {
    //登录
    let name = req.body.username
    let word = req.body.password
    let sqlStr1 = "select * from user where username= ? and password= ? "
    let result1 = await sqlQuery(sqlStr1, [name, jiami(word)])
    if (result1.length != 0) {
        // res.render('info/info', {
        //     title: '登录成功',
        //     content: '立即跳转至后台页面',
        //     href: "/admin",
        //     hrefText: "后台页面"
        // })
        let obj = {
            code: 200,
            msg: 'ok',
            data: {
                isLogin: true
            },
        }
        res.send(obj)
    } else {
        let obj = {
            code: 400,
            msg: 'err',
            data: {
            }
        }
        res.send(obj)
    }
    // } else {
    //     req.session.name = name
    //     res.render('info/info', {
    //         title: '登录失败',
    //         content: '用户名不存在或者密码错误',
    //         href: "/rl/login",
    //         hrefText: "登录页"
    //     })

    //注册
    //获取username和密码
    // let username = req.body.name;
    // let password = req.body.confirmPassword;
    // //判断用户是否存在，如果没有用户才进行插入
    // let sqlStr = "select * from user where username = ?"
    // let result = await sqlQuery(sqlStr, [username])
    // if (result.length != 0) {
    //     //告知此用户名已经存在，请直接登录或者找寻密码
    //     res.render('info/info', {
    //         title: '注册失败',
    //         content: '用户已存在',
    //         href: "/rl/login",
    //         hrefText: "注册页"
    //     })
    // } else {
    //     //告知注册成功
    //     sqlStr = "insert into user (username,password,roleid) values (?,?,1)"
    //     await sqlQuery(sqlStr, [username, jiami(password)])
    //     res.render('info/info', {
    //         title: '注册成功',
    //         content: '注册成功，即将进入登录页',
    //         href: "/rl/login",
    //         hrefText: "登录页"
    //     })
    // }
})

router.get('/delSession', (req, res) => {
    req.session.destroy()
    let obj = {
        code: 200,
        msg: 'ok',
        data: {
            isLogin: false
        },
    }
    res.send(obj)
})
module.exports = router;