(function () {

    'use strict';

 var app = angular.module('DevTalk.common');

app.factory('TeilnehmerService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/events/:event._id/teilnehmer/:teilnehmer._id',{},{
		/*
			Get all Teilnehmer for a event
			{
				'event': {
					'_id': ObjectId //the id of the event
				}
			}
			*/
			getAll:{
					method: 'GET' , 
					isArray: true,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
		
			/*
			Join event expects following json:
			{
				'_id' : ObjectId //the id of the user,
				'event': {
					'_id': ObjectId //the id of the event
				}				
			}
			*/
			join:{
					method: 'POST' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			If someone has decided to not take part on the event declineEvent can be called to remove him from teilnehmers
			The function expects the following json:
			{
				'event': { 
					'_id': ObjectId //the id of the event
				},
				'teilnehmer': {
					'_id' : ObjectId //the id of the user
				}
			}
			*/
			decline:{
					method: 'DELETE' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}
]);
})();