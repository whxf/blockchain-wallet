var format = require('string-format');
var query = require('./dataController');
var transferService = require('../services/transferService');
var userService = require('../services/userService');
var config = require('../constants/conf');
var bcrypt = require('bcrypt-nodejs');

var createRecord = require('./blockchainController').createRecord;
var queryRecord = require('./blockchainController').queryRecord;

var exports = {
    transferMethod: async function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = parseFloat(req.body.transfer_amount);
        var transfer_password = req.body.password;


        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '转账前请登录！',
            });
            return;
        }

        var sender = req.session.user.phone;
        var transfer_type = '2';


        var sql = userService.getUserByPhone(sender);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            var password = vals[0].transfer_password;
            if (bcrypt.compareSync(transfer_password, password) === false) {
                res.json({
                    status: 1,
                    message: '支付密码输入错误',
                });
                return;
            }

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
                sender_balance = sender_balance.toFixed(2);

                var queryReceiverBalance = transferService.getBalance(receiver);
                query(queryReceiverBalance, async function (err, vals, fields) {

                    var balance = parseFloat(vals[0].balance);

                    if (err) {
                        res.json({
                            status: 1,
                            message: err,
                        });
                        return;
                    }

                    var method_result = await createRecord(sender, receiver, transfer_amount, transfer_type);

                    if (method_result.status === 1) {
                        res.json({
                            status: 1,
                            message: method_result.message
                        });
                        return;
                    }

                    receiver_balance = balance + transfer_amount;
                    receiver_balance = receiver_balance.toFixed(2);


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

                            res.json({
                                status: method_result.status,
                                message: method_result.message,
                            });

                            // var inset_transfer = transferService.addRecord(sender, receiver, transfer_amount, transfer_type);
                            //
                            // query(inset_transfer, function (err, vals, fields) {
                            //     if (err) {
                            //         res.json({
                            //             status: 1,
                            //             message: err,
                            //         });
                            //         return;
                            //     }
                            //     res.json({
                            //         status: 0,
                            //         message: '转账成功',
                            //     });
                            // });
                        });
                    });
                });
            });
        });
    },

    rechargeMethod: function (req, res, next) {
        var recharge_amount = parseFloat(req.body.recharge_amount);
        var transfer_password = req.body.password;

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

        var sql = userService.getUserByPhone(receiver);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            var password = vals[0].transfer_password;
            if (bcrypt.compareSync(transfer_password, password) === false) {
                res.json({
                    status: 1,
                    message: '支付密码输入错误',
                });
                return;
            }

            var getQuery = transferService.getBalance(receiver);
            query(getQuery, async function (err, vals, fields) {
                console.log(vals);
                if (err) {
                    console.log(err);
                    res.json({
                        status: 1,
                        message: err,
                    });
                    return;
                }

                var method_result = await createRecord(sender, receiver, recharge_amount, type);

                if (method_result.status === 1) {
                    res.json({
                        status: 1,
                        message: method_result.message
                    });
                    return;
                }

                var balance = parseFloat(vals[0].balance) + recharge_amount;
                balance = balance.toFixed(2);
                var setQuery = transferService.setBalance(receiver, balance);
                query(setQuery, async function (err, vals, fields) {
                    if (err) {
                        console.log(err);
                        res.json({
                            status: 1,
                            message: err,
                        });
                        return;
                    }

                    res.json({
                        status: method_result.status,
                        message: method_result.message,
                    });

                    // var insertQuery = transferService.addRecord(sender, receiver, recharge_amount, type);
                    // query(insertQuery, function (err, vals, fields) {
                    //     if (err) {
                    //         console.log(err);
                    //         res.json({
                    //             status: 1,
                    //             message: err,
                    //         });
                    //         return;
                    //     }
                    //
                    //     res.json({
                    //         status: 0,
                    //         message: '充值成功',
                    //     });
                    // });
                });
            });
        });
    },
    withdrawMethod: function (req, res, next) {
        var withdraw_amount = parseFloat(req.body.withdraw_amount);
        var transfer_password = req.body.password;

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

        var sql = userService.getUserByPhone(sender);
        query(sql, function (err, vals, fields) {
            // mysql query 出现错误
            if (err) {
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }

            var password = vals[0].transfer_password;
            if (bcrypt.compareSync(transfer_password, password) === false) {
                res.json({
                    status: 1,
                    message: '支付密码输入错误',
                });
                return;
            }

            var getQuery = transferService.getBalance(sender);
            query(getQuery, async function (err, vals, fields) {
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

                var method_result = await createRecord(sender, receiver, withdraw_amount, type);

                if (method_result.status === 1) {
                    res.json({
                        status: 1,
                        message: method_result.message
                    });
                    return;
                }

                var balance = parseFloat(vals[0].balance) - withdraw_amount;
                balance = balance.toFixed(2);
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

                    res.json({
                        status: method_result.status,
                        message: method_result.message,
                    });

                    // var insertQuery = transferService.addRecord(sender, receiver, withdraw_amount, type);
                    // query(insertQuery, function (err, vals, fields) {
                    //     if (err) {
                    //         console.log(err);
                    //         res.json({
                    //             status: 1,
                    //             message: err,
                    //         });
                    //         return;
                    //     }
                    //
                    //     res.json({
                    //         status: 0,
                    //         message: '提现成功',
                    //     });
                    // });
                });
            });
        });
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
        var start = req.body.start;
        var pagesize = config.pagesize;

        var query_result = await queryRecord(user_phone);
        console.log(query_result);

        if (query_result.status === 0) {
            res.json({
                status: query_result.status,
                message: query_result.message,
                data: JSON.parse(query_result.data),
            });
        } else {
            console.log(query_result.message);
            res.json({
                status: query_result.status,
                message: query_result.message,
            });
        }

        // var getQuery = transferService.getRecord(user_phone, 0, pagesize);
        //
        // query(getQuery, function (err, vals, fields) {
        //     if (err) {
        //         res.json({
        //             status: 1,
        //             message: err,
        //         });
        //         return;
        //     }
        //     var ret_data = JSON.stringify(vals);
        //     ret_data = JSON.parse(ret_data);
        //
        //     res.json({
        //         status: 0,
        //         message: '查询成功',
        //         data: ret_data,
        //     });
        // });
    }
};

module.exports = exports;