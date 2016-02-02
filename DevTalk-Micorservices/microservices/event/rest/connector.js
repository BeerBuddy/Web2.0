var request = require('request');
var settings = require("../../settings.json");

function sendMail(mail,name,event,type,callback){
		request.post({url:settings.emailService.rest.protocol + '://' + settings.emailService.rest.ip + ':' + settings.emailService.rest.port + '/email' , form: {mail:mail, name:name, event:event, type:type}},callback);
};

var obj = {

	getUserById : function(id, callback){
		
			request(settings.userService.rest.protocol + '://' + settings.userService.rest.ip + ':' + settings.userService.rest.port + '/' + id, 
		callback);
		
		
	},
	
	sendMailWarteliste: function(event,name,mail,callback)
	{
		try{
		sendMail(mail,name,event.name,'WAIT', callback);
		}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailTeilnehmer: function(event,name,mail,callback)
	{
		try{
		sendMail(mail,name,event.name,'SIGNIN', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailNachruecker: function(event,name,mail,callback)
	{
		try{
		sendMail(mail,name,event.name,'SUCCESSOR', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	
	sendMailAbgemeldet: function(event,name,mail,callback)
	{
		try{
		sendMail(mail,name,event.name,'SIGNOUT', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	},
	sendMailWartelisteAbgemeldet: function(event,name,mail,callback)
	{
		try{
		sendMail(mail,name,event.name,'ENDWAIT', callback);
	}catch(err)
		{
			callback && callback(err);
		}
	}

};
module.exports = obj;