let options = {
    host: "",
    user: "",
    password: "",
    database: "",
    clearExpired: true, // 만료됐을시 행 삭제
    //checkExpirationInterval: 5000, //만료된거 지우는 주기
    //expiration: 30000 // 유효한 세션 최대타임 시간은(ms)
}
// 개인 db환경에 맞는 값을 넣어 사용
// 값을 넣은 후 sessiondbform.js --> sessiondb.js 로 파일이름을 변경하거나
// app.js의 require sessiondb부분 경로에 파일이름을 수정

Mystore = (session)=>{
    const Mysqlstore = require('express-mysql-session')(session);
    return new Mysqlstore(options)
}

module.exports= {mystore}