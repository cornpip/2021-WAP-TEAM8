let mysql = require("mysql");
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "togetor",
});

module.exports = db;
