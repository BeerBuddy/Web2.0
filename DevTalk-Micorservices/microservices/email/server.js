var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var settings = require("../settings.json");
mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//the EMail
var Email = mongoose.model('email', {
    sender: String,
    receiver: String,
    subject: String,
    text: String
});

app.listen(settings.emailService.rest.port);