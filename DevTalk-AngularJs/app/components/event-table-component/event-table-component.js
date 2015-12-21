'use strict';
angular.module('eventTableComponent', [])
    .directive('eventTableComponent', function () {
        return {
            link: function (scope, element, attrs) {
                scope.icontype = attrs.icontype;
                   scope.clickable = (attrs.clickable === 'true');
            },
            templateUrl: 'components/event-table-component/event-table-component.html'
        };
    });