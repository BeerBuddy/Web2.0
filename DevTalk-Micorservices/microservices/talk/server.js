var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//global settings
var settings = require("../settings.json");
//connect to the mongoDB
mongoose.connect(settings.talkService.db.protocol+'://'+settings.talkService.db.ip+':'+settings.talkService.db.port+'/'+settings.talkService.db.schema);

//restendpoints
var talks = require('./rest/talks');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/talks', talks);

app.get("/", function (req, res) {
  var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware 
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});
            res.send(JSON.stringify(routes));
  
});


app.listen(settings.talkService.rest.port);