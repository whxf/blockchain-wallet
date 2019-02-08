var express = require('express');
var router = express.Router();

var index_controller = require('../public/javascripts/controllers/indexController');
var user_controller = require('../public/javascripts/controllers/userController');
var transfer_controller = require('../public/javascripts/controllers/transferController');

router.get('/', index_controller.home);

router.get('/login', index_controller.login);
router.post('/login', user_controller.loginMethod);

router.get('/logout', index_controller.logout);

router.get('/register', index_controller.register);
router.post('/register', user_controller.registerMethod);

router.get('/transfer', index_controller.transfer);
router.post('/transfer', transfer_controller.transfer);

module.exports = router;
