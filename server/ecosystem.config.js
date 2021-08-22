module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
    ignore_watch : ["image"]
    //  image/ ,  image/* , /image --> 안됨
    //  */image , image 됨
  }]
}
