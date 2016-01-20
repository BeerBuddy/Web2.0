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

var EVENTTYPE = [];
EVENTTYPE.LOGIN = 'LOGIN';
EVENTTYPE.REGISTER = 'REGISTER';

var eventSchema = mongoose.Schema({
    email: String,
    type: String,
    date: Date
});

eventSchema.pre('save', function (next) {
  this.date = this.date || new Date();
  next();
});

var Event = mongoose.model('Event', eventSchema);

//Initial save some events
Event.find(function (err, events) {
    if (events.length === 0) {
        var getRandomValue = function(min, max){
          return Math.floor(((Math.random() * (max || 500)) + (min || 1)));
        };
        var d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - 6);
        var currDate = new Date();
        while(d < currDate){
            for(var index = 0; index <= getRandomValue(2,30); index++){
              d.setDate(getRandomValue(0,29));
              var event = new Event({
                  email: "dummy"+index+"@example.com",
                  type: EVENTTYPE.REGISTER,
                  date: d
              });
              saveEvent(event, function(){}, function(){});
              event = new Event({
                  email: "dummy"+index+"@example.com",
                  type: EVENTTYPE.LOGIN,
                  date: d
              });
              saveEvent(event, function(){}, function(){});
            }
            d.setMonth(d.getMonth() +1);
        }
        Event.count({},function (err, result) {
          console.log(result + " events saved");
        });
    }
});

function saveEvent(event, callbackSuccess, callbackError){
    event.save(function(err){
        if (err) {
            if(callbackError)
              callbackError(err);
            else
              console.log("failed to save event: " + err);
        }
        else {
            if(callbackSuccess)
              callbackSuccess();
            else
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
          res.sendStatus(500).sendBody(err);
      } else {
          res.send(events);
      }
  });
});

function saveNewEvent(req, res, type){
  if(req.body !== undefined && req.body !== null){
    var event = new Event({
        email: req.body.email || 'unbekannt',
        type: type
    });
    saveEvent(event, function(){
      res.sendStatus(200).sendBody(event);
    }, function(error){
      res.sendStatus(500).sendBody(error);
    });
  }
}

app.post('/events/login', function(req, res){
  saveNewEvent(req, res, EVENTTYPE.LOGIN);
});

app.post('/events/register', function(req, res){
  saveNewEvent(req, res, EVENTTYPE.REGISTER);
});

app.delete('/events', function(req, res){
  Event.remove({}, function (err, events) {
      if (err) {
          res.sendStatus(500).sendBody(err);
      } else {
          res.sendStatus(204);
      }
  });
});


app.listen(settings.statisticService.rest.port, function() {
  console.log('Lame statistics service running at '+ settings.statisticService.rest.protocol+'://'+settings.statisticService.rest.ip+':'+settings.statisticService.rest.port+'/');
});
