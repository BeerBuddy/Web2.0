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


var getRandomValue = function(min, max){
	return Math.floor(((Math.random() * (max || 500)) + (min || 1)));
};

var loginCounter = 0;

var getAccessStatistics =  function(){
	var result = {};
	result.labels = ["January", "February", "March", "April", "May", "June", "July"];
	result.series = ['Zugriff 2014', 'Zugriff 2015'];
	result.data = [[],[]];
	for (var i = 0; i < 2; i++) {
	  for (var j = 0; j < 7; j++) {
		result.data[i].push(getRandomValue(500, 7000));
	  }
	}
	result.data[1][6] = loginCounter;
	return result;
};
var getRegistrationData = function(){
	var result = {};
	result.labels = ["January", "February", "March", "April", "May", "June", "July"];
	result.series = ['Anmeldungen', 'Teilnahmen'];
	result.data = [[],[]];
	for (var j = 0; j < 7; j++) {
	  result.data[0].push(getRandomValue(300, 3000));
	}
	for (var i = 0; i < 7; i++) {
	  result.data[1].push(result.data[0][i] - getRandomValue(0, result.data[0][i] * 0.4));
	}
	return result;
}


app.get('/api/statistics/accessStatistics', function(req, res) {
	res.send(getAccessStatistics());
});

app.get('/api/statistics/registrationStatistics', function(req, res) {
	res.send(getRegistrationData());
});

app.post('/api/statistics/login', function(req, res) {
	console.log('Ein neuer Login. Hurra!');
	console.log(req.body);
	loginCounter++;
	res.sendStatus(200);
})

app.listen(8552, function() {
  console.log('Lame statistics service running at http://127.0.0.1:8552/');
});
