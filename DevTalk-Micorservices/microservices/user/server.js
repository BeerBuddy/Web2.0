var express = require("express");
var app = express();
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var settings = require("../settings.json");
var cert = fs.readFileSync('../server.cer');  // get private key
var jwt = require('jsonwebtoken');
var roles = require('../roles');
var request = require('request');

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
    email: req.body.email
  }, function(err, user) {
    if (err)  res.status(500).send(err);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
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

app.post('/register', function(req, res) {
  // look for an existring user
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err)  res.status(500).send(err);
    if (user) {
      // we found a user so we have to exit
        res.status(400).json({ success: false, message: 'Bad Request. A user with this email is already registered!' });
    } else {
        // we have no user so we can register this one
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: roles.user
        });
        saveUser(user);
		var callback;
		//Versenden einer Registrierungs-Mail via Email-Service
		request.post({url:settings.emailService.rest.protocol + '://' + settings.emailService.rest.ip + ':' + settings.emailService.rest.port + '/email' , form: {mail:user.email, name:user.name, type:'REGISTER'}},callback);		
        res.status(200).send(user);
      }
    })
});

app.post('/update', function(req, res) {
  // find the user
  User.findOne({
    _id: req.body._id
  }, function(err, user) {
    if (err)  res.status(500).send(err);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
    } else if (user) {
        // update the user
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        saveUser(user);
		//Versenden einer Update-Mail via Email-Service
		var callback;
		request.post({url:settings.emailService.rest.protocol + '://' + settings.emailService.rest.ip + ':' + settings.emailService.rest.port + '/email' , form: {mail:user.email, name:user.name, type:'PROFILE'}},callback);
        res.status(200).json({
          success: true,
          message: 'Update successful!',
          user: user
        });
    }

  });
});

app.get("/:id/", function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(user);
        }
    })
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
            console.log("saved user" + user.name + " " + user.email);
        }
    });
}

app.listen(settings.userService.rest.port);

console.log("User Service started on localhost:"+settings.userService.rest.port);