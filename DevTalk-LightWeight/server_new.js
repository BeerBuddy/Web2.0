var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/login', function(req, res) {
  console.log(req.body);
  res.send('YOU SHALL NOT PASS');
});

app.post('/register', function(req, res) {
  res.send('Sooo ... you want to register?');
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});