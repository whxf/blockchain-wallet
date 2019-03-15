/**
 * @Description: 关于用户的各类方法
 * @author Li Xi
 * @date 2019-03-15
*/

var user_service = require('../services/userService');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');


var exports = {
    loginMethod: async function (req, res, next) {
        var input_phone = req.body.phone;
        var input_password = req.body.password;
        var query_user_result = await user_service.getUserByPhone(input_phone);

        // console.log(query_user_result);
        if (query_user_result.status === 1) {
            res.json({
                status: 1,
                message: '查询用户失败！',
            });
            return;
        }

        if (query_user_result.data === null) {
            res.json({
                status: 1,
                message: '不存在该用户，请注册！',
            });
            return;
        }

        var user = query_user_result.data; // 用户数据

        // 与数据库中密码数据进行比对
        if (bcrypt.compareSync(input_password, user.password)) {
            if (req.session['user'] === undefined) {
                req.session.user = {
                    'id': user.id,
                    'nickname': user.nickname,
                    'phone': user.phone,
                    'error_time': 0,
                };
            }
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
    },

    registerMethod: async function (req, res, next) {
        var input_nickname = req.body.nickname;
        var input_phone = req.body.phone;
        var input_password = req.body.password;
        var input_transfer_password = req.body.transfer_password;
        input_password = bcrypt.hashSync(input_password, secret.hash_bcrypt);
        input_transfer_password = bcrypt.hashSync(input_transfer_password, secret.hash_bcrypt);

        var query_user_result = await user_service.getUserByPhone(input_phone);
        if (query_user_result.status === 1) {
            res.json({
                status: 1,
                message: '查询用户失败！',
            });
            return;
        }

        // console.log(query_user_result.data);

        if (query_user_result.data !== null) {
            res.json({
                status: 1,
                message: '该手机号已经被注册，请登录!',
            });
            return;
        }

        var add_user_result = await user_service.addUser(input_nickname, input_phone, input_password, input_transfer_password);
        if (add_user_result.status === 1) {
            res.json({
                status: 1,
                message: '注册失败！',
            });
        } else {
            res.json({
                status: 0,
                message: '注册成功！',
            });
        }
    },
    changeNicknameMethod: async function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }

        var phone = req.session.user.phone;
        var new_nickname = req.body.nickname;

        var set_nickname_result = await user_service.setUserNickname(phone, new_nickname);
        console.log(set_nickname_result);

        if (set_nickname_result.status === 1) {
            res.json({
                status: 1,
                message: '修改用户名失败！',
            });
        } else {
            req.session.user.nickname = new_nickname;
            res.json({
                status: 0,
                message: '修改用户名成功！',
            });
        }
    },
    changePasswordMethod: async function (req, res, next) {
        var phone = req.body.phone;
        var input_password = req.body.password;
        input_password = bcrypt.hashSync(input_password, secret.hash_bcrypt);

        var set_password_result = await user_service.setUserPassword(phone, input_password);

        if (set_password_result.status === 1) {
            res.json({
                status: 1,
                message: '修改登录密码失败！',
            });
        } else {
            res.json({
                status: 0,
                message: '修改登录密码成功！',
            });
        }
    },
    changeTransferPasswordMethod: async function (req, res, next) {
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

        var set_transfer_password_result = await user_service.setUserTransferPassword(phone, input_password);

        if (set_transfer_password_result.status === 1) {
            res.json({
                status: 1,
                message: '修改支付密码失败！',
            });
        } else {
            req.session.user.error_time = 0;
            res.json({
                status: 0,
                message: '修改支付密码成功！',
            });
        }
    },
};

module.exports = exports;