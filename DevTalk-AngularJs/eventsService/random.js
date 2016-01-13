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
            "datum": padDate(date1.getDate()) + "." + padDate(date1.getMonth() + 1) + "." + date1.getFullYear() + " - " + padDate(date2.getDate()) + "." + padDate(date2.getMonth() + 1) + "." + date2.getFullYear(),
            "kategorie": pre,
            "talks": talks,
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
function getRandomTalks(prefix, eventid) {
    //generates random talks for an event
    var name = ["Removing the Boilerplate", "on Rails", "Best Practice", "Performance", "the awaking", "gets better", "in Action", "revival"]
    var talks = [];
    for (var i = 0; i < (Math.random() * 20) + 1; i++) {
        var id = generateRandomId(talks, eventid);
        var title = prefix + getRandomFromArray(name);
        var speakers = getRandomSpeaker(id);
        var talk = {
            "id": id,
            "title": title,
            "description": title + " (1) Sixteen-year-old Emme Belrose has it all: four best friends, her own horse, a hidden teepee hangou",
            "time": "1" + i + ":00 - 1" + (i + 1) + ":00",
            "speakers": speakers

        };
        talks.push(talk);
    }
    return talks;
}
function getRandomSpeaker(talkid) {
    //generates a random speaker
    var name = ["John", "Mike", "Nick", "David", "Felix", "Aria", "Sansa", "Marco", "Jill", "Anna", "Lisa", "Sandra"];
    var lastname = ["Müller", "Meier", "Stark", "Bäcker", "Bauer", "Spinn", "Cruz"];

    var speakers = [];
    for (var i = 0; i < (Math.random() * 3) + 1; i++) {
        var speaker = {
            "id": generateRandomId(speakers, talkid),
            "name": getRandomFromArray(name) + " " + getRandomFromArray(lastname)
        }
        speakers.push(speaker);
    }
    return speakers;
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

function padDate(input) {
    //padding input if lower 10
    //used for converting date to dd.mm.yyyy
    return (input < 10) ? '0' + input : input;
}

//some event names
var eventsprefixes = ["Oracle", "Play", "Microsoft", "DEV", "Java", "Groovy & Grails", "c#", "Scala", "Web", "Cloud", "Microservice", "Spring", "Docker", "Liferay", "FirstSpirit"];
var eventpostfixs = ["eXchange", "UserGroup", "2016", "Days", "Congress", "Europe"];
//some location for events
var locations = ["London", "Berlin", "Dortmund", "Boston", "New York", "San Francsiko", "Bangkok", "Sydney"];
var teilnehmerIds = [1337, 2448];


