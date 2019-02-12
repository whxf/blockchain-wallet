var mysql = require("mysql");

exports = {
    addRecord: function (sender, receiver, transfer_amount, type) {
        var sql = "insert into records ( sender, receiver, transfer_amount,type ) values ( ? , ? , ? , ? )";
        var inserts = [sender, receiver, transfer_amount, type];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    getBalance: function (phone) {
        var sql = "select balance from users where phone = ? ";
        var inserts = [phone];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    setBalance: function (phone, balance) {
        var sql = "update users set balance = ? where phone = ? ";
        var inserts = [balance, phone];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    getRecord: function (user_id, start, pagesize) {
        var sql = "select * from records " +
            "where sender = ? or receiver = ? " +
            "order by transfer_time desc " +
            "limit ? , ? ";
        var inserts = [user_id, user_id, start, pagesize];
        sql = mysql.format(sql, inserts);
        return sql;
    }
};

module.exports = exports;
