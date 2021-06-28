const express = require("express");
const app = express();
const db = require("./db/db.js");

db.connect();
// db.query('select id, filename from insertproduct', function(err,result){
//     console.log(result);
// })

function makeimage(i, result) {
  app.get(`/image/${result[i].id}`, function (req, res) {
    //console.log(result[i].id);
    res.sendFile(__dirname + `/./image/${result[i].filename}`);
  });
}

db.query("select id, filename from insertproduct", function (err, result) {
  if (err) throw err;
  var len = result.length;
  for (i = 0; i < len; i++) {
    if (result[i].filename !== null) {
      makeimage(i, result);
    }
  }
});

app.listen(5000, () => {
  console.log(`start 5000`);
});
