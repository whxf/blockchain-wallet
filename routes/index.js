var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');

router.get('/', index_controller.home);
router.get('/login', index_controller.login);
router.get('/register', index_controller.register);
router.get('/transfer', index_controller.transfer);
router.get('/dashboard', index_controller.dashboard);
router.get('/record', index_controller.record);
router.get('/recharge', index_controller.recharge);
router.get('/withdraw', index_controller.withdraw);
router.get('/information', index_controller.information);
router.get('/changePassword', index_controller.changePassword);

module.exports = router;
