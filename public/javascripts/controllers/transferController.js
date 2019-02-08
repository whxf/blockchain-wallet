var format = require('string-format');
var query = require('./databaseController');
var addTransferRecord = require('../services/transferService').addRecord;

var exports = {
    transfer: function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = req.body.transfer_amount;

        var sender = '1';
        var type = '2';

        console.log(receiver, transfer_amount);

        var insertQuery = addRecord(sender, receiver, transfer_amount, type);

        query(insertQuery, function (err, vals, fields) {
            if (err) {
                console.log(err);
                res.json({
                    status: 1,
                });
                return;
            }
            console.log('Inserted!');
            res.json({
                status: 0,
            });
        });
    }
};

module.exports = exports;