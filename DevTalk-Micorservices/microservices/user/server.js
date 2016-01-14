var express = require("express");
var app = express();
var cors = require("cors"); // Cross-Origin Resource Sharing (CORS) ist ein Mechanismus, der Webbrowsern oder auch anderen Webclients Cross-Origin-Requests ermöglicht.[1] Zugriffe dieser Art sind normalerweise durch die Same-Origin-Policy (SOP) untersagt. CORS ist ein Kompromiss zugunsten größerer Flexibilität im Internet unter Berücksichtigung möglichst hoher Sicherheitsmaßnahmen.
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:21337/userService');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Kategorie = mongoose.model('Kategorie', {
    id: String,
    name: String
});

var Event = mongoose.model('Event', {
    id: String,
    name: String,
    ort: String,
    datum: String,
    kategorie: String,
    talks: [],
    teilnehmer: []
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


app.get("/", function (req, res) {
    Event.find(function (err, events) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(events);
        }
    });
});

app.listen(9000);