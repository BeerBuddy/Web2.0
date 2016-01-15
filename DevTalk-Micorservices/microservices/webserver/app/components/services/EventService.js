(function () {

    'use strict';

    var app = angular.module('DevTalk.common', ['ngResource']);

app.factory('EventService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/events/:path:_id:path2',{},{
			/*
			Recvies Event by Event._id expect 
			{
				'_id' : ObjectId //the id of the event
			}
			*/
			getById: {
					method: 'GET' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			Recvies all Events
			*/
			getAll: {
					method: 'GET' , 
					isArray: true,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			Insert a new Event
			*/
			insert: {
					method: 'POST' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			update an existing event expect 
			{
				'_id' : ObjectId //the id of the event
				... All other Event attributes
			}
			*/
			update: {
					method: 'PUT' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			delete an existing event expect 
			{
				'_id' : ObjectId //the id of the event
			}
			*/
			delete: {
					method: 'DELETE' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/* 
			FIXME geht nicht
			Returns all Events a user has joined
			{
				'_id' : ObjectId //the id of the User
			}
			*/
			getEventsByUserId:{
					method: 'GET' , 
					isArray: true,
					params: {
						'teilnehmer' : '@_id'
					},
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			FIXME geht nicht wahrscheinlich auch nicht
			Join event expects following json:
			{
				'event': {
					'_id': ObjectId //the id of the event
				},
				'teilnehmer': {
					'_id' : ObjectId //the id of the user
				}
			}
			*/
			joinEvent:{
					method: 'PUT' , 
					isArray: false,
					params: {
						'_id' : '@event._id',
						'path2' : '/join'
					},
					headers : {
						'Content-Type' : 'application/json'
					}
			},
			/*
			FIXME geht nicht wahrscheinlich auch nicht
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
			declineEvent:{
					method: 'PUT' , 
					isArray: false,
					params: {
						'_id' : '@event._id',
						'path2' : '/decline'
					},
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}
]);
})();