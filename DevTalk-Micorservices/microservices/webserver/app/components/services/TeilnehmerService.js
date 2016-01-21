(function () {

    'use strict';

 var app = angular.module('DevTalk.common');

app.factory('TeilnehmerService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/events/:id/teilnehmer/:tid',{id: '@id',tid: '@tid'},{
		/*
			Get all Teilnehmer for a event
			{
				
					'id': ObjectId //the id of the event
				
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
				'tid' : ObjectId //the id of the user,
				'id': ObjectId //the id of the event
								
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
				'tid' : ObjectId //the id of the user,
				'id': ObjectId //the id of the event
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