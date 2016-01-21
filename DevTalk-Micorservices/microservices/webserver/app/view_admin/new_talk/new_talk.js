'use strict';

angular.module('DevTalk.newTalk', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/newTalk', {
    templateUrl: 'view_admin/new_talk/new_talk.html',
    controller: 'NewTalkCtrl'
  });
}])

.controller('NewTalkCtrl', ['$scope', '$location', 'EventService', function ($scope, $location, EventService) {

//----- Part for setting Data for and handling Actions from Event-Table-Component ------
		//get random Events
		$scope.data = EventService.getAll();
        //set them into table
		$scope.columns =
            [
                {"name": "name", "title": "Name"},
                {"name": "ort", "title": "Location"},
                {"name": "datum", "title": "Date"},
                {"name": "kategorie", "title": "Categorie"}
            ];
			
		//handling clicks on Buttons for editing Events
		$scope.onItemClick = function (e) {
            //$location.path('/talkDetails/' + e.id);
			$scope.anEvent = EventService.getById(e._id);
			var talk = {
				"id": $scope.anEvent._id,
				"name": $scope.anEvent.name,
				"location": $scope.anEvent.ort,
				"categorie": $scope.anEvent.kategorie,
				"start": new Date($scope.anEvent.datum.substring(3,6) + $scope.anEvent.datum.substring(0,3) + $scope.anEvent.datum.substring(6,10)),
				"end": new Date($scope.anEvent.datum.substring(16,19) + $scope.anEvent.datum.substring(13,16) + $scope.anEvent.datum.substring(19,23))
			}
			$scope.setToEdit(talk);
        };
			
//----- Part for handling Actions from Create-Talk-Component ------
		//create new Event
		$scope.onCreate = function (talk) {
			$scope.anEvent = EventService.createEvent(talk.id, talk.name, talk.location, talk.start, talk.end, talk.categorie);
			EventService.insert($scope.anEvent);
        }
		//edit existing Event
		$scope.onEdit = function (talk) {
			$scope.anEvent = EventService.createEvent(talk.id, talk.name, talk.location, talk.start, talk.end, talk.categorie);
			EventService.update($scope.anEvent);
        }
		//deleting existing Event
		$scope.onDecline = function (id) {
			EventService.decline(id);
        }
        }]);