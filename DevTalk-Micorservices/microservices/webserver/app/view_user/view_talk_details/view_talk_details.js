'use strict';

angular.module('DevTalk.talkDetails', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/talkDetails/:eventid', {
            templateUrl: 'view_user/view_talk_details/view_talk_details.html',
            controller: 'TalkDetailsCtrl'
        });
    }])

    .controller('TalkDetailsCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'EventService', function ($scope, $routeParams, $location, UserService, EventService) {
        $scope.data = EventService.getById({'_id':$routeParams.eventid}, function(data){
		if(data.teilnehmer)
    $scope.hasApplyed = data.teilnehmer.indexOf(UserService.getCurrentUser().id) > -1; 
		});
        $scope.columns = [
            {"name":"title", "title":"Title"},
            {"name":"description", "title":"Description"},
            {"name":"Time", "title":"Time"},
            {"name":"Speakers", "title":"Speakers"}
        ];

       

        $scope.apply = function() {
            try {
                if(UserService.getCurrentUser().id) {
                    EventService.joinEvent(UserService.getCurrentUser()._id, $scope.data._id);
                    alert('Erfolgreich für das Event ' + $scope.data.name + " angemeldet!");
                    $location.path('#/allTalks');
                } else {
                    $location.path('#login');
                }
            } catch(err) {
                console.info(err);
                alert('Unerwarteter Fehler.');
            }
        }

        $scope.unsubscribe = function() {
            alert('Abmeldung nur per Mail an foo@bar.com möglich!');
        }
    }]);