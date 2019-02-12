var express = require('express');
var router = express.Router();

var transfer_controller = require('../public/javascripts/controllers/transferController');

router.post('/getRecord', transfer_controller.getRecordMethod);
router.post('/getSessionData', function (req, res, next) {
    var phone;
    if (req.session['user'] === undefined) {
        phone = '0';
    }
    else{
        phone = req.session.user.phone;
    }
    res.json({
        status: 0,
        phone: phone,
    });
});

module.exports = router;
