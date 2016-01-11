var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/recommendation/foo', function(req, res) {
	res.send('42');
});

app.get('/api/recommendation/bar', function(req, res) {
	res.send('Drölf!');
});


app.listen(8553, function() {
  console.log('Amazing recommendation service running at http://127.0.0.1:8553/');
});
