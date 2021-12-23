const request =require('request');
const passport = require('passport')
const naver = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
//db여기로 require하면 나중에 db파일 바꿔쓴다하면 귀찮을 듯해서
//일단 app으로 빼두자

exports.kakao = (db, app, ip, port)=>{
    passport.use('kakao-login', new KakaoStrategy({
        session:true, 
        clientID: process.env.KAKAO_ID,
        //clientSecret: process.env.KAKAO_SECRET,
        callbackURL: `http://${ip}:${port}/callback/kakao`,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
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
    app.get('/callback/kakao', passport.authenticate('kakao-login', {
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect('/');
    });
}

exports.naver = (db, app, ip, port)=>{
    passport.use(new naver({
        session:true, 
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: `http://${ip}:${port}/callback/naver`,
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
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
}

exports.serialize = ()=>{
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
}

exports.deserialize = ()=>{
    passport.deserializeUser(function(req,user,done){
        console.log('페이지마다 확인 될 인증 정보');
        //console.log(user.id[5]);
        done(null, user);
    });
} 

exports.auth = (app)=>{
    app.post('/auth', function(req,res){
        res.send(req.user)
    })    
}


exports.in = (app)=>{
    app.get('/login', function(req,res){
        if(req.user){
            res.redirect('/');
        }
        else{
            res.render('login.html')
        }
    })
}

exports.out = (app)=>{
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
}

exports.mlogin = (db, appm) => {
    appm.post('/kakao', function (req, res) {
        body = req.body
        console.log(body)
        let sql = `select * from user where id='${body.id}'`
        let sql2 = `INSERT INTO user(provider, id) VALUES('kakao', '${body.id}')`
        db.query(sql, function (err, result) {
            if (err) {
                res.send({"state": `${err}`})
                throw err
            }
            if (!result[0]) {
                db.query(sql2, function (err2, result2) {
                    if (err2) throw err2
                    console.log('successful sign up')
                    res.send({"state":"successful sign up"})
                })
            }else{
                console.log('already signed')
                res.send({"state": "already signed"})
            }
        })
    });

    appm.post('/naver', function(req,res){
        body = req.body
        console.log(body)
        let sql = `select * from user where id='${body.id}'`
        let sql2 = `INSERT INTO user(provider, id) VALUES('naver', '${body.id}')`
        db.query(sql, function (err, result) {
            if (err) {
                res.send({"state": `${err}`})
                throw err
            }
            if (!result[0]) {
                db.query(sql2, function (err2, result2) {
                    if (err2) throw err2
                    console.log('successful sign up')
                    res.send({"state":"successful sign up"})
                })
            }else{
                console.log('already signed')
                res.send({"state": "already signed"})
            }
        })
    })
}