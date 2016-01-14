'use strict';

angular.module('DevTalk.editTalk', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/editTalk', {
    templateUrl: 'view_admin/edit_talk/edit_talk.html',
    controller: 'EditTalkCtrl'
  });
}])

.controller('EditTalkCtrl', [function() {

}]);