'use strict';
angular.module('eventTableComponent', [])
    .directive('eventTableComponent', function ($compile) {
        return {
            restrict: 'E',
            terminal: true,
            scope: {
                icontype: '=',
                clickable: '=',
                data: '=',
                highlighted: '=',
                columns: '=',
                onSelect: '&'
            },
            link: function(scope, element, attrs) {
                $compile(element.contents())(scope.$new());
            },
            templateUrl: 'components/event-table-component/event-table-component.html'
        };
    });