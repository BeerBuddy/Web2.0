var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/statistics', function(req, res) {
	res.send('13');
});

app.listen(8552, function() {
  console.log('Lame statistics service running at http://127.0.0.1:8552/');
});
