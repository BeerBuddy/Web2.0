export function getTestData() { 
	// $ babel ../../app/components/services/EventTestData.es6 --presets "es2015" -o ../../app/components/services/EventTestData.js
	var allEvents = [{
            'id': 'ev1',
            'name': 'Chef Conf Dortmund',
            'kategorie': 'Provisioning',
            'teilnehmer': [42, 1337, 2448]
        },
        {
            'id': 'ev2', 
            'name': 'Scala Best Practices',
            'kategorie': 'Java',
            'teilnehmer': []
        },
        {
            'id': 'ev3', 
            'name': 'WTF.JS',
            'kategorie': 'Web',
            'teilnehmer': [1337]
        },
        {
            'id': 'ev4', 
            'name': 'Internet Explorer Talk',
            'kategorie': 'Web',
            'teilnehmer': []
        },
        {
            'id': 'ev5', 
            'name': 'Master of Puppets',
            'kategorie': 'Provisioning',
            'teilnehmer': [42]
        }
    ];

    return allEvents;
}