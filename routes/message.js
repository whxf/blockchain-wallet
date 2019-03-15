var express = require('express');
var router = express.Router();
var QcloudSms = require('qcloudsms_js');
var secret = require('../config/secret');

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

module.exports = router;
