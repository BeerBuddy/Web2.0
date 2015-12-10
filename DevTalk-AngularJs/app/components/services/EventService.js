var app = angular.module('DevTalk.common1', []);

app.factory('EventService', [function () {
    function getRandomDate(from, to) {
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
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomTalks(prefix, eventid) {
        var name = ["Removingf the Boilerplate", "on Rails", "Best Practice", "Performance", "the awaking", "gets better", "in Action", "revival"]
        var talks = [];
        for (var i = 0; i < (Math.random() * 20) + 1; i++) {
            var id = generateRandomId(talks, eventid);
            var title = prefix + getRandomFromArray(name);
            var speakers = getRandomSpeaker(id);
            var talk = {
                "id": id,
                "title": title,
                "description": title + " (1) Sixteen-year-old Emme Belrose has it all: four best friends, her own horse, a hidden teepee hangout, and a blossoming romance with tall and handsome Charlie. These friends also have a secret. They can move their spirits into animal bodies: an Osprey, a Mustang, a Grizzly, a Mountain Lion and a Coyote. (2) But when Charlie, who has a gift for seeing the future, has a vision of Emme drowning in the icy Yellostone River, (3) the Spirit Warriors must train their animal bodies to kill an enemy they know is coming… but know nothing about. (4) Suspenseful, romantic and awash in Native American magic, Spirit Warriors captures the enchantment of the American West and the power of friendship.",
                "time": "1" + i + ":00 - 1" + (i + 1) + ":00",
                "speakers":speakers

            };
            talks.push(talk);
        }
        return talks;
    }

    function getRandomSpeaker(talkid) {
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
        var id = Math.random().toString(36).substring(7);
        if (prefix) {
            id = prefix + "-" + id;
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return generateRandomId(array, prefix);
            }
        }
        return id;
    }

    var eventsprefixes = ["Oracle", "Play", "Microsoft", "DEV", "Java", "Groovy & Grails", "c#", "Scala", "Web", "Cloud", "Microservice", "Spring", "Docker", "Liferay", "FirstSpirit"];
    var eventpostfixs = ["eXchange", "UserGroup", "2016", "Days", "Congress", "Europe"];
    var locations = ["London", "Berlin", "Dortmund", "Boston", "New York", "San Francsiko", "Bankok", "Sydney"];
    var events = [];

    for (var i = 0; i < (Math.random() * 20) + 1; i++) {
        var location = getRandomFromArray(locations);
        var pre = getRandomFromArray(eventsprefixes);
        var date1 = getRandomDate(new Date());
        var date2 = getRandomDate(date1);
        var id = generateRandomId(events);
        var talks =getRandomTalks(pre, id);
        var event = {
            "id": id,
            "name": pre + " " + getRandomFromArray(eventpostfixs) + " " + location,
            "ort": location,
            "datum": date1.getDate() + "." + date1.getMonth() + "." + date1.getFullYear() + " - " + date2.getDate() + "." + date2.getMonth() + "." + date2.getFullYear(),
            "kategorie": pre,
            "talks": talks
        }
        events.push(event);
    }

    return {
        getById: function (id) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === id) {
                    return events[i];
                }
            }
            throw new Error("Could not find event " + id + ". Already inserted?");
        },
        getAll: function () {
            return events;
        },
        insert: function (event) {
            events.push(event);
            return;
        },
        update: function (event) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === event.id) {
                    events[i] = event;
                    return;
                }
            }
            throw new Error("Event could not be updated. Already inserted?");
        }
    }
}])
;