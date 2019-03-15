/**
 * @Description: 通用api，通常是直接查看session信息的方法
 * @author Li Xi
 * @date 2019-03-15
 */


var express = require('express');
var router = express.Router();

router.post('/getPhone', function (req, res, next) {
    var phone;
    if (req.session['user'] === undefined) {
        phone = '0';
    } else {
        phone = req.session.user.phone;
    }
    res.json({
        status: 0,
        phone: phone,
    });
});
router.post('/checkLogin', function (req, res, next) {
    if (req.session['user'] === undefined) {
        res.json({status: 1});
        return;
    }
    res.json({status: 0});
});
router.post('/getVerificationCode', function (req, res, next) {
    if (req.session['code'] === undefined) {
        res.json({
            status: 1,
            message: '请重新发送短信，获取验证码',
            data: null
        });
        return
    }
    res.json({
        status: 0,
        message: "获取验证码成功",
        data: req.session.code
    });
});

module.exports = router;
