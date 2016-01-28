(function() {
  'use strict';

  var app = angular.module('DevTalk');
  app.directive('createTalkComponent', ['EventService', directive]);
  function directive() {
        return {
            restrict: 'E',
			templateUrl: 'components/create-talk-component/create-talk-component.html',
            controller: function ($scope) {
				
				//handling submit (create OR edit)
				$scope.submit=function(talk){
					if($scope.edit){
						//call by reference
						$scope.onEdit(talk);
						$scope.edit = "";
					}
					else{
						//call by reference
						$scope.onCreate(talk);
					}
					$scope.talk.id = $scope.talk.name = $scope.talk.ort = $scope.talk.datumVon = $scope.talk.datumBis = $scope.talk.kategorie = $scope.talk.kapazitaet = "";
				};
				//delete existing Event
				$scope.decline = function (id) {
					$scope.onDecline(id);
					$scope.talk.id = $scope.talk.name = $scope.talk.ort = $scope.talk.datumVon = $scope.talk.datumBis = $scope.talk.kategorie = $scope.talk.kapazitaet = "";
					$scope.edit = "";
				};				
				//reset input fields
				$scope.cancel=function(){
					$scope.talk.id = $scope.talk.name = $scope.talk.ort = $scope.talk.datumVon = $scope.talk.datumBis = $scope.talk.kategorie = $scope.talk.kapazitaet = "";
					$scope.edit = "";
				};
				//show data on screen
				$scope.setToEdit=function(talk){
					$scope.talk = talk;
					$scope.edit="edit";
				};
            }
        }
    }
})();