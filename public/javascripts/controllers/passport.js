var mysql = require('mysql');
var dbconfig = require('../config/db');
var pool = mysql.createPool(dbconfig.connection);

var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                conn.release();
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = query;
