const express = require("express")
const app = express()
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

app.listen(port, ()=>{
    console.log(`start ${port}`);
})