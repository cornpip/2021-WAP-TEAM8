const dotenv = require('dotenv')
dotenv.config();

const express = require("express")
const app = express()
const db = require('./db/db.js')
const PORT = 4000

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

db.query(`select * from area`, function(err, result){
    //console.log(result);
})

db.query(`select * from user where id='tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU'`, function(err, result){
    //console.log(result);
})
//-------------------------------------------------------------------------------------------------------------

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
    //console.log(user);
    done(null, user);
});

app.post('/oproduct',function(req,res){
    let sql = `SELECT id, user,itime,title,detail,inguser FROM insertproduct ORDER BY itime desc`
    db.query(sql,function(err, result){
        res.send(result);
    })
})

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

app.get('/product', function(req,res){
    res.render('product.html')
})

app.get('/productinfo', function(req,res){
    res.render('productInfo.html')
})

app.get('/insertproduct', function(req,res){
    res.render('insertproduct.html')
})

app.post('/iproduct_process',upload.single('image'), function(req,res){
    console.log('hi');
    //console.log(req.file);
    let body = req.body;
    let sql = `INSERT INTO insertproduct(user, itime, title, detail, inguser, filename) 
    VALUES('${req.user.id}', NOW(), '${body.title}', '${body.detail}', ${body.inguser}, '${req.file.filename}')`;
    db.query(sql);
    res.redirect('/product')
})



// 카카오 로그인 
// router.use('/auth', require('./auth'));

// passport.use('kakao', new KakaoStrategy({
//     clientID: process.env.KAKAO_ID,
//     callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
//   }, async (accessToken, refreshToken, profile, done) => {
//     //console.log(profile);
//     console.log(accessToken);
//     console.log(refreshToken);
// }))


// router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//   failureRedirect: '/',
// }), (res, req) => {
//   res.redirect('/auth');
// });



app.listen(PORT, ()=>{
    console.log(`start ${PORT}`);
})

// module.exports = router;