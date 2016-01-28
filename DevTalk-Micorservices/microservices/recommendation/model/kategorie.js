var mongoose = require("mongoose");

var Kategorie = mongoose.model('Kategorie', {
     name: String
});

module.exports = Kategorie;