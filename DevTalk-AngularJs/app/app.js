'use strict';

// Declare app level module which depends on views, and components
angular.module('DevTalk', [
  'ngRoute',
  'DevTalk.version',
  'DevTalk.talkDetails',
  'DevTalk.allTalks',
  'DevTalk.profile',
  'DevTalk.login',
  'DevTalk.impressum',
  'DevTalk.agb',
  'DevTalk.statistic',
  'DevTalk.newTalk',
  'DevTalk.editTalk'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
