var app = angular.module('DevTalk.recommendation', []);

app.factory('RecommendationService', function () {
    var srv = {};

    srv._recommendedTalks = [
        {"name" : "EclipseCon Europe", "ort":"Ludwigsburg", "datum": "03.11.2015  -  05.11.2015", "kategorie":"Java"},
        {"name" : "W-JAX", "ort":"München", "datum": "02.11.2015  -  06.11.2015", "kategorie":"Java"},
        {"name" : "WTF.JS", "ort":"Butzbach", "datum": "04.07.2016  -  06.07.2016", "kategorie":"Scala"}
    ];

    srv.getTalksForUser = function(userId) {
        if(!userId) 
            return;

        if(userId < 10) {
            return [this._recommendedTalks[0], this._recommendedTalks[2]];
        } else {
            return [this._recommendedTalks[1], this._recommendedTalks[2]];
        }
    };

    return srv;
})
;