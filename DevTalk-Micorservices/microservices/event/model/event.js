var mongoose = require("mongoose");

var Event = mongoose.model('Event', {
    name: String,
    ort: String,
    datumVon: Date,
	datumBis: Date,
	kategorie: String,
    beschreibung: String,
    teilnehmer: [String],
	warteliste: [String],
	kapazitaet: Number
});
module.exports = Event;