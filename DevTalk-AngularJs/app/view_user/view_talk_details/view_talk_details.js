'use strict';

angular.module('DevTalk.talkDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/talkDetails', {
    templateUrl: 'view_user/view_talk_details/view_talk_details.html',
    controller: 'TalkDetailsCtrl'
  });
}])

.controller('TalkDetailsCtrl', [function() {

}]);