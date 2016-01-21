var random = require('../random');
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Event = require('../model/event');
var roles = require('../../roles');


//Initial save random events
Event.find(function (err, events) {
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
//parse the user
.all( function (req, res, next) {
	if(req.headers.user){
		//to get the current user
		var user = JSON.parse(req.headers.user);
		req.user=user;
	}
	next(); // pass control to the next handler
})
//get all events
.get( function(req, res) {
		
		//get where teilnehmer = ?
		
		if(req.query && req.query.teilnehmer)
		{
			 console.log("Get All where Teilnehmer: "+req.query.teilnehmer +" has taken part");
			Event.find({ teilnehmer : req.query.teilnehmer },function(err, event) {
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
	if(roles.isAdmin(req.user))
	{
		 var event = new Event();      // create a new instance of the event model
         event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datum = req.body.datum;  
				event.description = req.body.description;  
				event.teilnehmer = req.body.teilnehmer;  
				event.warteliste = req.body.warteliste;  
				event.kapazitaet = req.body.kapazitaet; 
			
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
		if(roles.isAdmin(req.user))
		{
			// use our Event model to find the event we want
			Event.findById(req.params.event_id, function(err, event) {

				if (err)
					res.status(500).send(err);
					else if(event){
					//optimistic locking
					if(event.__v === req.body.__v)
					{
					 event.name = req.body.name;  // update the event info
					event.ort = req.body.ort;  
					event.datum = req.body.datum;  
					event.description = req.body.description;  
					event.talks = req.body.talks; 
					event.teilnehmer = req.body.teilnehmer;  
					event.warteliste = req.body.warteliste;  
					event.kapazitaet = req.body.kapazitaet; 
					   // save the event
				event.save(function(err) {
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
	if(roles.isAdmin(req.user))
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
	if((roles.isUser(req.user) && req.user._id === req.body.tid ) || roles.isAdmin(req.user))
	{
					
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.status(500).send(err);
				else if(event){
				
				
					if(event.teilnehmer.length < event.kapazitaet)
					{
						if(event.teilnehmer.indexOf(req.body.tid) === -1){
							//TODO send Email here
							event.teilnehmer.push(req.body.tid);
							event.save(function(err) {
								if (err)
								res.send(err);
								else
								res.json(event);
							});
						}
						else
						{
						res.json(event);
						}
					}else
					{
						//no capacity left add to warteliste
						res.redirect('../warteliste');
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
	if(roles.isAdmin(req.user))
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
					res.redirect('../../warteliste/'+req.params.teilnehmer_id);
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
	if((roles.isUser(req.user) && req.user._id === req.params.teilnehmer_id ) || roles.isAdmin(req.user))
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
							//TODO send Email here
						}else //just remove from teilnehmers
						{
							event.teilnehmer.splice( index, 1 );
							//TODO send Email here
						}
						
						 event.save(function(err) {
							if (err)
								res.status(500).send(err);
							else
								res.json(event);
						 });
			
					}
					else{
					//if he is in warteliste
					res.redirect('../../warteliste/'+req.params.teilnehmer_id);
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
	if((roles.isUser(req.user) && req.user._id === req.body.tid ) || roles.isAdmin(req.user))
	{		
		Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.status(500).send(err);
				else if(event){
					if(event.warteliste.indexOf(req.body.tid) === -1){
						//TODO send Email here
						event.warteliste.push(req.body.tid);
						event.save(function(err) {
							if (err)
							res.status(500).send(err);
							else
							res.json(event);
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
	if(roles.isAdmin(req.user))
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
	if((roles.isUser(req.user) && req.user._id === req.params.teilnehmer_id ) || roles.isAdmin(req.user))
	{
				 Event.findById(req.params.event_id, function(err, event) {
				
					if (err)
						res.send(err);
					else if(event){
						
						//if he is in warteliste
						var index = event.warteliste.indexOf(req.params.teilnehmer_id);
						if(index > -1)
						{
							//TODO send Email here
							event.warteliste.splice( index, 1 );
							event.save(function(err) {
								if (err)
									res.send(err);
								else
									res.json(event);
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
