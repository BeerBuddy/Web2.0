﻿'use strict';

angular.module('DevTalk.talkDetails', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/talkDetails/:eventid', {
            templateUrl: 'view_user/view_talk_details/view_talk_details.html',
            controller: 'TalkDetailsCtrl'
        });
    }])

    .controller('TalkDetailsCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'EventService','TeilnehmerService', function ($scope, $routeParams, $location, UserService, EventService,TeilnehmerService) {
    
	$scope.getEvent = function ()
	{
		 $scope.event = EventService.get({'id':$routeParams.eventid}, function(event){
			if(event.teilnehmer){
				$scope.hasApplyed = event.teilnehmer.indexOf(UserService.getCurrentUser()._id) > -1; 
			} 
			if(!$scope.hasApplyed && event.warteliste){
				$scope.hasApplyed = event.warteliste.indexOf(UserService.getCurrentUser()._id) > -1; 
				
				if($scope.hasApplyed)
					$scope.showOnWarteliste = true;
			}
			
		});
	}
	$scope.showOnWarteliste = false;
	//get the event
	 $scope.getEvent();
       
    $scope.apply = function() {
			 TeilnehmerService.join({'id': $scope.event._id, 'teilnehmer':UserService.getCurrentUser()._id}, function(){
				var name = $scope.event.name;
				$scope.getEvent();
				alert('Erfolgreich für das Event ' + name + " angemeldet!");
				//$location.path('/allTalks');
			}, function(err){
				$scope.getEvent();
				alert("Ein Fehler ist aufgetreten :"+err);
			});
        }

	$scope.unsubscribe = function() {
		 TeilnehmerService.decline({'id': $scope.event._id, 'tid':UserService.getCurrentUser()._id}, function(){
			var name = $scope.event.name;
			$scope.getEvent();			
			alert('Erfolgreich vom Event ' + name + " abgemeldet!");
			//$location.path('/allTalks');
		}, function(err){
			$scope.getEvent();
			alert("Ein Fehler ist aufgetreten :"+err);
		});
	}
	
    }]);