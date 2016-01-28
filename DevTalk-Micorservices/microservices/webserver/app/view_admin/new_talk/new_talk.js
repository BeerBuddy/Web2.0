'use strict';

angular.module('DevTalk.newTalk', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/newTalk', {
    templateUrl: 'view_admin/new_talk/new_talk.html',
    controller: 'NewTalkCtrl'
  });
}])

.controller('NewTalkCtrl', ['$scope', '$location','$filter', 'EventService','KategorieService', function ($scope, $location,$filter, EventService,KategorieService) {

//----- Part for setting Data for and handling Actions from Event-Table-Component ------
		//get random Events
		function fillTable(){
			$scope.data = EventService.query(function(data)
		{
			data.forEach(function(event){
				if(event.datumVon)
				{
					var von = $filter('date')( event.datumVon , "dd.MM.yyyy");
					event.datum = von + (event.datumBis ? '-'+ $filter('date')(event.datumBis , "dd.MM.yyyy") : '');
				}
				if(event.kategorie)
				event.kategorie = event.kategorie.name;
				
			});
			
		});
		}
		fillTable();
		
		$scope.prefixes = KategorieService.query();
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
			$scope.anEvent = EventService.get({'id':e._id}, function(data){
			data.datumVon = new Date(data.datumVon);
			if(data.datumBis)
			data.datumBis = new Date(data.datumBis);
			});
			$scope.setToEdit($scope.anEvent);
        };
			
//----- Part for handling Actions from Create-Talk-Component ------
		//create new Event
		$scope.onCreate = function (talk) {
			console.log(talk.kategorie);
			
			console.log(talk);
			var event = new EventService(talk);
			event.$save(function(){
				fillTable();
			});
			
			
        }
		//edit existing Event
		$scope.onEdit = function (talk) {
			console.log(talk.kategorie);
			
			talk.id = talk._id;
			console.log(talk);
			var event = new EventService(talk);
			event.$update(function(){
				fillTable();
			});
			
        }
		//deleting existing Event
		$scope.onDecline = function (id) {
			EventService.delete({'id':$scope.anEvent._id},function(){
				fillTable();
			});
			
        }
        }]);