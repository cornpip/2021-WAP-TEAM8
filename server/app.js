const dotenv = require('dotenv')
dotenv.config();

const express = require("express")
const app = express()
const db = require('./db/db.js')
const PORT = 4000

db.connect();
db.query('select * from insertproduct',function(err,result){
    if(err) throw err;
    console.log('connect success');
})

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
        console.log(profile);
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
    clientSecret: 'blEJNI4QTA',
    callbackURL: `http://localhost:${PORT}/callback/naver`
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.displayName,
            provider: 'naver',
            naver: profile._json
        };
        return done(null, profile);
    });
}));
app.get('/login/naver', passport.authenticate('naver'));

app.get('/callback/naver', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    //console.log('passport.authenticate(naver)실행')
    if (!user) { 
        console.log('로그인 실패');
     return res.redirect(`http://localhost:${PORT}/login`); }
    req.logIn(user, function (err) { 
       //console.log('naver/callback user : ', user);
       return res.redirect('/');        
    });
  })(req, res);
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

db.query('select id, filename from insertproduct', function(err,result){
    if(err) throw err;
    let len = result.length
    for(i=0; i<len; i++){
        if(result[i].filename !== null){
            app.get(`/image/${result[i].id}`, function(req,res){
                // 왜인지는 모르겠지만 라우터 찍을 때까지 i고
                // 라우트 안 코드에서 i+1 이다
                // 그래서 result[i-1]
                res.sendFile(__dirname + `/./image/${result[i-1].filename}`)
            })
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
    res.render('login.html')
})

app.get('/mypage',function(req,res){
    res.render('mypage.html')
})

app.get('/product', function(req,res){
    res.render('product.html')
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