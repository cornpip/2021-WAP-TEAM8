function locatearr(db ,first, second="undefined", res){
    let sql = `select * from locate where 시도="${first}" limit 4000`
    let inlist = "시군구"
    if(second){
        sql = `select * from locate where 시도="${first}" AND 시군구="${second}" limit 4000`
        inlist = "읍면동"
    }
    db.query(sql, function(err,result){
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
        let set = new Set(locate);
        let unilocate = [...set];
        let point = unilocate.indexOf(null);
        unilocate.splice(point,1);
        res.send(unilocate);
    })
}

function updatefun(arr, x){
    let num = arr.indexOf(`${x}`);
    if(num !== -1){
        arr = arr.splice(num, 1);
        arr = arr.join()
        return arr
    }
    return arr
}

function makeimage(app2, i, result){
    app2.get(`/image/${result[i].id}`, function(req,res){
        //console.log(i);
        res.sendFile(__dirname + `/./image/${result[i].filename}`)
    })
}


// 이렇게 빼나 exports로 내보내나 똑같네
module.exports = {
    locatearr,
    updatefun,
    makeimage
};