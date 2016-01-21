var mongoose = require("mongoose");

var Talk = mongoose.model('Talk', {
	title: String,
	event: String,
    description: String,
    startTime: Date,
    endTime: Date,
	speakers: []
});
module.exports = Talk;