var express = require("express");
var app = express();
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var settings = require("../settings.json");
var cert = fs.readFileSync('../server.cer');  // get private key
var jwt = require('jsonwebtoken');
var roles = require('../roles');

/*
TODO authentication token
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

*/

mongoose.connect(settings.userService.db.protocol+'://'+settings.userService.db.ip+':'+settings.userService.db.port+'/'+settings.userService.db.schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    role: String
});

//Initial save same users
User.find(function (err, users) {
    if (users.length === 0) {
        var user = new User({
            name: "user",
            email: "user@user.de",
            password: "user",
            role: roles.user
        });
        saveUser(user);

        var admin = new User({
            name: "admin",
            email: "admin@admin.de",
            password: "admin",
            role: roles.admin
        });
        saveUser(admin);
    }
});

app.post('/login', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err)  res.status(500).send(err);

    if (!user) {
      res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
		  user.password = undefined;
        var token = jwt.sign({"user":user}, cert, {
          expiresIn: 30 *60 *60 // expires in 0.5 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
		  user: user
        });
      }   

    }

  });
});

app.get("/", function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(user);
        }
    });
});



function saveUser(user){
    user.save(function(err){
        if (err) {
            console.log("failed to save users: " + err);
        }
        else {
            console.log("saved users");
        }
    });
}

app.listen(settings.userService.rest.port);

console.log("User Service started on localhost:"+settings.userService.rest.port);
