var mongoose = require("mongoose");

var Event = mongoose.model('Event', {
    name: String,
    ort: String,
    datum: Date,
    kategorie: String,
    event: String,
    teilnehmer: [],
	warteliste: [],
	kapazitaet: Number
});
module.exports = Event;