'use strict';
var app = angular.module('DevTalk.common', ['ngResource']);
app.factory('EventService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/events/:id',{id:'@_id'},{
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
			Returns all Events a user has joined
			{
				'teilnehmer':{
				
				'_id' : ObjectId //the id of the User
				}
			}
			*/
			getEventsByUserId:{
					method: 'GET' , 
					isArray: true,
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}]);
