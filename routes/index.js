var express = require('express');
var router = express.Router();

var index_controller = require('../public/javascripts/controllers/indexController');
var user_controller = require('../public/javascripts/controllers/userController');
var transfer_controller = require('../public/javascripts/controllers/transferController');

router.get('/', index_controller.home);

router.get('/login', index_controller.login);
router.post('/login', user_controller.loginMethod);

router.get('/register', index_controller.register);
router.post('/register', user_controller.registerMethod);

router.get('/transfer', index_controller.transfer);
router.post('/transfer', transfer_controller.transferMethod);

router.get('/dashboard', index_controller.dashboard);

router.get('/record', index_controller.record);

router.get('/recharge', index_controller.recharge);
router.post('/recharge', transfer_controller.rechargeMethod);

router.get('/withdraw', index_controller.withdraw);
router.post('/withdraw', transfer_controller.withdrawMethod);

module.exports = router;
