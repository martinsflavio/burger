const mysql = require('mysql');

const mysqlProfile= {
  port    : 3306,
  host    : 'localhost',
  user    : 'root',
  password: '',
  database: 'burgers_db'
};
const connection = mysql.createConnection(mysqlProfile);


module.exports = connection;
