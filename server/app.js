const express = require('express');
var sqlite3 =require('sqlite3').verbose();
var db = new sqlite3.Database('db.db')
var bodyParser = require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

//app.use(express.json());
const cors =require('cors');
app.use(cors());
bodyParser = {
  json: {limit: '50mb', extended: true},
  urlencoded: {limit: '50mb', extended: true}
};

//db.serialize(function() {
str="";
a="[";
function a() {
  db.each("SELECT * FROM dbb", function (err, row) {
    a = a + str.concat(JSON.stringify(row));
    console.log(a);
  });
}
//});
//b.run('insert into dbb values(2,"lol","fuck")');
function b() {

  db.all("SELECT * FROM dbb", function (err, rows) {
    rows.forEach(function (row) {
      a = a + str.concat(JSON.stringify(row));
      a=a+",";
    })
    a=a.substring(0,a.length-1);
   // a=a.splice(0, a.length - 1);
    //console.log(a);
    a=a+"]";
    return a;
  });
}
b();
db.all("SELECT * FROM dbb", function(err, rows) {
  rows.forEach(function (row) {
    str.concat(JSON.stringify(row));
  })
  });
//console.log(str);

app.get("/reps", (req, res) => {

  var w=b();
  //console.log(a);
  res.send(a);
  //console.log("")
  a='[';
});
app.listen(5000,()=>{
  console.log('listing on 5000');
});
app.post('/reps', (req, res) => {
  if (isValidRep(req.body)) {
    //console.log(req);
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      date: new Date().toString(),
      img: req.body.img.toString()
    };
    //console.log(req.body.name.toString());
    //console.log(req.body.content.toString());
    db.run('insert into dbb (name,content,date,img) values(?,?,?,?)',[req.body.name.toString(),req.body.content.toString(),new Date().toString(), req.body.img.toString()])
    res.json(mew);
  }
});
//console.log(new Date().toString());
function isValidRep(rep){
  return rep.name && rep.name.toString().trim()!=='' && rep.content&& rep.content.toString().trim()!=='';
}

