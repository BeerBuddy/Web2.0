'use strict';
var app = angular.module('DevTalk.common1', []);

app.factory('EventService', [function () {
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
                "description": title + " (1) Sixteen-year-old Emme Belrose has it all: four best friends, her own horse, a hidden teepee hangout, and a blossoming romance with tall and handsome Charlie. These friends also have a secret. They can move their spirits into animal bodies: an Osprey, a Mustang, a Grizzly, a Mountain Lion and a Coyote. (2) But when Charlie, who has a gift for seeing the future, has a vision of Emme drowning in the icy Yellostone River, (3) the Spirit Warriors must train their animal bodies to kill an enemy they know is coming� but know nothing about. (4) Suspenseful, romantic and awash in Native American magic, Spirit Warriors captures the enchantment of the American West and the power of friendship.",
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
        var lastname = ["M�ller", "Meier", "Stark", "B�cker", "Bauer", "Spinn", "Cruz"];

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
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return generateRandomId(array, prefix);
            }
        }
        return id;
    }
	
	function padDate(input){
		//padding input if lower 10
		//used for converting date to dd.mm.yyyy
		return (input < 10) ? '0' + input : input;
	}

	//some event names
    var eventsprefixes = ["Oracle", "Play", "Microsoft", "DEV", "Java", "Groovy & Grails", "c#", "Scala", "Web", "Cloud", "Microservice", "Spring", "Docker", "Liferay", "FirstSpirit"];
    var eventpostfixs = ["eXchange", "UserGroup", "2016", "Days", "Congress", "Europe"];
	//some location for events
	var locations = ["London", "Berlin", "Dortmund", "Boston", "New York", "San Francsiko", "Bangkok", "Sydney"];
   
	//the list of all events
   var events = [];

	//Initial generate random events
    for (var i = 0; i < (Math.random() * 20) + 1; i++) {
        var location = getRandomFromArray(locations);
        var pre = getRandomFromArray(eventsprefixes);
        var date1 = getRandomDate(new Date());
        var date2 = getRandomDate(date1);
        var id = generateRandomId(events);
        var talks = getRandomTalks(pre, id);
        var event = {
            "id": id,
            "name": pre + " " + getRandomFromArray(eventpostfixs) + " " + location,
            "ort": location,
            "datum": padDate(date1.getDate()) + "." + padDate(date1.getMonth() + 1) + "." + date1.getFullYear() + " - " + padDate(date2.getDate()) + "." + padDate(date2.getMonth() + 1) + "." + date2.getFullYear(),
            "kategorie": pre,
            "talks": talks,
            "teilnehmer": []
        }
        events.push(event);
    }

    return {
        getById: function (id) {
			//search the list of events for given id and return
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === id) {
                    return events[i];
                }
            }
			//throw Error if id could not be found
            throw new Error("Could not find event " + id + ". Already inserted?");
        },
        getAll: function () {
			//return the list of all events
            return events;
        },
		//FIXME Eigentlich ist das so nicht gedacht. Das ist nur zur Generierung der Events und ist kein Teil der Schnittstelle.
		getPrefixes: function(){
			return eventsprefixes;
		},
        insert: function (event) {
			//add an event to the list
            events.push(event);
            return;
        },
        update: function (event) {
			//update an existing event
			//therefore find the event 
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === event.id) {
					//replce it
                    events[i] = event;
                    return;
                }
            }
			//throw an Error if the Event could not be found
            throw new Error("Event could not be updated. Already inserted?");
        },
		decline: function (id) {
			//delete an existing event
			//therefore find the event 
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === id) {
					//delete it
                    events.splice(i,1);
                    return;
                }
            }
			//throw an Error if the Event could not be found
            throw new Error("Event could not be updated. Already inserted?");
        },
        getEventsByUserId: function (userid) {
			//find all events where the given userid has taken part
            var eventList = [];
            for (var i = 0; i < events.length; i++) {
                for (var j = 0; j < events[i].teilnehmer.length; j++) {
                    if (events[i].teilnehmer[j] === userid) {
                        eventList.push(events[i]);
                    }
                }
            }
            return eventList;
        },
        joinEvent: function (userid, eventid) {
			//add a userid to the members of an event
			//therefore find the event
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === eventid) {
					//check if there is a members attribute
                    if(!events[i].teilnehmer)
                    {
						//add the members attribute
                        events[i].teilnehmer = [];
                    }
					//and add the userid to the members
                    events[i].teilnehmer.push(userid);
                    return;
                }
            }
			//throw an Error if the event couldnt be found
            throw new Error("Could not find event " + eventid + ". Already inserted?");
        },
		createEvent: function (id, name, location, date1, date2, pre){
			//create a new event
			//id, name, location, time and categorie are delivered by calling function
			//random talks are generated
			var newid = id;
			if(newid === ""){
				newid = generateRandomId(events);
			}
			var talks = getRandomTalks(pre, id);
			var newEvent = {
            "id": newid,
            "name": name,
            "ort": location,
            "datum": padDate(date1.getDate()) + "." + padDate(date1.getMonth() + 1) + "." + date1.getFullYear() + " - " + padDate(date2.getDate()) + "." + padDate(date2.getMonth() + 1) + "." + date2.getFullYear(),
            "kategorie": pre,
            "talks": talks,
            "teilnehmer": []
			}
			return newEvent;
		}
    };
}
]);
