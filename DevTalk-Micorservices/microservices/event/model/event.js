var mongoose = require("mongoose");

var Event = mongoose.model('Event', {
    name: String,
    ort: String,
    datumVon: Date,
	datumBis: Date,
	kategorie: String,
    event: String,
    teilnehmer: [String],
	warteliste: [String],
	kapazitaet: Number,
	beschreibung: String
});
module.exports = Event;