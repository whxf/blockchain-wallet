var express = require('express');
var router = express.Router();

var user_controller = require('../public/javascripts/controllers/user');


/* GET home page. */
router.get('/login', user_controller.login);
router.get('/logout', user_controller.logout);
router.get('/register', user_controller.register);
router.get('/', user_controller.home);

module.exports = router;
