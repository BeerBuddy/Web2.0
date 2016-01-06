'use strict';
angular.module('createTalkComponent', [])
    .directive('createTalkComponent', function () {
        return {
            restrict: 'E',
            controller: function ($scope) {
				//set options for categories
				$scope.prefixes = ["Oracle", "Play", "Microsoft", "DEV", "Java", "Groovy & Grails", "c#", "Scala", "Web", "Cloud", "Microservice", "Spring", "Docker", "Liferay", "FirstSpirit"];
				
				//handling submit (create OR edit)
				$scope.submit=function(talk){
					if($scope.edit){
						$scope.onEdit(talk);
						$scope.edit = "";
					}
					else{
						$scope.onCreate(talk);
					}
					$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
				};
				//delete existing Event
				$scope.decline = function (id) {
					$scope.onDecline(id);
					$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
					$scope.edit = "";
				};				
				//reset input fields
				$scope.cancel=function(){
					$scope.talk.id = $scope.talk.name = $scope.talk.location = $scope.talk.start = $scope.talk.end = $scope.talk.categorie = "";
					$scope.edit = "";
				};
				//show data on screen
				$scope.setToEdit=function(talk){
					$scope.talk = talk;
					$scope.edit="edit";
				};
            },
        };
    });