const path = require('path');
const multer = require('multer')
const upload = multer({dest: 'image/'})
//const upload = multer({
//    storage: multer.memoryStorage(),
//  });
const optimize = require('./optimize')

exports.participate = (db, app)=>{
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
        //console.log(body.id);
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
}

exports.iproduct_process = (db, app, app2)=>{
    app.post('/iproduct_process',upload.single('image'), function(req,res){
        console.log('hi');
        //console.log(req.file);
        let body = req.body;
        let sql = `INSERT INTO insertproduct(user, itime, title, detail, inguser, filename, nowuser, place) 
        VALUES('${req.user.id}', NOW(), '${body.title}', '${body.detail}', ${body.inguser}, '${req.file.filename}', 1, '${body.place}')`;
        let sql2 = `INSERT INTO inguserlist(makeuser) VALUES('${req.user.id}')`
        db.query(sql);
        db.query(sql2);
        //db.query(`select id from insertproduct`, function(err, result){
        //    let recent = result.length - 1
        //    //console.log(result[recent].id);
        //    wschat.chat(optimize.updatefun, db, result[recent].id)
        //})

        //사진 넣으면서 껐다 켜져서 ws날라간다 (현상황에선 여기에chat() 못 넣음)
        //반대로 꺼졌다 켜지는게 아니면 지금 chat() 꺼내놓은게 의미가 없을 수도 있다.
        //나중에 사진 입출력 때 서버계속된다면 이 부분도 체크하자
        //계속되고 꺼졌다 켜졌을 때 chat()꺼내놓을 필요있고
        // 플러스도 iproduct에도 chat() 들어가면 됨
        db.query(`select id, filename from insertproduct`, function(err2, result2){
            let recent = result2.length -1
            app2.get(`/image/${result2[recent].id}`, function(req,res){
                console.log(recent);
                res.sendFile(path.resolve(`image/${result2[recent].filename}`))
            })
        })
        res.redirect('/product')
    })
}

exports.productdelete = (db, app)=>{
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
                    optimize.updatefun(listarr, body.productid);
                    //console.log(listarr);
                    db.query(`update user set inglist='${listarr}' where id='${remainarr[i]}'`)       
                })
            }
        })
        db.query(`delete from insertproduct where id=${body.productid}`)
        db.query(`delete from inguserlist where id=${body.productid}`)
        db.query(`delete from productchat where productid=${body.productid}`)
        res.redirect('/product')
    })
    
}

exports.iproduct_mobile=(db, app, app2) =>{
    app.post('/iproduct_mobile', upload.single('one'),function(req,res){
        let body = req.body
        console.log(body)
        console.log("--------------------------")
        // console.log(body)
        console.log(req.file.filename);
        let sql = `INSERT INTO insertproduct(user, itime, deadline, title, detail, inguser, filename, nowuser, place) 
        VALUES('${body.login}', NOW(), '${body.deadline}', '${body.title}', '${body.detail}', ${body.userlimit}, '${req.file.filename}', 1, '${body.place}')`;
        let sql2 = `INSERT INTO inguserlist(makeuser) VALUES('${body.login}')`
        db.query(sql);
        db.query(sql2);
        db.query(`select id, filename from insertproduct`, function(err2, result2){
            let recent = result2.length -1
            app2.get(`/image/${result2[recent].id}`, function(req,res){
                console.log(recent);
                res.sendFile(path.resolve(`image/${result2[recent].filename}`))
            })
        })
        res.send("success")
    })
}