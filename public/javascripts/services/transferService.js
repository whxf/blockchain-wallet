var mysql = require("mysql");

exports = {
    addRecord: function (sender, receiver, transfer_amount, type) {
        var sql = "insert into records ( sender, receiver, transfer_amount,type ) values ( ? , ? , ? , ? )";
        var inserts = [sender, receiver, transfer_amount, type];
        sql = mysql.format(sql, inserts);
        return sql;
        // TODO: Preparing Queries(https://www.npmjs.com/package/mysql#preparing-queries)
        // https://loopback.io
    },
};

module.exports = exports;
