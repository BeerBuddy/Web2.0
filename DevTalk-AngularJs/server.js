var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/login', function(req, res) {
  console.log(exportProperties(req));
  res.redirect("/app/#/profile");
});

app.post('/register', function(req, res) {
  console.log(exportProperties(req));
  res.redirect("/app/#/profile");
});

app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/');
});

function exportProperties(req){
  var message = "You shall not pass! But anyway you send: ";
  for(var propt in req.body){
    message += propt + ': ' + req.body[propt] + " ";
  }

  return message;
}