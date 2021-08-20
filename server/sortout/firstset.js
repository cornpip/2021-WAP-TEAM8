const wschat = require('./wschat')
const optimize = require('./optimize')

exports.set_chat = (db)=>{
    db.query(`select id from insertproduct`, function(err, result){
        //console.log(result);
        wschat.chat(optimize.updatefun, db)
        //let len = result.length
        //for(i=0; i<len; i++){
        //    //console.log(result[i].id)
        //    wschat.chat(optimize.updatefun ,db, result[i].id)
        //}
    })
}

exports.set_image = (db, app2)=>{
    db.query('select id, filename from insertproduct', function(err,result){
        if(err) throw err;
        var len = result.length
        for(i=0; i<len; i++){
            if(result[i].filename !== null){
                optimize.makeimage(app2, i, result)
            }
        }
    })
}