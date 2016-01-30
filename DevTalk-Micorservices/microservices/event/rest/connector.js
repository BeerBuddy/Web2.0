var request = require('request');
var settings = require("../../settings.json");

function sendMail(mail,text,subject,callback){
		
		console.log("sendMail" + subject +" to "+ mail );
		request.post({url:settings.emailService.rest.protocol + '://' + settings.emailService.rest.ip + ':' + settings.emailService.rest.port + '/email' , form: {receiver:mail, text: text, subject: subject}}, 
		callback);
};

var obj = {

	getUserById : function(id, callback){
		
			request(settings.userService.rest.protocol + '://' + settings.userService.rest.ip + ':' + settings.userService.rest.port + '/' + id, 
		callback);
		
		
	},
	
	sendMailWarteliste: function(event, mail,callback)
	{
		try{
		sendMail(mail,'Leider sind keine Kapazitäten mehr für das Event '+ event.name +' verfügbar, sie wurden aber auf die Warteliste gesetzt','Sie sind auf der Warteliste', callback);
		}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailTeilnehmer: function(event, mail,callback)
	{
		try{
		sendMail(mail,'Herzlichen glückwunsch, Sie haben sich erfolgreich zum Event '+ event.name +' angemeldet. Sollten Sie nichtmehr teilnehmen wollen melden Sie sich bitte ab.','Sie haben sich angemeldet', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailNachruecker: function(event, mail,callback)
	{
		try{
		sendMail(mail,'Herzlichen Glückwunsch, Sie sind nachgerückt und sidn jetzt für das Event '+ event.name +' angemeldet. Sollten Sie nichtmehr teilnehmen wollen melden Sie sich bitte ab.','Sie sind Nachgerückt', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailAbgemeldet: function(event, mail,callback)
	{
		try{
		sendMail(mail,'Sie haben sich erfolgreich von dem Event '+ event.name +' abgemdelte.','Sie haben sich abgemeldet', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	sendMailWartelisteAbgemeldet: function(event, mail,callback)
	{
		try{
		sendMail(mail,'Sie haben sich erfolgreich von der Warteliste für das Event '+ event.name +' abgemdelte.','Sie haben sich abgemeldet', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	}

};
module.exports = obj;