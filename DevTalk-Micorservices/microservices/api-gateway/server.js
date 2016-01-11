var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});


app.get('/api/statistics/:key', function(req, res) {
	res.redirect('http://localhost:8552/api/statistics/'+req.params.key);
});

app.post('/api/statistics/login', function(req, res) {
	res.redirect(307, 'http://localhost:8552/api/statistics/login');
});

app.get('/api/recommendation/user/:user', function(req, res) {
	res.redirect('http://localhost:8553/api/recommendation/user/'+req.params.user);
});

app.get('/api/event/visited/user/:user', function(req, res) {
	res.redirect('http://localhost:8554/api/event/visited/user/'+req.params.user);
});

app.listen(8550, function() {
  console.log('Sassy API Gateway running at http://127.0.0.1:8550/');
});
