var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Talk = require('../model/talk');


router.route('/')
//get all talks
.get( function(req, res) {
		//get where event = ?
		 console.log("Get All where event: "+req.query.event +" has taken part");
		if(req.query && req.query.event)
		{
			Talk.find({ event : req.query.event },function(err, talk) {
				if (err)
					res.send(err);
				else
					res.json(talk);
			});
			
		}
		else //get All
 		{
			Talk.find(function(err, talk) {
				if (err)
					res.send(err);
				else
					res.json(talk);
			});
		}
})
//insert a new talk
.post( function(req, res) {
		 console.log("save new Talk:");
		 console.log(req.body);
   var talk = new Talk();      // create a new instance of the talk model
				talk.title = req.body.title;  // update the talk info
				talk.event = req.body.event;  
				talk.description = req.body.description;  
				talk.startTime = req.body.startTime;  
				talk.endTime = req.body.endTime; 
				talk.speakers = req.body.speakers;  
				
			
        // save the talk and check for errors
        talk.save(function(err) {
            if (err)
                res.send(err);
			else
				res.json(talk);
        });
})

router.route('/:talk_id/')
// get the talk with that id 
.get(function(req, res) {
        Talk.findById(req.params.talk_id, function(err, talk) {
            if (err)
                res.send(err);
			else
				res.json(talk);
        });
    })
// update the talk with this id 
.put(function(req, res) {
		 console.log("update Talk:");
		 console.log(req.body);
        // use our Talk model to find the talk we want
        Talk.findById(req.params.talk_id, function(err, talk) {

            if (err)
                res.send(err);
				else if(talk){
				//optimistic locking
				if(talk.__v === req.body.__v)
				{
				talk.title = req.body.title;  // update the talk info
				talk.event = req.body.event;  
				talk.description = req.body.description;  
				talk.startTime = req.body.startTime;  
				talk.endTime = req.body.endTime; 
				talk.speakers = req.body.speakers;  
				   // save the talk
            talk.save(function(err) {
                if (err)
                    res.send(err);
else
                res.json(talk);
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
// delete the Talk with this id
.delete(function(req, res) {
	Talk.remove({
		_id: req.params.talk_id
	}, function(err, speaker) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

router.route('/:talk_id/speakers')
//get all speakers of a certain talk
.get(function(req,res){
 Talk.findById(req.params.talk_id, function(err, talk) {
				if (err){
                res.send(err);
				}else if(talk ){
					res.json(talk.speakers);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
 });
})
//add a new speaker to a talk
.post(function(req,res){
					
			 Talk.findById(req.params.talk_id, function(err, talk) {
			
            if (err)
                res.send(err);
				else if(talk){
				
				
					
						if(talk.speakers.indexOf(req.body.speakers._id) === -1){
							talk.speakers.push(req.body.speakers._id);
							talk.save(function(err) {
								if (err)
								res.send(err);
								else
								res.json(talk);
							});
						}
						else
						{
						res.json(talk);
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

router.route('/:talk_id/speakers/:speakers_id')
//get the speakers id
.get(function(req,res){
		Talk.findById(req.params.talk_id, function(err, talk) {
				if (err){
                res.send(err);
				}else if(talk && talk.speakers && talk.speakers.indexOf(req.params.speakers_id) > 0){
					res.json(talk.speakers[talk.speakers.indexOf(req.params.speakers_id)]);
				}else{
					res.writeHead(404, {
						'Content-Type': 'text/plain'
					});
					res.end('Not found');
				}
});
})
//update speakers id in speakers list
.put(function(req,res){
		Talk.findById(req.params.talk_id, function(err, talk) {
			if (err)
                res.send(err);
			else if(talk){
					var index = talk.speakers.indexOf(req.params.speakers_id);
					if(index > 0)
					{
						talk.speakers[index]=req.body.speakers._id;
						talk.save(function(err) {
						if (err)
							res.send(err);
						else
							res.json(talk);
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
		});
		})
//delete speakers from speakers list
.delete(function(req,res){
			console.log(req.body);
			 Talk.findById(req.params.talk_id, function(err, talk) {
			
            if (err)
                res.send(err);
				else if(talk ){
					
					//if he is in speakers
					var index = talk.speakers.indexOf(req.params.speakers_id);
					if(index > -1)
					{
						//if there is someone waiting to join add him to speakerss
						if(talk.wartelist && talk.wartelist.length > 0){
							talk.speakers[index] = talk.wartelist[0];
							talk.wartelist.splice( 0, 1 );
						}else //just remove from speakerss
						{
							talk.speakers.splice( index, 1 );
						}
						
						 talk.save(function(err) {
							if (err)
								res.send(err);
							else
								res.json(talk);
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
