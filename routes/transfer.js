/**
 * @Description: transfer相关api
 * @author Li Xi
 * @date 2019-03-15
 */


var express = require('express');
var router = express.Router();
var transfer_controller = require('../controllers/transferController');

router.post('/getRecord', transfer_controller.getRecordMethod);
router.post('/transfer', transfer_controller.transferMethod);
router.post('/recharge', transfer_controller.rechargeMethod);
router.post('/withdraw', transfer_controller.withdrawMethod);

module.exports = router;
