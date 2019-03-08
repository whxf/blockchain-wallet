var mysql = require('mysql');
require('date-utils');

exports = {
    getUserByPhone: function (phone) {
        var sql = "select * from  users where phone = ? ";
        var inserts = [phone];
        sql = mysql.format(sql, inserts);
        return sql;
    },
    addUser: function (nickname, phone, password, transfer_password) {
        var sql = "insert into users (nickname, phone, password, transfer_password)  values ( ? , ? , ? , ? ) ";
        var inserts = [nickname, phone, password, transfer_password];
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
    setUserTransferPassword:function (phone, password) {
        var sql = "update users set transfer_password = ? where phone = ? ";
        var inserts = [password, phone];
        sql = mysql.format(sql, inserts);
        return sql
    },
    setUserFreezeTime: function (phone) {
        var sql = "update users set freeze_time = ? where phone = ? ";
        var freeze_time = (new Date()).addHours(5);
        var inserts = [freeze_time, phone];
        sql = mysql.format(sql, inserts);
        return sql
    },
};

module.exports = exports;
