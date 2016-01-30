var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mongoose = require("mongoose");
var settings = require("../settings.json");
var nodemailer = require("nodemailer");
mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sender_mail = "devtalk.application@gmail.com";
const receiver_mail = "devtalk.user@gmail.com";

//the EMail
var Email = mongoose.model('email', {
    sender_mail: String,
    receiver: String,
	receiver_name: String,
    subject: String,
    text: String
});

var mailType = [];
mailType.enroll = 'ENROLL';
mailType.profile = 'PROFILE';
mailType.recommend = 'RECOMMEND';
mailType.register = 'REGISTER';
mailType.wait = 'WAIT';
mailType.endwait = 'ENDWAIT';

app.post('/email', function(req, res){
	try {
		console.log(req.body);
		var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.receiver, // receiver address (here always devtalk.user@gmail.de
					subject: req.body.subject, // Subject line
					text: 	 req.body.text // plaintext body
				};
		sendMail(req, res, mailOptions);
	} catch(e){
		res.status(500).send(e);	
	}
});

app.post('/enroll', function(req, res){
	createMail(req, res, mailType.enroll);
});

app.post('/recommend', function(req, res){
	createMail(req, res, mailType.recommend);
});

app.post('/register', function(req, res){
	createMail(req, res, mailType.register);
});

app.post('/wait', function(req, res){
	createMail(req, res, mailType.wait);
});

app.post('/endwait', function(req, res){
	createMail(req, res, mailType.endwait);
});


function createMail(req, res, type){
	// setup e-mail data
	switch(type) {
		case mailType.recommend:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'New Recommendation', // Subject line
				text: 	 'Hello, we have got a new recommendation for you. Check it out!' // plaintext body
			};
			sendMail(req, res, mailOptions);
			break;
		case mailType.register:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'Your Registration for DevTalk', // Subject line
				text: 	 'Hello ' + req.body.name + ',\nyou are now registered for DevTalk. Welcome!' // plaintext body
			};
			sendMail(req, res, mailOptions);			
			break;
		case mailType.enroll:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'New Enrollment', // Subject line
				text: 	 'Hello, you have been enrolled for the Talk. Have fun there!' // plaintext body
			};	
			sendMail(req, res, mailOptions);
			break;
		case mailType.profile:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'Profile updated', // Subject line
				text: 	 'Hello '+ req.body.name + ',\n your profile has been updated. Well done!' // plaintext body
			};	
			sendMail(req, res, mailOptions);
			break
		case mailType.wait:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'Waiting List for Talk', // Subject line
				text: 	 'Hello, currently we do not have a place for you. But you are on the waiting list, so have patience!' // plaintext body
			};
			sendMail(req, res, mailOptions);
			break;
		case mailType.endwait:
			var mailOptions = {
				from: 	 sender_mail, // sender address
				to: 	 receiver_mail, // receiver address (here always devtalk.user@gmail.de
				subject: 'Successor for Talk', // Subject line
				text: 	 'Hello, your patience paid off. You have been crossed off the waiting list and enrolled for the talk. Have fun there!' // plaintext body
			};	
			sendMail(req, res, mailOptions);
			break;
		default:
			console.log("Invalid Mail Type!");
	} 
}

function sendMail(req, res, mailOptions){
	try {
		var transp = nodemailer.createTransport('smtps://devtalk.application%40gmail.com:microservice@smtp.gmail.com');
		transp.sendMail(mailOptions, function(err,response){
			if(err){
				console.log(err);
				res.status(500).send(err);	
			}
			//writeLog(req, res, mailOptions);
			console.log(response);
			res.status(200).send("Email gesendet");	
		});
	} catch(e){
		res.status(500).send(e);	
	}
}

function writeLog(req, res, mailOptions){
	var email = new Email();
	email.sender_mail = sender_mail;
	email.receiver = JSON.parse(req.headers.user).name;
	email.receiver_mail = JSON.parse(req.headers.user).email;
	email.subject = mailOptions.subject;
	email.text = mailOptions.text;
	email.save(function(err) {
		if (err)
			res.status(500).send(err);
	});			
	res.send(response);	
}

app.listen(settings.emailService.rest.port, function() {
  console.log('email service running at '+ settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/');
});