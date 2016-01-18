var express = require('express');
var bodyParser = require('body-parser');
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

app.get('/api/recommendation/user/:user', function(req, res) {
	//res.send('Hallo Welt');
	res.send(JSON.stringify({'user': req.params.user}));
});

app.listen(8553, function() {
  console.log('Amazing recommendation service running at http://127.0.0.1:8553/');
});
