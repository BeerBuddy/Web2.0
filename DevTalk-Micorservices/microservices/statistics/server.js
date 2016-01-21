var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require("cors");
var settings = require("../settings.json");
var initializer = require("./initDB.js");
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

initializer.initDB(Event);

app.get('/events?:from', function(req, res){
  // only admins are allowed to see the statistic data
  if(req.headers.user.role === 'admin'){
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
  } else {
    res.sendStatus(401);
  }
});

function saveNewEvent(req, res, type){
  if(req.body !== undefined && req.body !== null){
    var event = new Event({
        email: req.body.user.email || 'unbekannt',
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
