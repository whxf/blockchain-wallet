var mysql = require('mysql');

exports = {
    getUserByPhone:function (phone){
        var sql = "select * from  users where phone = ? ";
        var inserts = [phone];
        sql = mysql.format(sql, inserts);
        return sql;
    },
    addUser:function (nickname, phone, password){
        var sql = "insert into users (nickname, phone, password)  values ( ? , ? , ? ) ";
        var inserts = [nickname, phone, password];
        sql = mysql.format(sql, inserts);
        return sql;
    },
};

module.exports = exports;
