(function () {

    'use strict';

 var app = angular.module('DevTalk.kategorien', ['ngResource']);

app.factory('KategorieService', ['$resource',function ($resource) {
   
  return $resource('/api/eventService/kategorien/:id',{id:'@id'},{
			/* 
			update an existing Kategorie expect 
			{
				'id' : ObjectId //the id of the Kategorie
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