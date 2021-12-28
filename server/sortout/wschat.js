const server = require("ws").Server;

//new server이거 함수 안으로들어가면 열린포트 또 열어서 에러날 위험있음
const s = new server({port:9000});

function chat(updatefun, db){
    //let cport = 8000 + x;
    let cport = 9000;
    console.log(cport);
    //var s = new server({port:cport});
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
                            if(nowuser >= 1){
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
                              leaveChater:`익명${parse.userid[2]}`,
                              type:"leavePeople",
                              name: `익명${parse.userid[2]}`,
                            }))
                          })
                    })
                })
                return
            }
          if(parse.type == "firstinfo"){
            console.log('hi');
            console.log('hello');
            db.query(sql3, [parse.productid], function(err3, result3){
                ws.send(JSON.stringify({
                    data:result3,
                    type:'beforechat'
                }));
            })
            db.query(sql,[parse.userid, parse.productid],function(err, result){
                //console.log(result[0])
                if(!result[0]){
                    db.query(sql2, [parse.productid, cport, parse.userid, `님이 입장했습니다`])
                    s.clients.forEach(client=>{
                        client.send(JSON.stringify({
                          newChater:`익명${parse.userid[2]}`, // 여기를 익명 + userid 한곳 따서 일단해볼까 ex) 익명x, 익명D, 익명0 등등
                          type:"newPeople",
                          name: `익명${parse.userid[2]}`,
                        }))
                      })
                      return
                    } 
                })
            return
          }
          //if(parse.type == "firstvisit"){
          //      db.query(sql2, [parse.productid, cport, parse.userid, `님이 입장했습니다`])
          //      s.clients.forEach(client=>{
          //          client.send(JSON.stringify({
          //            newChater:`익명${parse.userid[5]}`, // 여기를 익명 + userid 한곳 따서 일단해볼까 ex) 익명x, 익명D, 익명0 등등
          //            type:"newPeople"
          //          }))
          //        })
          //    return
          //}
          // 채팅 재입장시 입장했습니다 문제 일단 보류
          console.log(parse);
          db.query(sql2,[parse.productid, cport, parse.userid, parse.data])
            s.clients.forEach(client=>{
                //if(client !== ws){
                    console.log('gigi');
                    client.send(JSON.stringify({
                    name:`익명${parse.userid[2]}`,
                    data:parse.data,

                 }));
               //} ;
             })
        })  
        console.log("다른 연결이 감지되었습니다."); //s.on에 들어왔따는 콘솔
    })
}

exports.chat = chat
