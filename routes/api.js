var express = require('express');
var router = express.Router();

var user_controller = require('../public/javascripts/controllers/userController');
var transfer_controller = require('../public/javascripts/controllers/transferController');
var transferService = require('../public/javascripts/services/transferService');
var query = require('../public/javascripts/controllers/dataController');

var QcloudSms = require('qcloudsms_js');
var secret = require('../public/javascripts/constants/secret');

// ================ get method =====================

router.post('/getRecord', transfer_controller.getRecordMethod);

router.post('/getSessionData', function (req, res, next) {
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

router.post('/getUserInfo', function (req, res, next) {
    var nickname;
    var balance;
    if (req.session['user'] === undefined) {
        nickname = null;
        balance = 0;
        res.json({
            status: 1,
            nickname: nickname,
            balance: balance,
        });
        return;
    }
    var querySql = transferService.getBalance(req.session.user.phone);

    query(querySql, function (err, vals, fields) {
        if (err) {
            nickname = null;
            balance = 0;
            res.json({
                status: 1,
                nickname: nickname,
                balance: balance,
                phone: req.session.user.phone,
            });
            return;
        }

        balance = vals[0].balance;
        nickname = req.session.user.nickname;
        res.json({
            status: 0,
            nickname: nickname,
            balance: balance,
            phone: req.session.user.phone,
        });
    });
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

// ================ set method =====================

router.post('/changeNickname', user_controller.changeNicknameMethod);

router.post('/changePassword', user_controller.changePasswordMethod);

router.post('/changeTransferPassword', user_controller.changeTransferPasswordMethod);

// ================ 短信 method =====================

router.post('/sendMessage', function (req, res, next) {
    var user_phone = req.body.phone;
    var appid = secret.message_sdk_appid;
    var appkey = secret.message_appkey;
    var templateId = 277996;
    var smsSign = "淅淅沥沥";
    var qcloudsms = QcloudSms(appid, appkey);
    var verification_code = Math.random().toString().slice(-6);


    function callback(err) {
        if (err) {
            res.json({
                status: 1,
                message: '发送短信失败，请稍后重试'
            });
        }
        res.json({
            status: 0,
            message: '发送成功',
        });
    }

    req.session.code = verification_code;

    var ssender = qcloudsms.SmsSingleSender();
    var params = [verification_code, 10];
    ssender.sendWithParam(86, user_phone, templateId,
        params, smsSign, "", "", callback);
});

// ================ check method =====================

router.post('/checkLogin', function (req, res, next) {
    if (req.session['user'] === undefined) {
        res.json({
            status: 1,
        });
        return
    }
    res.json({
        status: 0,
    });
});

module.exports = router;
