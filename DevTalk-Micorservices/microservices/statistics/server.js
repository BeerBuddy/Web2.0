var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require("cors");
var settings = require("../settings.json");
var mongoose = require("mongoose");

mongoose.connect(settings.statisticService.db.protocol+'://'+settings.statisticService.db.ip+':'+settings.statisticService.db.port+'/'+settings.statisticService.db.schema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var EVENTTYPE = [{LOGIN: 'LOGIN'},
                {REGISTER: 'REGISTER'}
                ];
var eventSchema = mongoose.Schema({
    name: String,
    email: String,
    type: String,
    date: Date
});

eventSchema.pre('save', function (next) {
  this.date = new Date();
  next();
});

var Event = mongoose.model('Event', eventSchema);

//Initial save same users
Event.find(function (err, events) {
    if (events.length === 0) {
        var event = new Event({
            name: "user",
            email: "user@user.de",
            type: EVENTTYPE.REGISTER
        });
        saveEvent(event);

        event = new Event({
            name: "user",
            email: "user@user.de",
            type: EVENTTYPE.LOGIN
        });
        saveEvent(event);
    }
});

function saveEvent(event){
    event.save(function(err){
        if (err) {
            console.log("failed to save event: " + err);
        }
        else {
            console.log("saved event");
        }
    });
}

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
};

app.get('/events', function(req, res){
  Event.find(function (err, events) {
      if (err) {
          res.send(500, err);
      } else {
          res.send(events);
      }
  });
});

app.get('/userStatistics', function(req, res) {
	res.send(getAccessStatistics());
});

app.post('/userStatistics', function(req, res) {
	console.log('Ein neuer Login. Hurra!');
	console.log(req.body.email);
	loginCounter++;
	res.send('login');
});

app.listen(settings.statisticService.rest.port, function() {
  console.log('Lame statistics service running at '+ settings.statisticService.rest.protocol+'://'+settings.statisticService.rest.ip+':'+settings.statisticService.rest.port+'/');
});
