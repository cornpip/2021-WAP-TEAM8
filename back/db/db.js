let mysql = require('mysql');
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chdnjf491',
  database: 'together'
});

module.exports=db;