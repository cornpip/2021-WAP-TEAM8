const optimize = require('./optimize')

exports.oproduct = (db, app)=>{
    app.post('/oproduct',function(req,res){
        let sql = `SELECT * FROM insertproduct ORDER BY itime desc`
        db.query(sql,function(err, result){
            res.send(result);
        })
    })
}

exports.oproduct_key = (db, app)=>{
    app.post("/oproduct_key", function (req, res) {
        let body = req.body;
        let sql = `SELECT * FROM insertproduct WHERE id = ${body.key} `;
        db.query(sql, function (err, result) {
          res.send(result);
        });
      });
}

exports.slocate = (db, app)=>{
    app.post('/slocate', function(req,res){
        let sql = `select * from area`
        db.query(sql, function(err,result){
            res.send(result)
        })
    })
}

exports.olocate = (db, app)=>{
    app.post('/olocate', function(req,res){
        let body =req.body;
        optimize.locatearr(db, body.first, body.second, res)
    })
}

exports.mypageinfo = (db, app)=>{
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
}

exports.userlistinfo = (db, app)=>{
    app.post('/userlistinfo', function(req,res){
        let body = req.body;
        let sql = `select * from inguserlist where id=${body.id}`
        db.query(sql, function(err, result){
            if(err) throw err;
            res.send(result)
        })
    })
}