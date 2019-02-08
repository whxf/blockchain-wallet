var format = require('string-format');
var query = require('./databaseController');
var transferService = require('../services/transferService');
var userService = require('../services/userService');


var exports = {
    transferMethod: function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = req.body.transfer_amount;

        if (req.session['user'] === undefined) {
            res.json({
                status: 1,
                message: '转账前请登录！',
            });
            return;
        }

        var sender = req.session.user.id;
        var type = '2';

        var sql = userService.getUserByPhone(receiver);
        query(sql, function (err, vals, fields) {
            if (err) {
                console.log(err);
                res.json({
                    status: 1,
                    message: err,
                });
                return;
            }
            if (vals.length === 0) {
                res.json({
                    status: 1,
                    message: '收账用户不存在，请检查',
                });
                return;
            }
            var insertQuery = transferService.addRecord(sender, receiver, transfer_amount, type);
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
                    message: '转账成功',
                });
            });
        });
    }
};

module.exports = exports;