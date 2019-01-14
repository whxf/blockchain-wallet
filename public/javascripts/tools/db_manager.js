var mysql = require('mysql');
var dbconfig = require('../config/db');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


var exports = {



};

module.exports = exports;