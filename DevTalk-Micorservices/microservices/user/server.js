var express = require("express");
var app = express();
var cors = require("cors"); // Cross-Origin Resource Sharing (CORS) ist ein Mechanismus, der Webbrowsern oder auch anderen Webclients Cross-Origin-Requests ermöglicht.[1] Zugriffe dieser Art sind normalerweise durch die Same-Origin-Policy (SOP) untersagt. CORS ist ein Kompromiss zugunsten größerer Flexibilität im Internet unter Berücksichtigung möglichst hoher Sicherheitsmaßnahmen.
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:21337/userService');

app.use(cors());
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
            role: "user"
        });
        saveUser(user);

        var admin = new User({
            name: "admin",
            email: "admin@admin.de",
            password: "admin",
            role: "admin"
        });
        saveUser(admin);
    }
});


app.get("/", function (req, res) {
    User.find(function (err, events) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(events);
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

app.listen(9123);

console.log("User Service started on localhost:9123");