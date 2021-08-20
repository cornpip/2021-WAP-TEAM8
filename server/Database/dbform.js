let mysql = require('mysql2');
let db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

module.exports=db;

// 개인 db환경에 맞는 값을 넣어 사용하세요
// 값을 넣은 후 dbform.js --> db.js 로 파일이름을 변경하거나
// app.js의 require db부분 경로에 파일이름을 수정하세요

// local환경으로 test시 host는 'localhost'로 넣으면 됩니다