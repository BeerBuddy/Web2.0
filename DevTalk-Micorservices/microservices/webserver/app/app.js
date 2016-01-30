'use strict';

// Declare app level module which depends on views, and components
angular.module('DevTalk', [
	"datetime",
    'ngRoute',
	'DevTalk.mail',
	'DevTalk.user',
	'DevTalk.kategorien',
	'DevTalk.teilnehmer',
	'DevTalk.events',
    'DevTalk.version',
    'DevTalk.talkDetails',
    'DevTalk.allTalks',
    'DevTalk.profile',
    'DevTalk.login',
    'DevTalk.impressum',
    'DevTalk.agb',
    'DevTalk.statistic',
    'DevTalk.newTalk',
    'DevTalk.recommendation',
    'eventTableComponent',
    'profilComponent',
	'DevTalk.auth'
]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/login'});
}]);
