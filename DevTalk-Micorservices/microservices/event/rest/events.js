var random = require('../random');
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Event = require('./../model/event');
var roles = require('../../roles');
var connect = require('./connector');
var MongoQS = require('mongo-querystring');
var qs = new MongoQS({});


//Initial save random events
Event.find(function (err, events) {
	if(err)
	{
		  console.log(err);
	}else
    if (events.length === 0) {
        for (var i = 0; i < (Math.random() * 20) + 1; i++) {
            var event = new Event(random.getRandomEvent());
            event.save(function (err) {
                if (err) {
                    console.log("failed to save Event: " + err);
                } else {
                    console.log("saved Event");
                }
            });
        }
    }
});


router.route('/')

//get all events
.get( function(req, res) {
		
		//get where teilnehmer = ?
		
		if(req.query)
		{
			// look at https://github.com/Turistforeningen/node-mongo-querystring
			//parse all url params through MongoQS
			var query = qs.parse(req.query);
			 console.log("Get All where :");
			  console.log(query);
			Event.find(query,function(err, event) {
				if (err)
					res.status(500).send(err);
				else
					res.json(event);
			});
			
		}
		else //get All
 		{
			Event.find(function(err, event) {
				if (err)
					res.status(500).send(err);
				else
					res.json(event);
			});
		}
})
//insert a new event
.post( function(req, res) {
	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
		 var event = new Event();      // create a new instance of the event model
         event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datumVon = req.body.datumVon;  
				event.datumBis = req.body.datumBis;  
				event.beschreibung = req.body.beschreibung;  
				event.teilnehmer = req.body.teilnehmer;  
				event.warteliste = req.body.warteliste;  
				event.kapazitaet = req.body.kapazitaet; 
				event.kategorie= req.body.kategorie; 
			
        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.status(500).send(err);
			else
            res.json(event);
        });
	}else
	{
		 res.status(401).send("No Permission to insert Event");
	}		
  
})

router.route('/:event_id/')
// get the event with that id 
.get(function(req, res) {
        Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.status(500).send(err);
			else
				res.json(event);
        });
    })
// update the event with this id 
.put(function(req, res) {
console.log(JSON.parse(req.headers.user));
console.log("tries to save");
console.log(req.body);
		if(roles.isAdmin(JSON.parse(req.headers.user)))
		{
			// use our Event model to find the event we want
			Event.findById(req.params.event_id, function(err, event) {

				if (err)
					res.status(500).send(err);
					else if(event){
					//optimistic locking
					if(event.__v === req.body.__v)
					{
					   // update the event info
						event.ort = req.body.ort;  
						event.datumVon = req.body.datumVon;  
						event.datumBis = req.body.datumBis;  
						event.beschreibung = req.body.beschreibung;  
						event.teilnehmer = req.body.teilnehmer;  
						event.warteliste = req.body.warteliste;  
						event.kapazitaet = req.body.kapazitaet; 
						event.kategorie= req.body.kategorie; 
							   // save the event
						event.save(function(err, event) {
							if (err)
								res.status(500).send(err);
								else
								res.json(event);
							});
					}else
					{
						//Versionskonflikt
						 res.status(409).send('Could not update: Version mismatch.');
					}
				
				}
				else
				{
					//Event nicht gefunden
					res.status(404).send('Event not found');
				}

			});
		}else
		{
			 res.status(401).send("No Permission to update Event");
		}		
    })
// delete the Event with this id
.delete(function(req, res) {
	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
		Event.remove({
			_id: req.params.event_id
		}, function(err, speaker) {
			if (err)
				res.status(500).send(err);

			res.json({ message: 'Successfully deleted' });
		});
	}else
	{
		res.status(401).send("");
	}
});

router.route('/:event_id/teilnehmer')
//get all teilnehmer of a certain event
.get(function(req,res){
 Event.findById(req.params.event_id, function(err, event) {
				if (err){
                res.status(500).send(err);
				}else if(event ){
					res.json(event.teilnehmer);
				}else{
					res.status(404).send('Event not found');
				}
 });
})
//add a new teilnhemer to a event
.post(function(req,res){
	//wenn ein User sich selber hinzufügen möchte darf er das, sonst muss er Admin sein
	var user = JSON.parse(req.headers.user);
	if((roles.isUser(user) && user._id === req.body.teilnehmer ) || roles.isAdmin(user))
	{
					
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.status(500).send(err);
				else if(event){
				
				
					if(event.teilnehmer.length < event.kapazitaet)
					{
						if(event.teilnehmer.indexOf(req.body.teilnehmer) === -1){
							
							event.teilnehmer.push(req.body.teilnehmer);
							event.save(function(err) {
								if (err){
									res.status(500).send(err);
								}
								else{
									//send Email here
									connect.getUserById(req.body.teilnehmer, function(err,httpResponse,body){
										console.log(body);
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											connect.sendMailTeilnehmer(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													res.json(event);
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
									
								}
								
							});
						}
						else
						{
						res.json(event);
						}
					}else
					{
						//no capacity left add to warteliste
						res.redirect(307,'./warteliste');
					}

				 
				}else
				{
				res.status(404).send('Event not found');
				}
				});
	}else
	{
		res.status(401).send("No Permission to add to teilnehmerliste");
	}
			
});

router.route('/:event_id/teilnehmer/:teilnehmer_id')
//get the teilnehmer id
.get(function(req,res){
		Event.findById(req.params.event_id, function(err, event) {
				if (err){
                res.status(500).send(err);
				}else if(event && event.teilnehmer && event.teilnehmer.indexOf(req.params.teilnehmer_id) > 0){
					res.json(event.teilnehmer[event.teilnehmer.indexOf(req.params.teilnehmer_id)]);
				}else{
					res.status(404).send('Event not found');
				}
});
})
//update teilnehmer id in teilnehmer list
.put(function(req,res){

	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
                res.status(500).send(err);
			else if(event){
					var index = event.teilnehmer.indexOf(req.params.teilnehmer_id);
					if(index > 0)
					{
						event.teilnehmer[index]=req.body.teilnehmer._id;
						event.save(function(err) {
						if (err)
							res.send(err);
						else
							res.json(event);
					});
					}
					else
					{
					//not in teilnehmer maybe in warteliste
					res.redirect(307,'../warteliste/'+req.params.teilnehmer_id);
					}
					
				}
			else
			{
				res.status(404).send('Event not found');
			}
		});
	}else
	{
		res.status(401).send("");
	}
})
//delete teilnehmer from teilnehmer list
.delete(function(req,res){
	//wenn ein User sich selber löschen möchte darf er das, sonst muss er Admin sein
	var user = JSON.parse(req.headers.user);
	if((roles.isUser(user) && user._id === req.params.teilnehmer_id ) || roles.isAdmin(user))
	{
			console.log(req.body);
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.status(500).send(err);
				else if(event ){
					
					//if he is in teinehmers
					var index = event.teilnehmer.indexOf(req.params.teilnehmer_id);
					if(index > -1)
					{
						//if there is someone waiting to join add him to teilnehmers
						if(event.wartelist && event.wartelist.length > 0){
							event.teilnehmer[index] = event.wartelist[0];
							event.wartelist.splice( 0, 1 );
							//save the event
							 event.save(function(err) {
							if (err)
								res.status(500).send(err);
							else
								// send Email here jemand ist nachgerückt er muss informiert werden
								connect.getUserById(event.teilnehmer[index], function(err,httpResponse,body){
									console.log("returned");
									console.log(body);
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											console.log("connect.sendMail: "+JSON.parse(body).email);
											connect.sendMailNachruecker(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													//der der sich abgemeldet hat muss auch informiert werden
														connect.getUserById(req.params.teilnehmer_id, function(err,httpResponse,body){
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											console.log("connect.sendMail: "+JSON.parse(body).email);
											connect.sendMailAbgemeldet(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													res.json(event);
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
							});
						}else //just remove from teilnehmers
						{
							event.teilnehmer.splice( index, 1 );
							//save the event
							 event.save(function(err) {
							if (err)
								res.status(500).send(err);
							else
								// send Email here
								connect.getUserById(req.params.teilnehmer_id, function(err,httpResponse,body){
									console.log("returned");
									console.log(body);
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											console.log("connect.sendMail: "+JSON.parse(body).email);
											connect.sendMailAbgemeldet(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													res.json(event);
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
							});
							
						}
						
						
			
					}
					else{
					//if he is in warteliste
					res.redirect(307,'../warteliste/'+req.params.teilnehmer_id);
					}
				
				 
				}
				else
				{
				res.status(404).send('Event not found');
				}
				});
	}else
	{
		res.status(401).send("No Permission to delete from teilnehmerliste");
	}
});

router.route('/:event_id/warteliste')
//get all teilnehmer in warteliste of a certain event
.get(function(req,res){
				Event.findById(req.params.event_id, function(err, event) {
				if (err){
					res.status(500).send(err);
				}else if(event ){
					res.json(event.warteliste);
				}else{
					res.status(404).send('Event not found');
				}
});
})
//add a new teilnhemer to warteliste
.post(function(req,res){	
	//wenn ein User sich selber hinzufügen möchte darf er das, sonst muss er Admin sein
	var user = JSON.parse(req.headers.user);
	if((roles.isUser(user) && user._id === req.body.teilnehmer ) || roles.isAdmin(user))
	{		
		Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.status(500).send(err);
				else if(event){
					if(event.warteliste.indexOf(req.body.teilnehmer) === -1){
						//send Email here
						event.warteliste.push(req.body.teilnehmer);
						event.save(function(err) {
							if (err)
							res.status(500).send(err);
							else
								connect.getUserById(req.body.teilnehmer, function(err,httpResponse,body){
									console.log(body);
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											console.log("connect.sendMail: "+JSON.parse(body).email);
											connect.sendMailWarteliste(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													res.json(event);
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
						});
					}else
					{
					  res.json(event);
					}

				 
				}else
				{
					res.status(404).send('Event not found');
				}
		});
	}else
	{
		res.status(401).send("No Permission to add to warteliste");
	}
			
});

router.route('/:event_id/warteliste/:teilnehmer_id')
//get the teilnehmer id
.get(function(req,res){
				Event.findById(req.params.event_id, function(err, event) {
				if (err){
					res.status(500).send(err);
				}else if(event && event.warteliste && event.warteliste.indexOf(req.params.teilnehmer_id) > 0){
					res.json(event.warteliste[event.warteliste.indexOf(req.params.teilnehmer_id)]);
				}else{
					res.status(404).send('Event not found');
				}
});
})
//update teilnehmer id in warteliste list
.put(function(req,res){
	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
                res.status(500).send(err);
			else if(event){
					var index = event.warteliste.indexOf(req.params.teilnehmer_id);
					if(index > 0)
					{
						event.warteliste[index]=req.body.warteliste._id;
						event.save(function(err) {
						if (err)
							res.status(500).send(err);
						else
							res.json(event);
						});
					}
					else
					{
						res.status(404).send('Teilnehmer not found');
					}
					
				
			}else
			{
				 res.status(404).send('Event not found');
			}
		});
	}else
	{
		res.status(401).send("");
	}
})
//delete teilnehmer from warteliste list
.delete(function(req,res){
	//wenn ein User sich selber löschen möchte darf er das, sonst muss er Admin sein
	var user = JSON.parse(req.headers.user);
	if((roles.isUser(user) && user._id === req.params.teilnehmer_id ) || roles.isAdmin(user))
	{
				 Event.findById(req.params.event_id, function(err, event) {
				
					if (err)
						res.send(err);
					else if(event){
						
						//if he is in warteliste
						var index = event.warteliste.indexOf(req.params.teilnehmer_id);
						if(index > -1)
						{
							// send Email here
							event.warteliste.splice( index, 1 );
							event.save(function(err) {
								if (err)
									res.send(err);
								else
										connect.getUserById(req.params.teilnehmer_id, function(err,httpResponse,body){
											console.log(body);
											
										if(!err && body && httpResponse.statusCode === 200)
										{
											console.log("body");
											console.log(body);
											console.log("connect.sendMail: "+JSON.parse(body).email);
											connect.sendMailWartelisteAbgemeldet(event,JSON.parse(body).email, function(err,httpResponse,body){
												if(err || httpResponse.statusCode != 200)
												{
													res.status(500).send(err);
												}else
												{
													res.json(event);
												}
													
											});
										}
										else
										{
											res.status(500).send(err);
										}
										
									});
							 });
						}
						else{
							res.status(404).send('Teilnehmer not found');
						}
					}
					else
					{
					 res.status(404).send('Event not found');
					}
				});
	}else
	{
		res.status(401).send("No Permission to delete from warteliste");
	}
	
	
	
});

module.exports = router;
