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
		$scope.data = EventService.query(function(data)
		{
			data.forEach(function(event){
				if(event.datumVon)
				{
					 var von = $filter('date')(date[ event.datumVon , "dd.MM.yyyy HH:mm"]);
					event.datum = von + (event.datumBis ? '-'+ $filter('date')(date[ event.datumBis , "dd.MM.yyyy HH:mm"]) : '');
				}
				
			});
			
		});
		$scope.kategorien = KategorieService.query();
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
			//set the selected talk
			$scope.anEvent = EventService.get({'id':e._id});
			$scope.setToEdit($scope.anEvent);
        };
			
//----- Part for handling Actions from Create-Talk-Component ------
		//create new Event
		$scope.onCreate = function (talk) {
		
			EventService.save($scope.anEvent);
        }
		//edit existing Event
		$scope.onEdit = function (talk) {
			$scope.anEvent.id = $scope.anEvent._id;
			EventService.update($scope.anEvent);
        }
		//deleting existing Event
		$scope.onDecline = function (id) {
			EventService.delete({'id':$scope.anEvent._id});
        }
        }]);