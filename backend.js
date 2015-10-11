var wtf = require('./writeToFile.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Reading file...');
});

app.post('/notes', function(req,res){
  wtf.foo(req.body,function(){
    res.send("Post success.");
  });
});

var server = app.listen(3000, function () {
  var host = (server.address().address !== "::") ? server.address().address : "localhost";
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});