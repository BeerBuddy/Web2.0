var express = require("express");
var app = express();
var mongoose = require("mongoose");
var settings = require("../settings.json");
mongoose.connect(settings.emailService.db.protocol+'://'+settings.emailService.db.ip+':'+settings.emailService.db.port+'/'+settings.emailService.db.schema);
var nodemailer = require("nodemailer");

const sender_mail = "devtalk.application@gmail.de";

//the EMail
var Email = mongoose.model('email', {
    sender_mail: String,
    receiver: String,
	receiver_name: String,
    subject: String,
    text: String
});
app.post('/email', function(req, res){
	try{   
		var transp = nodemailer.createTransport('smtps://devtalk.application%40gmail.com:microservice@smtp.gmail.com');

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: 	 sender_mail, // sender address
			to: 	 'devtalk.user@gmail.de', // list of receivers
			subject: 'Test from Nodemailer', // Subject line
			text: 	 'This is a great testmail you got from Nodemailer!' // plaintext body
		};

		transp.sendMail(mailOptions, function(err,response){
			if(err){
				console.log(err);
			}
			console.log(response);
        var email = new Email();
		email.sender_mail = sender_mail;
		email.receiver = JSON.parse(req.headers.user).name;
		email.receiver_mail = JSON.parse(req.headers.user).email;
		email.subject = "Test from Nodemailer";
		email.text = "This is a great testmail you got from Nodemailer!";
		email.save(function(err) {
            if (err)
                res.status(500).send(err);
		});			
			res.send(response);
		});	
	} catch(e){
		res.status(500).send(e);
	}
});

app.listen(settings.emailService.rest.port, function() {
  console.log('email service running at '+ settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/');
});