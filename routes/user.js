var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
var user_service = require('../services/userService');

router.post('/login', user_controller.loginMethod);
router.post('/register', user_controller.registerMethod);
router.post('/logout', function (req, res, next) {
    try {
        req.session.destroy();
        res.json({
            status: 0,
            message: '成功退出'
        });

    } catch (e) {
        res.json({
            status: 1,
            message: '退出失败'
        });
    }
});
router.post('/changeNickname', user_controller.changeNicknameMethod);
router.post('/changePassword', user_controller.changePasswordMethod);
router.post('/changeTransferPassword', user_controller.changeTransferPasswordMethod);
router.post('/getInformation', async function (req, res, next) {
    if (req.session['user'] !== undefined) {
        // console.log(req.session.user.phone);
        var query_user_result = await user_service.getUserByPhone(req.session.user.phone);
        res.json({
            status: 0,
            data: query_user_result.data
        });
    }
    res.json({status: 1});
});

module.exports = router;
