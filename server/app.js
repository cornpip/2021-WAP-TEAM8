const dotenv = require('dotenv')
dotenv.config();

const login = require('./sortout/login')
const info = require('./sortout/info')
const passive = require('./sortout/passive')
const firstset = require('./sortout/firstset')

const db = require('./Database/dbform.js')
const sessiondb = require('./Database/sessiondbform')
const express = require("express")
const app = express()
const app2 = express()
const PORT = 4000
const PORT2 = 5000
const host = 'localhost'
const amulator = '10.0.2.2'
//const aws = '3.35.211.102'

const passport = require('passport')
const session = require('express-session')
const cookieparser = require('cookie-parser')

// db테스트용
//----------------------------------------------------------------------------------------------------------
db.connect();
db.query('select * from locate where 시도="부산광역시" AND 시군구="남구" limit 4000',function(err,result){
    if(err) throw err;
    //console.log(result.length);
    let locate = new Array();
    let len = result.length;
    for(i=0; i<len; i++){
        locate[i]=result[i].읍면동
    }
    let set = new Set(locate);
    let unilocate = [...set];
    //console.log(unilocate);
    let point = unilocate.indexOf(null);
    //console.log(point)
    unilocate.splice(point,1);
    //console.log(unilocate);
    console.log('connect success');
})

db.query(`select id from insertproduct where user='test1'`, function(err, result){
    //console.log(result);
    let len = result.length - 1
    //console.log(result[len])
})

db.query(`select * from locate where 시도="부산광역시" AND 시군구="남구"`, function(req,res){
  //console.log(res);
})

let sql = `select * from user where id='123'`
let sql2 = `INSERT INTO user(provider, id) 
VALUES('naver', '123')`
db.query(sql,function(err,result){
    if(err) throw err;
    if(!result[0]){
        db.query(sql2, function(err2, result2){
            if(err2) throw err2
            console.log('successful sign up')
        })
    }
})
// insert 하자마자 select에 나옴
//-------------------------------------------------------------------------------------------------------------

// chat과 image 서버켜질 때 마다 찍음(이미지는 5000포트)
// chat port 9000으로 하나열고 iproduct할 때 추가X
firstset.set_chat(db);
firstset.set_image(db, app2);

app.use(express.static('../client'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cookieparser());
app.use(session({
  secret:'secret', 
  resave:false, 
  saveUninitialized: true,
  store: sessiondb.Mystore(session)
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views',__dirname + '/../client/html')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

login.kakao(db, app, host, PORT);
login.naver(db, app, host, PORT);
login.serialize();
login.deserialize();
login.auth(app);
login.in(app);
login.out(app);

const appm = express()
app.use('/mlogin', appm);
login.mlogin(db, appm);

info.oproduct(db, app);
info.oproduct_key(db, app);
info.slocate(db, app);
info.olocate(db, app);
info.mypageinfo(db, app);
info.userlistinfo(db, app);

passive.participate(db, app);
passive.iproduct_process(db, app, app2);
passive.productdelete(db, app);


app.get('/',function(req,res){
    // console.log(req.user)
    res.render('main.html')
})

app.get('/logintest', function(req, res){
  if(!req.user){
    res.send({"provider": "not login"})
  }else{
    res.send(req.user);
  }
})

app.get('/mypage',function(req,res){
    res.render('mypage.html')
})

app.get('/product', function(req,res){
    res.render('product.html')
})

app.get('/productinfo', function(req,res){
    res.render('productInfo.html')
})

app.get('/insertproduct', function(req,res){
    res.render('insertproduct.html')
})

app.get('/ttt', function(req,res){
    console.log(req.user);
    res.render('test.html')
})

app.get('/ttt2', function(req,res){
    res.render('test2.html');
})

app.get('/ttt3', function(req,res){
    res.render('test3.html')
})

app.get('/ttt4', function(req,res){
    res.render('humm.html');
})

app.get('/applog', function(req, res){
  res.render('app_login.html')
})

app.listen(PORT, ()=>{
    console.log(`start ${PORT}`);
})

app2.listen(PORT2, ()=>{
    console.log(`start 5000`);
})


//ws기억상기? 하는 부분
//-------------------------------------------------------------------------------------------------------
const server = require("ws").Server;//밑에 테스트용 코드때문에 잠시 킵

const s = new server({port:8000});
s.on('connection',ws=>{
  // 2. 받고
  ws.on('message',message=>{
    parseMessage = JSON.parse(message);
    db.query(sql8, function(err, result){
        if(!result[0]){
            //let sql=`INSERT INTO productchat(productid, chatport, participant, chatting, chattime) VALUES('${req.user.id}')`
            //여기서 부터 정보받는거다, userid 게시판id 받아두자(user아이디도 받아야함 req.user 못쓰니까)
            s.clients.forEach(client=>{
                client.send(JSON.stringify({
                  newChater:'이름할당', // 여기를 익명 + userid 한곳 따서 일단해볼까 ex) 익명x, 익명D, 익명0 등등
                  type:"newPeople"
                }))
              })
        }
    })
    console.log(parseMessage);
    //let sql=`INSERT INTO productchat(productid, chatport, participant, chatting, chattime) VALUES('${req.user.id}')`
// 닉네임 받고
    if(parseMessage.type==="name"){
      ws.personName = parseMessage.data;
// 접속을 알림
      s.clients.forEach(client=>{
        client.send(JSON.stringify({
          newChater:ws.personName,
          type:"newPeople"
        }))
      })
      return
    }
    //console.log(ws);
// 누군가 메시지를 보내면 모든 s 소켓에 접속한 사람들에게 전송
// 이때 글 보낸 사람도 받아짐
    s.clients.forEach(client=>{
        //console.log(client);
      // 받은 클라이언트가 보내는 사람이랑 다르면
      if(client !== ws){
          console.log('gigi');
        // 해당 클라이언트에게만 보냄
        // client가 모든 접속자들 돌아보는거 같은데(보낸사람포함)
        // 보낸사람한테는 이 정보를 보내지 않겠다는거지
        // 보낸사람은 ws 변수에 담긴거같아
        client.send(JSON.stringify({
          name:ws.personName,
          data:parseMessage.data,
        }));
      } ;
      // 
    })
  })
  // 연결이 끝길때
    ws.on('close',()=>{
      //console.log('out');
// 누군가 나감을 알림
     s.clients.forEach(client=>{
       client.send(JSON.stringify({
         name:ws.personName,
         type:"bye"
       }))
     })
    })
  // 연결될때
  console.log("다른 연결이 감지되었습니다.");
  ws.send(JSON.stringify({
      data:'hello',
      type:'chatinfo'
  }));
})
