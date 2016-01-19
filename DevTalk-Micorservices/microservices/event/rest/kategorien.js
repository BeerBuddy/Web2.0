var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");


router.route('/')
.get( function(req, res) {
		Kategorie.find(function(err, kategorie) {
            if (err)
                res.send(err);
			else
            res.json(kategorie);
        });
})
.post( function(req, res) {
   var kategorie = new Kategorie();      // create a new instance of the kategorie model
        
		kategorie.name = req.body.name;  // set the kategorie name (comes from the request)
		
        // save the kategorie and check for errors
        kategorie.save(function(err) {
            if (err)
                res.send(err);
			else
            res.json(kategorie);
        });
})

router.route('/:kategorie_id')
    // get the kategorie with that id 
    .get(function(req, res) {
        Kategorie.findById(req.params.kategorie_id, function(err, kategorie) {
            if (err)
                res.send(err);
				else
            res.json(kategorie);
        });
    })
	// update the kategorie with this id 
 .put(function(req, res) {

        // use our Kategorie model to find the kategorie we want
        Kategorie.findById(req.params.kategorie_id, function(err, kategorie) {

            if (err)
                res.send(err);	
			else{
			
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
				 res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Could not update: Version mismatch.');

				}
          
}
        });
    })
// delete the Kategorie with this id
.delete(function(req, res) {
	Kategorie.remove({
		_id: req.params.kategorie_id
	}, function(err, speaker) {
		if (err)
			res.send(err);
		else
		res.json({ message: 'Successfully deleted' });
	});
});

module.exports = router;
