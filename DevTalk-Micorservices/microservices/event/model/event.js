var mongoose = require("mongoose");

var Event = mongoose.model('Event', {
    name: String,
    ort: String,
    datum: Date,
    event: String,
    teilnehmer: [String],
	warteliste: [String],
	kapazitaet: Number
});
module.exports = Event;