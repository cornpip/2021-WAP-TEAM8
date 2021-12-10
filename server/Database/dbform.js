let mysql = require('mysql2');
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chdnjf491',
  database: 'togetor'
});

module.exports=db;

// 개인 db환경에 맞는 값을 넣어 사용
// 값을 넣은 후 dbform.js --> db.js 로 파일이름을 변경하거나
// app.js의 require db부분 경로에 파일이름을 수정

// local환경으로 test시 host는 'localhost'로