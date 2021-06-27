const dotenv = require('dotenv')
dotenv.config();

const express = require("express")
const app = express()
const db = require('./db/db.js')
const PORT = 4000

//const http = require('http');
//const webSocketServer = require('websocket').server;
const server = require("ws").Server;

// db테스트용
//----------------------------------------------------------------------------------------------------------
db.connect();
db.query('select * from locate where 시도="부산광역시" AND 시군구="남구" limit 4000',function(err,result){
    if(err) throw err;
    console.log(result.length);
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

db.query(`select * from inguserlist where party1='test1'`, function(err, result){
    //console.log(result);
})

let sql = `select remainder from inguserlist where id=1`
let sql2 = `UPDATE inguserlist SET remainder=? where id=1`
// db.query(sql, function(err, result){
//     let a=result[0].remainder;
//     console.log(a);
//     db.query(sql2,[a+' test3'],function(err2, result2){
//         if(err2) throw err2;
//         console.log(result2);
//     })
// })
let sql3 = `select inglist from user where usernum=1`
let sql4 = `UPDATE user SET inglist=? where usernum=1`
//db.query(sql3, function(err, result){
//    if(err) throw err;
//    let before=result[0].inglist
//    db.query(sql4,[before+',9'],function(err2, result2){
//        if(err2) throw err2;
//    })
//})

// db.query(`select remainder from inguserlist`, function(err, result){
//     let a=result[0].remainder.split(',');
//     console.log(a);
// })

db.query(`select * from user where id='test1'`, function(err, result){
    db.query(`select * from inguserlist where makeuser='test1'`, function(err2,result2){
        result3 =result.concat(result2);
        //console.log(result3);
    })
    // console.log(result[0].inglist);
    // let a = result[0].inglist;
    // let b = a.split(',');
    // console.log(b);
})

db.query(`select * from inguserlist where makeuser='test1'`,function(err,result){
    //console.log(result);
})
db.query(`select * from user where id='tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU'`, function(err, result){
    //console.log(result)
})

let sql5 = `select inguser,nowuser  from insertproduct where id=1`
let sql6 = `UPDATE insertproduct SET nowuser=? where id=1`
db.query(sql5, function(err, result){
    if(err) throw err;
    //if(result[0].nowuser == result[0].inguser){
    //    res.redirect('/');
    //}
    //let nowuser = result[0].nowuser + 1
    //db.query(sql6,[nowuser], function(err2, result2){
    //    if(err2) throw err2
    //})
})

//let sql7 = `INSERT INTO productchat(productid, chatport, participant, chatting, chattime) VALUES('${req.user.id}')`
let sql8 = `select * from productchat where participant='test12' AND productid=1 `
db.query(sql8,function(err,result){
    //console.log(result[0]);
    if(!result[0]){
        //console.log('hi')
    }
})
let sql9 = `select participant, chatting, chattime from productchat where productid='1' ORDER BY chattime ASC LIMIT 100`
db.query(sql9,function(err,result){
    // console.log(result);
    // console.log(result[0].participant)
    // console.log(result[0].chatting)
    // console.log(result[0].chattime)
})

//db.query(`insert into insertproduct (user) value ('test1')`)
db.query(`select id from insertproduct where user='test1'`, function(err, result){
    //console.log(result);
    let len = result.length - 1
    //console.log(result[len])
})
// insert 하자마자 select에 나옴

//db.query(`select inglist from user where id='test12'`,function(err,result){
//    db.query(`select remainder from inguserlist where id=2`, function(err2, result2){
//        let arr = result2[0].remainder.split(',');
//        console.log(arr);
//        updatefun(arr, 'test1');
//        console.log(arr);
//        let a = result[0].inglist.split(',')
//        //console.log(a);
//        let b = a.indexOf('1');
//        //console.log(b);
//        let c = a.splice(b,1);
//        //console.log(a);
//        let d = a.join()
//        //db.query(`update user set inglist= d where id=test1`)
//    })
//})

let productid = 2

//db.query(`select remainder from inguserlist where id=${productid}`, function(err,result){
//    console.log(result[0]);
//    let remainarr = result[0].remainder.split(',')
//    let len = remainarr.length
//    for (let i=1; i<len; i++){
//        db.query(`select inglist from user where id='${remainarr[i]}'`,function(err2,result2){
//            //console.log(result2);
//            let listarr = result2[0].inglist.split(',')
//            updatefun(listarr, productid);
//            console.log(listarr);
//            db.query(`update user set inglist='${listarr}' where id='${remainarr[i]}'`)        
//        })
//    }
//})
//db.query(`delete from insertproduct where id=${productid}`)
//db.query(`delete from inguserlist where id=${productid}`)
//db.query(`delete from productchat where productid=${productid}`)
db.query(`select * from insertproduct where id = 2`, function(err1,result1){
    db.query(`select nowuser from insertproduct where id = 1`, function(err, result){
        console.log(result[0].nowuser -1);
    })
    console.log('hihi');
})

//-------------------------------------------------------------------------------------------------------------

// chat을 켜질때마다 찍자
db.query(`select id from insertproduct`, function(err, result){
    //console.log(result);
    let len = result.length
    for(i=0; i<len; i++){
        //console.log(result[i].id)
        chat(result[i].id)
    }
})

const request =require('request');
const naver = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport')
const session = require('express-session')
const cookieparser = require('cookie-parser')

const multer = require('multer')
const upload = multer({dest: 'image/'})
//const upload = multer({
//    storage: multer.memoryStorage(),
//  });

app.use(express.static('../client'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cookieparser());
app.use(session({secret:'secret', resave:true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views',__dirname + '/../client/html')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.post('/auth', function(req,res){
    res.send(req.user)
})

//카카오 로그인
passport.use('kakao-login', new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/kakao/callback`,
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        let sql = `select * from user where id='${profile._json.id}'`
        let sql2 = `INSERT INTO user(provider, id, email, age, gender) 
        VALUES('${profile.provider}', '${profile._json.id}', '${profile._json.email}', '${profile._json.age}', '${profile._json.gender}')`
        db.query(sql,function(err,result){
            if(err) throw err;
            if(!result[0]){
                db.query(sql2, function(err2, result2){
                    if(err2) throw err2
                    console.log('successful sign up')
                })
            }
        })
        //console.log(profile._json);
        return done(null, profile);
    });
}));
app.get('/login/kakao', passport.authenticate('kakao-login'));
app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

//네이버 로그인
passport.use(new naver({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: `http://localhost:${PORT}/callback/naver`
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        var header = "Bearer " + accessToken;
        var options = {
            url: 'https://openapi.naver.com/v1/nid/me',
            headers: {'Authorization': header}
        };
        request.get(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                profile._json.gender = body.response.gender;
                profile._json.mobile = body.response.mobile;
                profile._json.name = body.response.name;
                //console.log(body.response);
            } else {
                console.log('error');
                if(response != null) {
                  console.log('error = ' + response.statusCode);
                }
            }
            let sql = `select * from user where id='${profile._json.id}'`
            let sql2 = `INSERT INTO user(provider, id, email, age, gender) 
            VALUES('${profile.provider}', '${profile._json.id}', '${profile._json.email}', '${profile._json.age}', '${profile._json.gender}')`
            db.query(sql,function(err,result){
                if(err) throw err;
                if(!result[0]){
                    db.query(sql2, function(err2, result2){
                        if(err2) throw err2
                        console.log('successful sign up')
                    })
                }
            })
            //console.log(profile);
            return done(error, profile);
        })
        // profile에 gender나 mobile이 안넘어온다. --> 따로 요청
    })
}))
app.get('/login/naver', passport.authenticate('naver'));


app.get('/callback/naver', 
	passport.authenticate('naver', {
        failureRedirect: '/login'
    }), function(req, res) {
    	res.redirect('/'); 
    });

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(req,user,done){
    console.log('페이지마다 확인 될 인증 정보');
    //console.log(user.id[5]);
    done(null, user);
});

app.post('/oproduct',function(req,res){
    let sql = `SELECT id, user,itime,title,detail,inguser FROM insertproduct ORDER BY itime desc`
    db.query(sql,function(err, result){
        res.send(result);
    })
})

app.post("/oproduct_key", function (req, res) {
    let body = req.body;
    console.log(body);
    let sql = `SELECT * FROM insertproduct WHERE id = ${body.key} `;
    db.query(sql, function (err, result) {
      res.send(result);
    });
  });

function locatearr(first, second="undefined", res){
    //console.log(first);
    //console.log(second);
    let sql = `select * from locate where 시도="${first}" limit 4000`
    let inlist = "시군구"
    if(second){
        sql = `select * from locate where 시도="${first}" AND 시군구="${second}" limit 4000`
        inlist = "읍면동"
    }
    db.query(sql, function(err,result){
        //console.log('hi');
        //console.log(result);
        //console.log(inlist)
        let locate = new Array();
        let len = result.length
        for(i=0, inlist=inlist; i<len; i++){
            if(inlist == "시군구"){
                locate[i]=result[i].시군구
            }
            if(inlist == "읍면동"){
                locate[i]=result[i].읍면동
            }
        }
        //console.log(locate)
        let set = new Set(locate);
        let unilocate = [...set];
        //console.log(unilocate)
        let point = unilocate.indexOf(null);
        //console.log(point)
        unilocate.splice(point,1);
        console.log(unilocate);
        res.send(unilocate);
    })
}

app.post('/olocate', function(req,res){
    let body =req.body;
    locatearr(body.first, body.second, res)
})

app.post('/slocate', function(req,res){
    let sql = `select * from area`
    db.query(sql, function(err,result){
        res.send(result)
    })
})

app.get('/ttt', function(req,res){
    console.log(req.user);
    res.render('test.html')
})

function makeimage(i, result){
    app.get(`/image/${result[i].id}`, function(req,res){
        console.log(i);
        res.sendFile(__dirname + `/./image/${result[i].filename}`)
    })
}

db.query('select id, filename from insertproduct', function(err,result){
    if(err) throw err;
    var len = result.length
    for(i=0; i<len; i++){
        if(result[i].filename !== null){
            makeimage(i, result)
        }
    }
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/',function(req,res){
    res.render('main.html')
})

app.get('/login', function(req,res){
    if(req.user){
        res.redirect('/');
    }
    else{
        res.render('login.html')
    }
})

app.get('/mypage',function(req,res){
    res.render('mypage.html')
})

app.get('/mypageinfo',function(req,res){
    let sql = `select * from user where id='${req.user.id}'`
    let sql2 = `select * from inguserlist where makeuser='${req.user.id}'`
    db.query(sql,function(err,result){
        if(err) throw err;
        db.query(sql2, function(err2, result2){
            if(err2) throw err2;
            userdata = result.concat(result2);
            //console.log(userdata);
            res.send(userdata);
        })
    })
})

app.post('/userlistinfo', function(req,res){
    let body = req.body;
    let sql = `select * from inguserlist where id=${body.id}`
    db.query(sql, function(err, result){
        if(err) throw err;
        res.send(result)
    })
})

app.get('/product', function(req,res){
    res.render('product.html')
})

app.get('/productinfo', function(req,res){
    res.render('productInfo.html')
})

app.post('/participate', function(req,res){
    let body =req.body
    let sql5 = `select inguser,nowuser  from insertproduct where id=${body.id}`
    let sql6 = `UPDATE insertproduct SET nowuser=? where id=${body.id}`
    db.query(sql5, function(err, result){
        if(err) throw err;
        if(result[0].nowuser == result[0].inguser){
            res.redirect('/');
        }
        let nowuser = result[0].nowuser + 1
        db.query(sql6,[nowuser], function(err2, result2){
            if(err2) throw err2
        })
    })
    let sql = `select remainder from inguserlist where id=${body.id}`
    let sql2 = `UPDATE inguserlist SET remainder=? where id=${body.id}`
    console.log(body.id);
    db.query(sql, function(err, result){
        if(err) throw err;
        let before=result[0].remainder;
            db.query(sql2,[before+`,${req.user.id}`],function(err2, result2){
                if(err2) throw err2;
                //console.log(result2);
        })
    })
    let sql3 = `select inglist from user where id='${req.user.id}'`
    let sql4 = `UPDATE user SET inglist=? where id='${req.user.id}'`
    db.query(sql3, function(err, result){
        if(err) throw err;
        let before=result[0].inglist
        db.query(sql4,[before+`,${body.id}`],function(err2, result2){
            if(err2) throw err2;
        })
    })
    res.redirect('/productInfo.html')
})

app.get('/ttt4', function(req,res){
    res.render('humm.html');
})

app.get('/insertproduct', function(req,res){
    res.render('insertproduct.html')
})

app.post('/iproduct_process',upload.single('image'), function(req,res){
    console.log('hi');
    //console.log(req.file);
    let body = req.body;
    let sql = `INSERT INTO insertproduct(user, itime, title, detail, inguser, filename, nowuser, place) 
    VALUES('${req.user.id}', NOW(), '${body.title}', '${body.detail}', ${body.inguser}, '${req.file.filename}', 1, '${body.place}')`;
    let sql2 = `INSERT INTO inguserlist(makeuser) VALUES('${req.user.id}')`
    db.query(sql);
    db.query(sql2);
    //사진 넣으면서 껐다 켜져서 ws날라간다 (현상황에선 여기에chat() 못 넣음)
    //반대로 꺼졌다 켜지는게 아니면 지금 chat() 꺼내놓은게 의미가 없을 수도 있다.
    //나중에 사진 입출력 때 서버계속된다면 이 부분도 체크하자
    res.redirect('/product')
})

app.post('/productdelete', function(req, res){
    let body = req.body
    db.query(`select remainder from inguserlist where id=${body.productid}`, function(err,result){
        //console.log(result[0]);
        let remainarr = result[0].remainder.split(',')
        let len = remainarr.length
        for (let i=1; i<len; i++){
            db.query(`select inglist from user where id='${remainarr[i]}'`,function(err2,result2){
                //console.log(result2);
                let listarr = result2[0].inglist.split(',')
                updatefun(listarr, body.productid);
                console.log(listarr);
                db.query(`update user set inglist='${listarr}' where id='${remainarr[i]}'`)       
            })
        }
    })
    db.query(`delete from insertproduct where id=${body.productid}`)
    db.query(`delete from inguserlist where id=${body.productid}`)
    db.query(`delete from productchat where productid=${body.productid}`)
    res.redirect('/product')
})

app.get('/ttt2', function(req,res){
    res.render('test2.html');
})

app.get('/ttt3', function(req,res){
    res.render('test3.html')
})

 app.listen(PORT, ()=>{
    console.log(`start ${PORT}`);
})

//const s = new wserver({port:PORT});

// var server = http.createServer(app).listen(PORT, function() {
//     console.log('Express server listening');
// });
//var s = new webSocketServer({
    
// var wsServer = new webSocketServer({
//         httpServer : server
// });

function updatefun(arr, x){
    let num = arr.indexOf(`${x}`);
    if(num !== -1){
        arr = arr.splice(num, 1);
        arr = arr.join()
        return arr
    }
    return arr
}

function chat(x){
    let cport = x+8000;
    console.log(cport);
    var s = new server({port:cport});
    let sql = `select * from productchat where participant=? AND productid=?` //여기 participant 스트링으로 줘야하나 일단주의
    let sql2 = `INSERT INTO productchat(productid, chatport, participant, chatting, chattime) 
    VALUES(?, ?, ?, ?, NOW())`
    let sql3 = `select participant, chatting, chattime from productchat where productid=? ORDER BY chattime ASC LIMIT 100`
    // connection에서 게시판id 못받지
    // 처음에 채팅방 들어가기 하고 불러오기 같은 버튼 만들어서 내용 불러오기하자(사실 불러오기버튼은 id정보 보내기위함)
    // ㄴㄴ onopen 하면 바로 어차피 보내짐
    s.on('connection',ws=>{
        ws.on('message',message=>{
          parse = JSON.parse(message);
          if(parse.type == "leaveinfo"){
                db.query(`select inglist from user where id='${parse.userid}'`,function(err1,result1){
                    db.query(`select remainder from inguserlist where id=${parse.productid}`, function(err2,result2){
                        db.query(`select nowuser from insertproduct where id = ${parse.productid}`, function(err3, result3){
                            let nowuser = result3[0].nowuser - 1
                            if(nowuser > 1){
                                db.query(`update insertproduct set nowuser=${nowuser} where id=${parse.productid}`)
                            }
                        })
                        let userarr = result1[0].inglist.split(',');
                        let remainarr = result2[0].remainder.split(',');
                        updatefun(userarr, parse.productid);
                        updatefun(remainarr, parse.userid);
                        db.query(`update user set inglist='${userarr}' where id='${parse.userid}'`)
                        db.query(`update inguserlist set remainder='${remainarr}' where id='${parse.productid}'`)
                        db.query(sql2, [parse.productid, cport, parse.userid, `님이 퇴장했습니다`])
                        s.clients.forEach(client=>{
                            client.send(JSON.stringify({
                              leaveChater:`익명${parse.userid[5]}`,
                              type:"leavePeople"
                            }))
                          })
                    })
                })
                return
            }
          if(parse.type == "firstinfo"){
            console.log('hi');
            db.query(sql3, [parse.productid], function(err3, result3){
                ws.send(JSON.stringify({
                    data:result3,
                    type:'beforechat'
                }));
            })
            db.query(sql,[parse.userid, parse.productid],function(err, result){
                console.log(result[0])
                if(!result[0]){
                    db.query(sql2, [parse.productid, cport, parse.userid, `님이 입장했습니다`])
                    s.clients.forEach(client=>{
                        client.send(JSON.stringify({
                          newChater:`익명${parse.userid[5]}`, // 여기를 익명 + userid 한곳 따서 일단해볼까 ex) 익명x, 익명D, 익명0 등등
                          type:"newPeople"
                        }))
                      })
                      return
                    } 
                })
            return
          }
          console.log(parse);
          db.query(sql2,[parse.productid, cport, parse.userid, parse.data])
            s.clients.forEach(client=>{
                //if(client !== ws){
                    console.log('gigi');
                    client.send(JSON.stringify({
                    name:`익명${parse.userid[5]}`,
                    data:parse.data,

                 }));
               //} ;
             })
        })  
        console.log("다른 연결이 감지되었습니다.");
    })
}

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
//let sql7 = `INSERT INTO productchat(productid, chatport, participant, chatting, chattime) VALUES('${req.user.id}')`
// port num = productid + 8000 이런식으로
// 등록할 때, ws함수로 만들어서 생성하고 db에는 아직 ㄴㄴ
// 채팅방 들어가기 하면 그 때 productid 주고, chatport id+8000으로 넣고, participant 넣고, 입장채팅넣고, chattime 넣고

        //   if(parse.type==="name"){
        //     ws.personName = parse.data;
        //     s.clients.forEach(client=>{
        //       client.send(JSON.stringify({
        //         newChater:ws.personName,
        //         type:"newPeople"
        //       }))
        //     })
        //     return
        //   }

