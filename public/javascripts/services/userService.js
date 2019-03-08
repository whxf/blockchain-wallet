var mysql = require('mysql');

exports = {
    getUserByPhone: function (phone) {
        var sql = "select * from  users where phone = ? ";
        var inserts = [phone];
        sql = mysql.format(sql, inserts);
        return sql;
    },
    addUser: function (nickname, phone, password) {
        var sql = "insert into users (nickname, phone, password)  values ( ? , ? , ? ) ";
        var inserts = [nickname, phone, password];
        sql = mysql.format(sql, inserts);
        return sql;
    },
    getUserById: function (id) {
        var sql = "select * from  users where id = ? ";
        var inserts = [id];
        sql = mysql.format(sql, inserts);
        return sql;
    },
    setUserNickname: function (phone, nickname) {
        var sql = "update users set nickname = ? where phone = ? ";
        var inserts = [nickname, phone];
        sql = mysql.format(sql, inserts);
        return sql
    },
    setUserPassword: function (phone, password) {
        var sql = "update users set password = ? where phone = ? ";
        var inserts = [password, phone];
        sql = mysql.format(sql, inserts);
        return sql
    },
    setUserFreezeTime: function (phone) {
        // var sql = "update users set freeze_time = ? where phone = ? ";
        // var freeze_time = ;
        // var inserts = [freeze_time, phone];
        // sql = mysql.format(sql, inserts);
        // return sql
    },
};

module.exports = exports;
