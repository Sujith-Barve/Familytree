var express = require('express');
var app=express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const { connected } = require('process');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "Sujith@123",
  database : 'Family_tree'
});
var server = app.listen(4080, function(){
   var host =server.address().address
   var port = server.address().port
   });
   con.connect(function(error){
     if(error)
     {
       console.log(error);
     }
     else 
     {
       console.log("connected");
     }
   });


   con.connect(function(err) {
    if (err) {
    console.log(err);
    }
    //Insert a record in the "customers" table:
    var sql = "INSERT INTO users (Name, Address,City) VALUES ('Arun','Barve','Barve')";
    con.query(sql, function (err, result) {
      if (err)  console.log(err);
      console.log("1 record inserted");
    });
  });

  app.get('/users',function(req,res){
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err)
      {
        console.log(err );
      }
      console.log(result);
      res.send(result);
    });
  }); 