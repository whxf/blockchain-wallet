var format = require('string-format');
var query = require('./passport');


var exports = {
    transfer: function (req, res, next) {
        var receiver = req.body.receiver;
        var transfer_amount = req.body.transfer_amount;

        console.log(receiver, transfer_amount);

        var insertQuery =
            format("INSERT INTO records ( sender, receiver, transfer_amount,type ) values ({0},{1},{2},{3})",
                "1", receiver, transfer_amount, "2");
        query(insertQuery, function (err, vals, fields) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Inserted!');
            res.json({
                status: 0,
                receiver: receiver,
                transfer_amount: transfer_amount
            });
        });


    }
};


module.exports = exports;