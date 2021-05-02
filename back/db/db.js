let mysql = require('mysql');
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122',
  database: 'testdb'
});

module.exports=db;