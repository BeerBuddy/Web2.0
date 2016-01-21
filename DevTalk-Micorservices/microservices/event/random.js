/**
 * Created by David on 13.01.2016.
 */
module.exports = {
    getRandomEvent: function () {
        var location = getRandomFromArray(locations);
        var pre = getRandomFromArray(eventsprefixes);
        var date1 = getRandomDate(new Date());
        var date2 = getRandomDate(date1);
        var id = generateRandomId();
        var talks = getRandomTalks(pre, id);
        var event = {
            "id": id,
            "name": pre + " " + getRandomFromArray(eventpostfixs) + " " + location,
            "ort": location,
            "datumVon": date1,
			"datumBis": date2,
            "kategorie": pre,
            "teilnehmer": [getRandomFromArray(teilnehmerIds)]
        };
        return event;
    }
};
function getRandomDate(from, to) {
    //generates an random date in the given time
    if (!from) {
        from = new Date(1900, 0, 1).getTime();
    } else {
        from = from.getTime();
    }
    if (!to) {
        to = new Date(2100, 0, 1).getTime();
    } else {
        to = to.getTime();
    }
    return new Date(from + Math.random() * (to - from));
}

function getRandomFromArray(array) {
    //returns an random item from given array
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomId(array, prefix) {
    //generates Random id
    var id = Math.random().toString(36).substring(7);
    if (prefix) {
        id = prefix + "-" + id;
    }
    if(array)
    {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return generateRandomId(array, prefix);
            }
        }
    }
    return id;
}



//some event names
var eventsprefixes = ["Oracle", "Play", "Microsoft", "DEV", "Java", "Groovy & Grails", "c#", "Scala", "Web", "Cloud", "Microservice", "Spring", "Docker", "Liferay", "FirstSpirit"];
var eventpostfixs = ["eXchange", "UserGroup", "2016", "Days", "Congress", "Europe"];
//some location for events
var locations = ["London", "Berlin", "Dortmund", "Boston", "New York", "San Francsiko", "Bangkok", "Sydney"];
var teilnehmerIds = [1337, 2448];


