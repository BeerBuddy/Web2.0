'use strict';
angular.module('eventTableComponent', [])
    .directive('eventTableComponent', function () {
        return {
            link: function (scope, element, attrs) {
                if (attrs.data)
                    scope.data = JSON.parse(attrs.data);
                if (attrs.highlighted)
                    scope.highlited = JSON.parse(attrs.highlighted);
                scope.icontype = attrs.icontype;
                scope.columns = JSON.parse(attrs.columns);
                if(attrs.clickable)
                {
                   scope.clickable = true;
                }
            },
            templateUrl: 'components/event-table-component/event-table-component.html'
        };
    });