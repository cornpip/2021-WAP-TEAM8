let mysql = require('mysql');
let db2 = mysql.createConnection({
  host: '3.35.211.102',
  user: 'root',
  password: '1122',
  database: 'together'
});

module.exports=db2;