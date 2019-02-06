var express = require('express');
var router = express.Router();

var user_controller = require('../public/javascripts/controllers/user');
var login_controller = require('../public/javascripts/controllers/loginController');
var transfer_controller = require('../public/javascripts/controllers/transferController');


router.get('/login', user_controller.login);
router.post('/login', login_controller.compare_password);

router.get('/logout', user_controller.logout);
router.get('/register', user_controller.register);
router.get('/transfer', user_controller.transfer);
router.get('/', user_controller.home);
router.post('/transfer', transfer_controller.transfer);
module.exports = router;
