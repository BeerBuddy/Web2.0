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
	maxAnzahl: Number
});

 
//Initial save random events
Event.find(function (err, events) {
    if (events.length === 0) {
        for (var i = 0; i < (Math.random() * 20) + 1; i++) {
            var event = new Event(random.getRandomEvent());
            event.save(function (err) {
                if (err) {
                    console.log("failed to save Event: " + err);
                }
                else {
                    console.log("saved Event");
                }

            });
        }
    }
});

router.route('/')
.get( function(req, res) {
		//get where teilnehmer = ?
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
   var event = new Event();      // create a new instance of the event model
        
		    event.name = req.body.name;  // set the event name (comes from the request)
            event.ort = req.body.ort;  
            event.datum = req.body.datum;  
            event.event = req.body.event;  
            event.talks = req.body.talks; 
            event.teilnehmer = req.body.teilnehmer;  
            event.warteliste = req.body.warteliste;  
            event.maxAnzahl = req.body.maxAnzahl; 
			
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

        // use our Event model to find the event we want
        Event.findById(req.params.event_id, function(err, event) {

            if (err)
                res.send(err);
				else{
				//optimistic locking
				if(event._v === req.body._v)
				{
				 event.name = req.body.name;  // update the event info
				event.ort = req.body.ort;  
				event.datum = req.body.datum;  
				event.event = req.body.event;  
				event.talks = req.body.talks; 
				event.teilnehmer = req.body.teilnehmer;  
				event.warteliste = req.body.warteliste;  
				event.maxAnzahl = req.body.maxAnzahl; 
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
		
			
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else{
				if(event.teilnehmer.length < event.maxAnzahl)
				{
				event.teilnehmer.push(req.body.teilnehmer._id);
				}else
				{
				event.warteliste.push(req.body.teilnehmer._id);
				}
					
				
				  event.save(function(err) {
                if (err)
                    res.send(err);
					else
					res.json(event);
            });
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
			 Event.findById(req.params.event_id, function(err, event) {
			
            if (err)
                res.send(err);
				else{
				for(var i = 0; i<event.teilnehmer.length;i++)
				{
					if(event.teilnehmer[i]._id === req.body.teilnehmer._id)
					{
					//if there is someone waiting to join add him to teilnehmers
					if(event.wartelist.length > 0)
						event.teilnehmer[i] = event.wartelist[0];
						event.wartelist.splice( 0, 1 );
					}else //just remove from teilnehmers
					{
					event.teilnehmer.splice( i, 1 );
					}
				}		
				
				  event.save(function(err) {
                if (err)
                    res.send(err);
					else
					res.json(event);
            });
				}
				});
});

module.exports = router;
