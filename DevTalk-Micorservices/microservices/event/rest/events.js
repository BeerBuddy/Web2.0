var random = require('../random');
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Event = require('../model/event');


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
//get all events
.get( function(req, res) {
		//get where teilnehmer = ?
		 console.log("Get All where Teilnehmer: "+req.query.teilnehmer +" has taken part");
		if(req.query && req.query.teilnehmer)
		{
		//FIXME funzt net
			Event.find({ teilnehmer : req.query.teilnehmer },function(err, event) {
				if (err)
					res.send(err);
				else
					res.json(event);
			});
			
		}
		else //get All
 		{
			Event.find(function(err, event) {
				if (err)
					res.send(err);
				else
					res.json(event);
			});
		}
})
//insert a new event
.post( function(req, res) {
		 console.log("save new Event:");
		 console.log(req.body);
   var event = new Event();      // create a new instance of the event model
         event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datum = req.body.datum;  
				event.event = req.body.event;  
				event.teilnehmer = req.body.teilnehmer;  
				event.warteliste = req.body.warteliste;  
				event.kapazitaet = req.body.kapazitaet; 
			
        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.send(err);
			else
            res.json(event);
        });
})

router.route('/:event_id/')
// get the event with that id 
.get(function(req, res) {
        Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.send(err);
			else
				res.json(event);
        });
    })
// update the event with this id 
.put(function(req, res) {
		 console.log("update Event:");
		 console.log(req.body);
        // use our Event model to find the event we want
        Event.findById(req.params.event_id, function(err, event) {

            if (err)
                res.send(err);
				else if(event){
				//optimistic locking
				if(event.__v === req.body.__v)
				{
				 event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datum = req.body.datum;  
				event.event = req.body.event;  
				event.talks = req.body.talks; 
				event.teilnehmer = req.body.teilnehmer;  
				event.warteliste = req.body.warteliste;  
				event.kapazitaet = req.body.kapazitaet; 
				   // save the event
            event.save(function(err) {
                if (err)
                    res.send(err);
else
                res.json(event);
            });
				}else
				{
				 res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Could not update: Version mismatch.');

				}
       
	
			
         
			}
			else
			{
			 res.writeHead(500, {
				'Content-Type': 'text/plain'
					});
					res.end('Could not update');
			}

        });
    })
// delete the Event with this id
.delete(function(req, res) {
	Event.remove({
		_id: req.params.event_id
	}, function(err, speaker) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

router.route('/:event_id/teilnehmer')
//get all teilnehmer of a certain event
.get(function(req,res){
 Event.findById(req.params.event_id, function(err, event) {
				if (err){
                res.send(err);
				}else if(event ){
					res.json(event.teilnehmer);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
 });
})
//add a new teilnhemer to a event
.post(function(req,res){
					
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else if(event){
				
				
					if(event.teilnehmer.length < event.kapazitaet)
					{
						if(event.teilnehmer.indexOf(req.body.teilnehmer._id) === -1){
							event.teilnehmer.push(req.body.teilnehmer._id);
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
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
				});
			
});

router.route('/:event_id/teilnehmer/:teilnehmer_id')
//get the teilnehmer id
.get(function(req,res){
		Event.findById(req.params.event_id, function(err, event) {
				if (err){
                res.send(err);
				}else if(event && event.teilnehmer && event.teilnehmer.indexOf(req.params.teilnehmer_id) > 0){
					res.json(event.teilnehmer[event.teilnehmer.indexOf(req.params.teilnehmer_id)]);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
});
})
//update teilnehmer id in teilnehmer list
.put(function(req,res){
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
                res.send(err);
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
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
			}
		})
		})
//delete teilnehmer from teilnehmer list
.delete(function(req,res){
			console.log(req.body);
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else if(event ){
					
					//if he is in teinehmers
					var index = event.teilnehmer.indexOf(req.params.teilnehmer_id);
					if(index > -1)
					{
						//if there is someone waiting to join add him to teilnehmers
						if(event.wartelist && event.wartelist.length > 0){
							event.teilnehmer[index] = event.wartelist[0];
							event.wartelist.splice( 0, 1 );
						}else //just remove from teilnehmers
						{
							event.teilnehmer.splice( index, 1 );
						}
						
						 event.save(function(err) {
							if (err)
								res.send(err);
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
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
				});
});

router.route('/:event_id/warteliste')
//get all teilnehmer in warteliste of a certain event
.get(function(req,res){
				Event.findById(req.params.event_id, function(err, event) {
				if (err){
					res.send(err);
				}else if(event ){
					res.json(event.warteliste);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
});
})
//add a new teilnhemer to warteliste
.post(function(req,res){			
		Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.send(err);
				else if(event){
					if(event.warteliste.indexOf(req.body.teilnehmer._id) === -1){
						event.warteliste.push(req.body.teilnehmer._id);
						event.save(function(err) {
							if (err)
							res.send(err);
							else
							res.json(event);
						});
					}else
					{
					  res.json(event);
					}

				 
				}else
				{
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
		});
			
});

router.route('/:event_id/warteliste/:teilnehmer_id')
//get the teilnehmer id
.get(function(req,res){
				Event.findById(req.params.event_id, function(err, event) {
				if (err){
					res.send(err);
				}else if(event && event.warteliste && event.warteliste.indexOf(req.params.teilnehmer_id) > 0){
					res.json(event.warteliste[event.warteliste.indexOf(req.params.teilnehmer_id)]);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
});
})
//update teilnehmer id in warteliste list
.put(function(req,res){
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
                res.send(err);
			else if(event){
					var index = event.warte.indexOf(req.params.teilnehmer_id);
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
						res.writeHead(404, {
						'Content-Type': 'text/plain'
						});
						res.end('Not found');
					}
					
				
			}else
			{
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
			}
		})
		})
//delete teilnehmer from warteliste list
.delete(function(req,res){
			console.log(req.body);
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else if(event){
					
					//if he is in warteliste
					var index = event.warteliste.indexOf(req.params.teilnehmer_id);
					if(index > -1)
					{
						event.warteliste.splice( index, 1 );
						event.save(function(err) {
							if (err)
								res.send(err);
							else
								res.json(event);
						 });
					}
					else{
						res.writeHead(404, {
						'Content-Type': 'text/plain'
						});
						res.end('Not found');
					}
				}
				else
				{
				 res.writeHead(404, {
				'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
			});
});

module.exports = router;
