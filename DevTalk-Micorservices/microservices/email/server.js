var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var settings = require("../settings.json");
var nodemailer = require("nodemailer");

//DB-connect
mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//constant for mail sender
const sender_mail = "devtalk.application@gmail.com";
//FOR TESTING: constant for mail reveiver
const receiver_mail = "devtalk.user@gmail.com";

//model
var Email = mongoose.model('email', {
    sender: String,
    receiver: String,
    subject: String,
    text: String,
	timestamp: Date
});

//types of mails (for case analysis)
var mailType = [];
mailType.signin = 'SIGNIN';
mailType.signout = 'SIGNOUT';
mailType.wait = 'WAIT';
mailType.endwait = 'ENDWAIT';
mailType.successor = 'SUCCESSOR';
mailType.register = 'REGISTER';
mailType.profile = 'PROFILE';
mailType.recommend = 'RECOMMEND';

//create new mail
app.post('/email', function(req, res){
	//case analysis by mail types
	switch(req.body.type) {
			case mailType.signin:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Your Sign-In', // Subject line
					text: 	 'Hello ' + req.body.name + ',\nyou have been signed-in for the Talk ' + req.body.event + '. Have fun there!' // plaintext body
				};	
				break;
			case mailType.signout:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Your Sign-Out', // Subject line
					text: 	 'Hello ' + req.body.name + ',\nyou have been signed-out from the Talk ' + req.body.event +'. It is a pity!' // plaintext body
				};	
				break;
			case mailType.wait:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Waiting List for Talk', // Subject line
					text: 	 'Hello ' + req.body.name + ',\ncurrently we do not have a place for the Talk ' + req.body.event + '. But you are on the waiting list, so have patience!' // plaintext body
				};
				break;
			case mailType.endwait:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Sign-out from Waiting List', // Subject line
					text: 	 'Hello ' + req.body.name + ',\nyou have been signed-out from the Waiting List for the Talk ' + req.body.event + '. Maybe next time!' // plaintext body
				};	
				break;
			case mailType.successor:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Successor for Talk', // Subject line
					text: 	 'Hello ' + req.body.name + ',\nyour patience paid off. You have been crossed off the waiting list and enrolled for the Talk ' + req.body.event + '. Have fun there!' // plaintext body
				};	
				break;
			case mailType.register:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Your Registration for DevTalk', // Subject line
					text: 	 'Hello ' + req.body.name + ',\nyou are now registered for DevTalk. Welcome!' // plaintext body
				};			
				break;
			case mailType.profile:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'Profile updated', // Subject line
					text: 	 'Hello '+ req.body.name + ',\nyour profile has been updated. Well done!' // plaintext body
				};	
				break;
			case mailType.recommend:
				var mailOptions = {
					from: 	 sender_mail, // sender address
					to: 	 req.body.mail, // receiver address
					subject: 'New Recommendation', // Subject line
					text: 	 'Hello, ' + req.body.name + ',\nwe have got a new recommendation for you. Check it out!' // plaintext body
				};
				break;
			default:
				console.log("Invalid Mail Type!");
	} 
	try {
		//FOR TESTING: static receiver devtalk.user@gmail.de
		//comment for real use
		mailOptions.to = receiver_mail;
		//-----------------------------
		
		sendMail(req, res, mailOptions);
	} catch(e){
		res.status(500).send(e);	
	}
});

function sendMail(req, res, mailOptions){
	try {
		var transp = nodemailer.createTransport('smtps://devtalk.application%40gmail.com:microservice@smtp.gmail.com');
		//really sending the Mail via SMTP GMail
		transp.sendMail(mailOptions, function(err,response){
			if(err){
				res.status(500).send(err);	
			}
			//build instance for DB-save
			var email = new Email();
			email.sender = mailOptions.from;
			email.receiver = mailOptions.to;
			email.subject = mailOptions.subject;
			email.text = mailOptions.text;
			email.timestamp = new Date();
			//call DB-save
			writeLog(req, res, email);
		});
	} catch(e){
		res.status(500).send(e);	
	}
}

function writeLog(req, res, email){
	//really saving in DB
	email.save(function(err) {
		if (err){
			res.status(500).send(err);
		} else{
			res.json(email);
		}
	});				
}

//getting all mails from DB
app.get("/email", function (req, res) {
    Email.find(function (err, email) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(email);
        }
    });
});

//getting all mails for one receiver (mail) from DB
app.get("/email/:receiver", function (req, res) {
    Email.find({
        receiver: req.params.receiver
    }, function (err, email) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(email);
        }
    })
});

app.listen(settings.emailService.rest.port, function() {
  console.log('Email Service running at '+ settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/');
});