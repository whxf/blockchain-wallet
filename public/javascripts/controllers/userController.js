var bcrypt = require('bcrypt-nodejs');
var query = require('./dataController');
var userService = require('../services/userService');
var transferService = require('../services/transferService');
var secret = require('../constants/secret');

var exports = {
    loginMethod: function (req, res, next) {
        var input_phone = req.body.phone;
        var input_password = req.body.password;

        var sql = userService.getUserByPhone(input_phone);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            // 成功获取数据库数据

            if (vals.length === 0) {
                res.json({
                    status: 1,
                    message: '不存在该用户，请注册！',
                });
                return;
            }

            var user = vals[0]; // 用户数据

            // 与数据库中密码数据进行比对
            if (bcrypt.compareSync(input_password, user.password)) {
                req.session.user = {
                    'id': user.id,
                    'nickname': user.nickname,
                    'phone': user.phone,
                    'error_time': 0,
                };

                res.json({
                    status: 0,
                    message: '登录成功！',
                });
            } else {
                res.json({
                    status: 1,
                    message: '密码错误，请重新输入密码！',
                });
            }
        });
    },

    registerMethod: function (req, res, next) {
        var input_nickname = req.body.nickname;
        var input_phone = req.body.phone;
        var input_password = req.body.password;
        var input_transfer_password = req.body.transfer_password;
        input_password = bcrypt.hashSync(input_password, secret.hash_bcrypt);
        input_transfer_password = bcrypt.hashSync(input_transfer_password, secret.hash_bcrypt);

        var sql = userService.getUserByPhone(input_phone);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            if (vals.length > 0) {
                res.json({
                    status: 1,
                    message: '该手机号已经被注册，请登录!',
                });
                return;
            }

            var sql2 = userService.addUser(input_nickname, input_phone, input_password, input_transfer_password);
            query(sql2, function (err, vals, fields) {
                // mysql insert 出现错误
                if (err) {
                    res.json({
                        status: 1,
                        message: err,
                    });
                } else {
                    res.json({
                        status: 0,
                        message: '注册成功！',
                    });
                }
            });
        });
    },
    changeNicknameMethod: function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }
        var phone = req.session.user.phone;
        var new_nickname = req.body.nickname;

        var sql = userService.setUserNickname(phone, new_nickname);

        query(sql, function (err, vals, fields) {
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
            } else {
                req.session.user.nickname = new_nickname;
                res.json({
                    status: 0,
                    message: '修改成功！',
                });
            }
        });
    },
    changePasswordMethod: function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }
        var phone = req.body.phone;
        var input_password = req.body.password;
        input_password = bcrypt.hashSync(input_password, secret.hash_bcrypt);

        var sql = userService.setUserPassword(phone, input_password);

        query(sql, function (err, vals, fields) {
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
            } else {
                res.json({
                    status: 0,
                    message: '修改密码成功！',
                });
            }
        });
    },
    changeTransferPasswordMethod:function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }
        var phone = req.body.phone;
        var input_password = req.body.password;
        input_password = bcrypt.hashSync(input_password, secret.hash_bcrypt);

        var sql = userService.setUserTransferPassword(phone, input_password);

        query(sql, function (err, vals, fields) {
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
            } else {
                res.json({
                    status: 0,
                    message: '修改密码成功！',
                });
            }
        });
    },
};


module.exports = exports;