  
const express = require("express")
const app = express()
const db = require('./db/db.js')
const port = 4000

app.use(express.static('../client'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.set('views',__dirname + '/../client/html')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.get('/',function(req,res){
    res.render('mainpage.html')
})

app.get('/login', function(req,res){
    res.render('login.html')
})

app.post('/sign', function(req,res){
    let body = req.body;
    console.log(body.pw);
    let sql = `INSERT INTO users(id, ps, nick) VALUES ('${body.id}','${body.pw}','${body.nick}')`
    db.query(sql, function(err,result){
        res.redirect('/')
    })
})

app.listen(port, ()=>{
    console.log(`start ${port}`);
})