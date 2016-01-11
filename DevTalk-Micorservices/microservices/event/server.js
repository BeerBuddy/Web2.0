var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/event/visited/user/*', function(req, res) {
	res.send('{Hier Events von User}');
});

app.listen(8554, function() {
  console.log('Badass event service running at http://127.0.0.1:8554/');
});
