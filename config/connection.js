const mysql = require('mysql');
let connection;

const mysqlProfile= {
  port    : 3306,
  host    : 'localhost',
  user    : 'root',
  password: '',
  database: 'burgers_db'
};

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection(mysqlProfile);
}

module.exports = connection;
