var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/statistics', function(req, res) {
	res.redirect('http://localhost:8552/api/statistics');
});

app.get('/api/recommendation/user/:user', function(req, res) {
	res.redirect('http://localhost:8553/api/recommendation/'+req.params.user);
});

app.get('/api/event/visited/user/:user', function(req, res) {
	res.redirect('http://localhost:8554/api/event/visited/user/'+req.params.user);
});

app.listen(8550, function() {
  console.log('Sassy API Gateway running at http://127.0.0.1:8550/');
});
