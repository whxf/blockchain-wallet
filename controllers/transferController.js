var user_service = require('../services/userService');
var bcrypt = require('bcrypt-nodejs');
require('date-utils');

var createRecord = require('./blockchainController').createRecord;
var queryRecord = require('./blockchainController').queryRecord;

var exports = {
    transferMethod: async function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = parseFloat(req.body.transfer_amount);
        var transfer_password = req.body.password;

        // 检查用户登录状态
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '转账前请登录！',
            });
            return;
        }

        var sender = req.session.user.phone;
        var transfer_type = '2';

        var query_user_result = await user_service.getUserByPhone(sender);
        if (query_user_result.status === 1) {
            res.json(query_user_result);
        }

        // 检查用户冻结状态
        if (query_user_result.data.freeze_time >= (new Date())) {
            res.json({
                status: 1,
                message: '账户冻结中，请稍后尝试！',
            });
            return;
        }

        // 检查密码
        var password = query_user_result.data.transfer_password;
        if (bcrypt.compareSync(transfer_password, password) === false) {
            req.session.user.error_time += 1;
            if (req.session.user.error_time >= 5) {
                var freeze_user_result = await user_service.setUserFreezeTime(req.session.user.phone);
                if (freeze_user_result.status === 0) {
                    res.json({
                        status: 1,
                        message: '支付密码输错次数过多，账户冻结5小时！',
                    });
                    return;
                }
            }
            var time_leave = 5 - req.session.user.error_time;
            if (time_leave < 0) {
                time_leave = 0;
            }
            res.json({
                status: 1,
                message: '支付密码输入错误，还剩' + (time_leave).toString() + '次尝试机会！',
            });
            return;
        }

        // sender receiver 检验
        req.session.user.error_time = 0;
        if (sender === receiver) {
            res.json({
                status: 1,
                message: '请不要给自己转账',
            });
            return;
        }

        // 检查账户余额
        var query_sender_balance_result = await user_service.getBalance(sender);
        if (query_sender_balance_result.status === 1) {
            res.json(query_sender_balance_result);
            return;
        }

        var sender_balance = parseFloat(query_sender_balance_result.data.balance);
        if (sender_balance < transfer_amount) {
            res.json({
                status: 1,
                message: '账户余额不足，请充值',
            });
            return;
        }

        sender_balance = sender_balance - transfer_amount;
        sender_balance = sender_balance.toFixed(2);

        var query_receiver_balance_result = await user_service.getBalance(receiver);
        if (query_receiver_balance_result.status === 1) {
            res.json(query_receiver_balance_result);
            return;
        }

        // 创建转账记录
        var receiver_balance = parseFloat(query_receiver_balance_result.data.balance);
        var method_result = await createRecord(sender, receiver, transfer_amount, transfer_type);
        if (method_result.status === 1) {
            res.json({
                status: 1,
                message: method_result.message
            });
            return;
        }

        receiver_balance = receiver_balance + transfer_amount;
        receiver_balance = receiver_balance.toFixed(2);

        // 修改账户余额
        var set_sender_balance_result = await user_service.setBalance(sender, sender_balance);
        var set_receiver_balance_result = await user_service.setBalance(receiver, receiver_balance);

        if (set_sender_balance_result.status === 0
            && set_receiver_balance_result.status === 0) {
            res.json({
                status: method_result.status,
                message: method_result.message,
            });
            return;
        }

        res.json({
            status: 1,
            message: '转账失败',
        });
    },

    rechargeMethod: async function (req, res, next) {
        var recharge_amount = parseFloat(req.body.recharge_amount);
        var transfer_password = req.body.password;

        // 登录检查
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }

        var sender = 'alipay';
        var type = '1';
        var receiver = req.session.user.phone;

        var query_user_result = await user_service.getUserByPhone(receiver);
        if (query_user_result.status === 1) {
            res.json(query_user_result);
        }


        // 检查用户冻结状态
        if (query_user_result.data.freeze_time >= (new Date())) {
            res.json({
                status: 1,
                message: '账户冻结中，请稍后尝试！',
            });
            return;
        }

        // 检查密码
        var password = query_user_result.data.transfer_password;
        if (bcrypt.compareSync(transfer_password, password) === false) {
            req.session.user.error_time += 1;
            if (req.session.user.error_time >= 5) {
                var freeze_user_result = await user_service.setUserFreezeTime(req.session.user.phone);
                if (freeze_user_result.status === 0) {
                    res.json({
                        status: 1,
                        message: '支付密码输错次数过多，账户冻结5小时！',
                    });
                    return;
                }
            }
            var time_leave = 5 - req.session.user.error_time;
            if (time_leave < 0) {
                time_leave = 0;
            }
            res.json({
                status: 1,
                message: '支付密码输入错误，还剩' + (time_leave).toString() + '次尝试机会！',
            });
            return;
        }

        // 获取用户余额
        var get_balance_result = await user_service.getBalance(receiver);
        if (get_balance_result.status === 1) {
            res.json(get_balance_result);
            return;
        }

        // 创建充值记录
        var method_result = await createRecord(sender, receiver, recharge_amount, type);
        if (method_result.status === 1) {
            res.json({
                status: 1,
                message: method_result.message
            });
            return;
        }

        // 修改账户余额
        var balance = parseFloat(get_balance_result.data.balance) + recharge_amount;
        balance = balance.toFixed(2);
        var set_balance_result = await user_service.setBalance(receiver, balance);
        if (set_balance_result.status === 1) {
            res.json(set_balance_result);
        } else {
            res.json({
                status: method_result.status,
                message: method_result.message,
            });
        }
    },
    withdrawMethod: async function (req, res, next) {
        var withdraw_amount = parseFloat(req.body.withdraw_amount);
        var transfer_password = req.body.password;

        // 检查登录状态
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }

        var sender = req.session.user.phone;
        var type = '3';
        var receiver = 'alipay';

        var query_user_result = await user_service.getUserByPhone(sender);
        if (query_user_result.status === 1) {
            res.json(query_user_result);
        }


        // 检查用户冻结状态
        if (query_user_result.data.freeze_time >= (new Date())) {
            res.json({
                status: 1,
                message: '账户冻结中，请稍后尝试！',
            });
            return;
        }

        // 检查密码
        var password = query_user_result.data.transfer_password;
        if (bcrypt.compareSync(transfer_password, password) === false) {
            req.session.user.error_time += 1;
            if (req.session.user.error_time >= 5) {
                var freeze_user_result = await user_service.setUserFreezeTime(req.session.user.phone);
                if (freeze_user_result.status === 0) {
                    res.json({
                        status: 1,
                        message: '支付密码输错次数过多，账户冻结5小时！',
                    });
                    return;
                }
            }
            var time_leave = 5 - req.session.user.error_time;
            if (time_leave < 0) {
                time_leave = 0;
            }
            res.json({
                status: 1,
                message: '支付密码输入错误，还剩' + (time_leave).toString() + '次尝试机会！',
            });
            return;
        }
        req.session.user.error_time = 0;

        // 获取用户余额
        var get_balance_result = await user_service.getBalance(sender);
        if (get_balance_result.status === 1) {
            res.json(get_balance_result);
            return;
        }


        // 检查余额是否充足
        if (parseFloat(get_balance_result.data.balance) < withdraw_amount) {
            res.json({
                status: 1,
                message: '超出提现额度',
            });
            return;
        }

        // 创建提现记录
        var method_result = await createRecord(sender, receiver, withdraw_amount, type);
        if (method_result.status === 1) {
            res.json({
                status: 1,
                message: method_result.message
            });
            return;
        }

        // 修改账户余额
        var balance = parseFloat(get_balance_result.data.balance) - withdraw_amount;
        balance = balance.toFixed(2);
        var set_balance_result = await user_service.setBalance(sender, balance);
        if (set_balance_result.status === 1) {
            res.json(set_balance_result);
        } else {
            res.json({
                status: method_result.status,
                message: method_result.message,
            });
        }
    },

    getRecordMethod: async function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }

        var user_phone = req.session.user.phone;
        var query_result = await queryRecord(user_phone);

        if (query_result.status === 0) {
            res.json({
                status: query_result.status,
                message: query_result.message,
                data: JSON.parse(query_result.data),
            });
        } else {
            res.json({
                status: query_result.status,
                message: query_result.message,
            });
        }
    }
};

module.exports = exports;