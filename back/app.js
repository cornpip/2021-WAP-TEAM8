const dotenv = require('dotenv')
dotenv.config();

const express = require("express")
const app = express()
const db = require('./db/db.js')
const PORT = 4000

db.connect();
db.query('select user from insertproduct',function(err,result){
    if(err) throw err;
    console.log(result)
    console.log('connect success');
})

const naver = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport')
const session = require('express-session')
const cookieparser = require('cookie-parser')

const multer = require('multer')
//const upload = multer({dest: 'image/'})
const upload = multer({
    storage: multer.memoryStorage(),
  });

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

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: `http://localhost:${PORT}/callback/naver`
  },  
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: 'kakao',
          kakao: profile._json
      };
      return done(null, profile);
  });
  }));

app.get('/login/naver', passport.authenticate('naver'));
app.get('/login/kakao', passport.authenticate('kakao'));

app.get('/callback/naver', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    //console.log('passport.authenticate(naver)실행');
    if (!user) { 
        console.log('로그인 실패');
     return res.redirect(`http://localhost:${PORT}/login`); }
    req.logIn(user, function (err) { 
       //console.log('naver/callback user : ', user);
       return res.redirect('/');        
    });
  })(req, res);
});

app.get('/callback/kakao', function(req,res,next){
    passport.authenticate('kakao', function(err, user){
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

app.post('/auth', function(req,res){
    res.send(req.user)
})

app.post('/oproduct',function(req,res){
    let sql = `SELECT user,itime,title,detail,inguser FROM insertproduct ORDER BY itime desc`
    db.query(sql,function(err, result){
        res.send(result);
    })
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
    console.log(req.file);
    let body = req.body;
    let sql = `INSERT INTO insertproduct(user, itime, title, detail, inguser) 
    VALUES('${req.user.id}', NOW(), '${body.title}', '${body.detail}', ${body.inguser})`;
    db.query(sql);
    res.redirect('/product')
})

app.listen(PORT, ()=>{
    console.log(`start ${PORT}`);
})