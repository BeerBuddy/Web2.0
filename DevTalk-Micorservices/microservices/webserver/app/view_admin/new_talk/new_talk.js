'use strict';

angular.module('DevTalk.newTalk', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/newTalk', {
    templateUrl: 'view_admin/new_talk/new_talk.html',
    controller: 'NewTalkCtrl'
  });
}])

.controller('NewTalkCtrl', ['$scope', '$location', 'EventService','KategorieService', function ($scope, $location, EventService,KategorieService) {

//----- Part for setting Data for and handling Actions from Event-Table-Component ------
		//get random Events
		$scope.data = EventService.getAll(function(data)
		{
			data.forEach(function(event){
				if(event.datumVon)
				{
					 var von = $filter('date')(date[ event.datumVon , "dd.MM.yyyy HH:mm"]);
					event.datum = von + (event.datumBis ? '-'+ $filter('date')(date[ event.datumBis , "dd.MM.yyyy HH:mm"]) : '');
				}
				
			});
			
		});
		$scope.kategorien = KategorieService.getAll();
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
				"ort": $scope.anEvent.ort,
				"kategorie": $scope.anEvent.kategorie,
				"datumVon": new Date($scope.anEvent.datum.substring(3,6) + $scope.anEvent.datum.substring(0,3) + $scope.anEvent.datum.substring(6,10)),
				"datumBis": new Date($scope.anEvent.datum.substring(16,19) + $scope.anEvent.datum.substring(13,16) + $scope.anEvent.datum.substring(19,23)),
				"beschreibung": "Es muss noch eine Beschreibung in die new Event Komponente eingefügt werden !!!!!"
			}
			$scope.setToEdit(talk);
        };
			
//----- Part for handling Actions from Create-Talk-Component ------
		//create new Event
		$scope.onCreate = function (talk) {
			EventService.insert(talk);
        }
		//edit existing Event
		$scope.onEdit = function (talk) {
			talk.id = talk._id;
			EventService.update(talk);
        }
		//deleting existing Event
		$scope.onDecline = function (id) {
			EventService.delete({'id':id});
        }
        }]);