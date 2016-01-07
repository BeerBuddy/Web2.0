'use strict';
angular.module('eventTableComponent', [])
    .directive('eventTableComponent', function ($compile) {
        return {
            restrict: 'E',
            terminal: true,
			 controller: function ($scope) {
				
				 $scope.selected=function(){
					
				 };
            },
            scope: {
                user: '=',
                editable: '=',
                onSave: '&',
                icontype: '@',
                clickable: '=',
                data: '=',
                highlighted: '=',
                columns: '=',
                onSelect: '&'
            },
            templateUrl: 'components/event-table-component/event-table-component.html'
        };
    });