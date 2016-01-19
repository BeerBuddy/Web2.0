'use strict';

// Declare app level module which depends on views, and components
angular.module('DevTalk', [
    'ngRoute',
    'DevTalk.common',
    'DevTalk.version',
    'DevTalk.talkDetails',
    'DevTalk.allTalks',
    'DevTalk.profile',
    'DevTalk.login',
    'DevTalk.impressum',
    'DevTalk.agb',
    'DevTalk.statistic',
    'DevTalk.newTalk',
    'DevTalk.editTalk',
<<<<<<< HEAD
    'DevTalk.common',
    'DevTalk.admin',
=======
>>>>>>> 7d472f9edaa8e534f843c0d97be6bc9baed58804
    'DevTalk.recommendation',
    'eventTableComponent',
    'profilComponent'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
