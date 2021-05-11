  
const express = require("express")
const app = express()
const db = require('./db/db.js')
const port = 4000

const naver = require('passport-naver').Strategy;
const passport = require('passport')
const session = require('express-session')
const cookieparser = require('cookie-parser')

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
    clientID: '2wRRFAoU30s8HnihrrPX',
    clientSecret: 'blEJNI4QTA',
    callbackURL: 'http://localhost:4000/callback/naver'
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
    //console.log('passport.authenticate(naver)실행');
    if (!user) { 
        console.log('로그인 실패');
     return res.redirect('http://localhost:4000/login'); }
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

app.get('/product', function(req,res){
    res.render('product.html')
})

app.listen(port, ()=>{
    console.log(`start ${port}`);
})