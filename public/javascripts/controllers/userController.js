var bcrypt = require('bcrypt-nodejs');
var query = require('./databaseController');
var userService = require('../services/userService');
var session = require('express-session');

var exports = {
    loginMethod: function (req, res, next) {
        var input_phone = req.body.phone;
        var input_password = req.body.password;

        var sql = userService.getUserByPhone(input_phone);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                console.log(err);
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            // 成功获取数据库数据

            var user = vals[0]; // 用户数据
            var pwd = user.password;
            var salt = bcrypt.genSaltSync(10);
            var hash_pwd = bcrypt.hashSync(pwd, salt);

            // 与数据库中密码数据进行比对
            if (bcrypt.compareSync(input_password, hash_pwd)) {
                req.session.user = {
                    'id': user.id,
                    'nickname': user.nickname,
                    'phone': user.phone,
                };

                console.log('Success login!');
                res.json({
                    status: 0,
                    message: 'Success login!',
                });
            } else { // 密码输入错误
                console.log('Password error!');
                res.json({
                    status: 1,
                    message: 'Password error!',
                });
            }
        });
    },

    registerMethod: function (req, res, next) {
        var input_nickname = req.body.nickname;
        var input_phone = req.body.phone;
        var input_password = req.body.password;

        var sql = userService.addUser(input_nickname, input_phone, input_password);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                console.log(err);
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            // 成功获取数据库数据

            console.log('Success register!');
            res.json({
                status: 0,
                message: 'Success register!',
            });
        });
    }
};


module.exports = exports;