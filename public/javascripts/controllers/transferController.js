var format = require('string-format');
var query = require('./dataController');
var transferService = require('../services/transferService');
var userService = require('../services/userService');
var config = require('../constants/conf');


var exports = {
    transferMethod: function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = parseFloat(req.body.transfer_amount);

        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '转账前请登录！',
            });
            return;
        }

        var sender = req.session.user.phone;
        var transfer_type = '2';

        if (sender === receiver) {
            res.json({
                status: 1,
                message: '请不要给自己转账',
            });
            return;
        }

        var sender_balance;
        var receiver_balance;

        var querySenderBalance = transferService.getBalance(sender);
        query(querySenderBalance, function (err, vals, fields) {
            var balance = parseFloat(vals[0].balance);
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }
            if (balance < transfer_amount) {
                res.json({
                    status: 1,
                    message: '账户余额不足，请充值',
                });
                return;
            }
            sender_balance = balance - transfer_amount;

            var queryReceiverBalance = transferService.getBalance(receiver);
            query(queryReceiverBalance, function (err, vals, fields) {

                var balance = parseFloat(vals[0].balance);

                if (err) {
                    res.json({
                        status: 1,
                        message: err,
                    });
                    return;
                }
                receiver_balance = balance + transfer_amount;


                var setSenderBalance = transferService.setBalance(sender, sender_balance);
                var setReceiverBalance = transferService.setBalance(receiver, receiver_balance);

                query(setSenderBalance, function (err, vals, fields) {
                    if (err) {
                        res.json({
                            status: 1,
                            message: err,
                        });
                        return;
                    }
                    query(setReceiverBalance, function (err, vals, fields) {
                        if (err) {
                            res.json({
                                status: 1,
                                message: err,
                            });
                            return;
                        }

                        var inset_transfer = transferService.addRecord(sender, receiver, transfer_amount, transfer_type);

                        query(inset_transfer, function (err, vals, fields) {
                            if (err) {
                                res.json({
                                    status: 1,
                                    message: err,
                                });
                                return;
                            }
                            res.json({
                                status: 0,
                                message: '转账成功',
                            });
                        });
                    });
                });

            });

        });


    },
    rechargeMethod: function (req, res, next) {
        var recharge_amount = parseFloat(req.body.recharge_amount);
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

        var getQuery = transferService.getBalance(receiver);
        query(getQuery, function (err, vals, fields) {
            console.log(vals);
            if (err) {
                console.log(err);
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            var balance = parseFloat(vals[0].balance) + recharge_amount;
            var setQuery = transferService.setBalance(receiver, balance);
            query(setQuery, function (err, vals, fields) {
                if (err) {
                    console.log(err);
                    res.json({
                        status: 1,
                        message: err,
                    });
                    return;
                }
                var insertQuery = transferService.addRecord(sender, receiver, recharge_amount, type);
                query(insertQuery, function (err, vals, fields) {
                    if (err) {
                        console.log(err);
                        res.json({
                            status: 1,
                            message: err,
                        });
                        return;
                    }

                    res.json({
                        status: 0,
                        message: '充值成功',
                    });
                });
            });
        });
    },
    withdrawMethod: function (req, res, next) {
        var withdraw_amount = parseFloat(req.body.withdraw_amount);
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

        var getQuery = transferService.getBalance(sender);
        query(getQuery, function (err, vals, fields) {
            console.log(vals);
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            if (parseFloat(vals[0].balance) < withdraw_amount) {
                res.json({
                    status: 1,
                    message: '超出提现额度',
                });
                return;
            }

            var balance = parseFloat(vals[0].balance) - withdraw_amount;
            var setQuery = transferService.setBalance(sender, balance);
            query(setQuery, function (err, vals, fields) {
                if (err) {
                    console.log(err);
                    res.json({
                        status: 1,
                        message: err,
                    });
                    return;
                }
                var insertQuery = transferService.addRecord(sender, receiver, withdraw_amount, type);
                query(insertQuery, function (err, vals, fields) {
                    if (err) {
                        console.log(err);
                        res.json({
                            status: 1,
                            message: err,
                        });
                        return;
                    }

                    res.json({
                        status: 0,
                        message: '提现成功',
                    });
                });
            });
        });
    },

    getRecordMethod: function (req, res, next) {
        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '请先登录',
            });
            return;
        }

        var user_phone = req.session.user.phone;
        var start = req.body.start;
        var pagesize = config.pagesize;

        var getQuery = transferService.getRecord(user_phone, 0, pagesize);

        query(getQuery, function (err, vals, fields) {
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }
            var ret_data = JSON.stringify(vals);
            ret_data = JSON.parse(ret_data);

            res.json({
                status: 0,
                message: '查询成功',
                data: ret_data,
            });
        });
    }
};

module.exports = exports;