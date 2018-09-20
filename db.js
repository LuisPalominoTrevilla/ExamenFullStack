const mysql = require('mysql');
const conf = require('./db_config');

const pool = mysql.createPool(conf);

module.exports = pool;