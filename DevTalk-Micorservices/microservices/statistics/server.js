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
        var error = function(err){if (err) {
            console.log("failed to save event: " + err);
        }};
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
                  date: (new Date(d.getTime()))
              });
              event.save(error);
            }
            for(var index = 0; index <= getRandomValue(2,90); index++){
              d.setDate(getRandomValue(0,29));
              event = new Event({
                  email: "dummy"+index+"@example.com",
                  type: EVENTTYPE.LOGIN,
                  date: (new Date(d.getTime()))
              });
              event.save(error);
            }
            d.setMonth(d.getMonth() +1);
        }
        Event.count({},function (err, result) {
          console.log(result + " events saved");
        });
    }
});

app.get('/events?:from', function(req, res){
  if(!req.query.from){
    Event.find(function (err, events) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(events);
        }
    });
  } else {
    try {
        var fromDate = new Date(parseInt(req.query.from));
        if(fromDate){
          Event.find({'date': { $gt: fromDate}}, function (err, events) {
              if (err) {
                  res.status(500).send(err);
              } else {
                  res.send(events);
              }
          });
        } else {
          throw new Error('No valid date supplied');
        }
    } catch (e) {
      res.status(500).send(e);
    }
  }
});

function saveNewEvent(req, res, type){
  if(req.body !== undefined && req.body !== null){
    var event = new Event({
        email: req.body.email || 'unbekannt',
        type: type
    });
    event.save(
      function(err){
          if (err) {
              res.status(500).send(err);
              console.log("failed to save event: " + err);
          }
          else {
              res.status(200).send(event);
              console.log("saved event");
          }
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
          res.status(500).send(err);
      } else {
          res.sendStatus(204);
      }
  });
});


app.listen(settings.statisticService.rest.port, function() {
  console.log('Lame statistics service running at '+ settings.statisticService.rest.protocol+'://'+settings.statisticService.rest.ip+':'+settings.statisticService.rest.port+'/');
});
