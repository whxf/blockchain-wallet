var mysql = require("mysql");

exports = {
    addRecord: function (sender, receiver, transfer_amount, type) {
        var sql = "insert into records ( sender, receiver, transfer_amount,type ) values ( ? , ? , ? , ? )";
        var inserts = [sender, receiver, transfer_amount, type];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    getBalance: function (user_id) {
        var sql = "select balance from users where id = ? ";
        var inserts = [user_id];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    setBalance: function (user_id, balance) {
        var sql = "update users set balance = ? where id = ? ";
        var inserts = [balance, user_id];
        sql = mysql.format(sql, inserts);
        return sql;
    },

    getRecord: function (user_id, start, pagesize) {
        var sql = "select * from records " +
            "where sender = ? or receiver = ? " +
            "order by transfer_time desc " +
            "limit ? offset ? ";
        var inserts = [user_id, user_id, start, pagesize];
        sql = mysql.format(sql, inserts);
        return sql;
    }
};

module.exports = exports;
