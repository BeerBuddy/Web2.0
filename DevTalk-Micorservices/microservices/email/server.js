var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var settings = require("../settings.json");
mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);
var nodemailer = require("nodemailer");
//var mongoose = require("mongoose");
//mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//the EMail
var Email = mongoose.model('email', {
    sender: String,
    receiver: String,
    subject: String,
    text: String
app.post('/email', function(req, res){
	try{   
		var transp = nodemailer.createTransport('smtps://devtalk.application%40gmail.com:microservice@smtp.gmail.com');

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: 	 'devtalk.application@gmail.de', // sender address
			to: 	 'devtalk.user@gmail.de', // list of receivers
			subject: 'Test from Nodemailer', // Subject line
			text: 	 'This is a great testmail you got from Nodemailer!' // plaintext body
		};

		transp.sendMail(mailOptions, function(err,response){
			if(err){
				console.log(err);
			}
			console.log(response);
			res.send(response);
		});	
	} catch(e){
		res.status(500).send(e);
	}
});

app.listen(settings.emailService.rest.port, function() {
  console.log('email service running at '+ settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/');
});