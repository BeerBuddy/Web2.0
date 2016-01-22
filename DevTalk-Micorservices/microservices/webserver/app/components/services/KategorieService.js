(function () {

    'use strict';

 var app = angular.module('DevTalk.kategorien', ['ngResource']);

app.factory('KategorieService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/kategorien/:_id',{_id:'@_id'},{
			/* 
			update an existing Kategorie expect 
			{
				'_id' : ObjectId //the id of the Kategorie
				... All other Kategorie attributes
			}
			*/
			update: {
					method: 'PUT' , 
					isArray: false,
					headers : {
						'Content-Type' : 'application/json'
					}
			}
        });
			
}
]);
})();