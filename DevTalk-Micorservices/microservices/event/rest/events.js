var random = require('../random');
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");


var Event = mongoose.model('Event', {
    name: String,
    ort: String,
    datum: String,
    event: String,
    talks: [],
    teilnehmer: [],
	warteliste: [],
	kapazitaet: Number
});

 
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
.post( function(req, res) {
		 console.log("save new Event:");
		 console.log(req.body);
   var event = new Event();      // create a new instance of the event model
         event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datum = req.body.datum;  
				event.event = req.body.event;  
				event.talks = req.body.talks; 
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
			/*
			Join event expects following json:
			{
				'teilnehmer': {
					'_id' : ObjectId //the id of the user
				}
			}
			*/
router.route('/:event_id/join').put(function(req, res) {
		 console.log("join Event:"+req.params.event_id);
		 console.log(req.body);
		
			
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else if(event){
				console.log(!event.kapazitaet);
				console.log(event.teilnehmer.length < event.kapazitaet);
				if(event.teilnehmer.length < event.kapazitaet)
				{
					if(event.teilnehmer.indexOf(req.body.teilnehmer._id) === -1)
						event.teilnehmer.push(req.body.teilnehmer._id);
				}else
				{
				if(event.warteliste.indexOf(req.body.teilnehmer._id) === -1)
					event.warteliste.push(req.body.teilnehmer._id);
				}
					
				
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
					res.end('Could not decline');
				}
				});
			
});
			/*
			If someone has decided to not take part on the event declineEvent can be called to remove him from teilnehmers
			The function expects the following json:
			{
				'teilnehmer': {
					'_id' : ObjectId //the id of the user
				}
			}
			*/
router.route('/:event_id/decline').put(function(req, res) {
		 console.log("decline Event:"+req.params.event_id);
		 console.log(req.body);
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else if(event ){
					
					//if he is in teinehmers
					var index = event.teilnehmer.indexOf(req.body.teilnehmer._id);
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
					}
					else{
					//if he is in warteliste
					index = event.warteliste.indexOf(req.body.teilnehmer._id) === -1
						if(index > -1)
						event.warteliste.splice( index, 1 );
					}
				
				  event.save(function(err) {
                if (err)
                    res.send(err);
					else
					res.json(event);
            });
				}
				else
				{
				 res.writeHead(500, {
				'Content-Type': 'text/plain'
					});
					res.end('Could not decline');
				}
				});
});

module.exports = router;
