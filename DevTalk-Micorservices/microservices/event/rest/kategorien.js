var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Kategorie = require('../model/kategorie');
var roles = require('../../roles');


//Initial save Kategorien
Kategorie.find(function (err, kategorie) {
    if (kategorie.length === 0) {   
		var kategorien = [new Kategorie({"name":"Java"}), new Kategorie({"name":"C"}), new Kategorie({"name":"C#"}), new Kategorie({"name":"Webtechnologien"})];
		kategorien.forEach(function(k)
		{
			k.save(function (err) {
				if (err) {
					console.log("failed to save kategorie: " + err);
				} else {
					console.log("saved kategorie");
				}
			});
		});
    }
});

router.route('/')

.get( function(req, res) {
		Kategorie.find(function(err, kategorie) {
            if (err)
                res.status(500).send(err);
			else
            res.json(kategorie);
        });
})
.post( function(req, res) {
	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
		var kategorie = new Kategorie();      // create a new instance of the kategorie model
        
		kategorie.name = req.body.name;  // set the kategorie name (comes from the request)
		
        // save the kategorie and check for errors
        kategorie.save(function(err) {
            if (err)
                res.status(500).send(err);
			else
            res.json(kategorie);
        });
	}else
	{
		 res.status(401).send("No Permission to insert Kategorie");
	}	
});

router.route('/:kategorie_id')
    // get the kategorie with that id 
    .get(function(req, res) {
        Kategorie.findById(req.params.kategorie_id, function(err, kategorie) {
				if (err)
                res.status(500).send(err);
				else
					if(kategorie)
					{
						  res.json(kategorie);
					}
					else
					{
						//Kategorie nicht gefunden
						res.status(404).send('Kategorie not found');
					}
          
        });
    })
	// update the kategorie with this id 
 .put(function(req, res) {
if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
        // use our Kategorie model to find the kategorie we want
        Kategorie.findById(req.params.kategorie_id, function(err, kategorie) {

            if (err)
                res.status(500).send(err);	
			else{
				if(kategorie)
				{
							//optimistic locking
						if(kategorie.__v === req.body.__v)
						{
						  kategorie.name = req.body.name;  // update the kategorie info
					
					// save the kategorie
					kategorie.save(function(err) {
						if (err)
							res.send(err);
						else
							res.json(kategorie);
					});
						}else
						{
							//Versionskonflikt
							 res.status(409).send('Could not update: Version mismatch.');

						}
				}else
				{
					//Kategorie nicht gefunden
				res.status(404).send('Kategorie not found');
				}
			
          
}
        });
		}else
	{
		 res.status(401).send("No Permission to update Kategorie");
	}	
    })
// delete the Kategorie with this id
.delete(function(req, res) {
	if(roles.isAdmin(JSON.parse(req.headers.user)))
	{
	Kategorie.remove({
		_id: req.params.kategorie_id
	}, function(err, speaker) {
		if (err)
			res.status(500).send(err);
		else
		res.json({ message: 'Successfully deleted' });
	});
	}else
	{
		 res.status(401).send("No Permission to update Kategorie");
	}	
});

module.exports = router;
