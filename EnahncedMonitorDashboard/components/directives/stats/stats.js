'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('HMZAdminApp')
    .directive('stats',function() {
    	return {
    	templateUrl: 'components/directives/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@'
  		},
  		controller: function ($scope) {
  		    $scope.collapsed = false;
  		    $scope.onClick = function () {
  		        $scope.displayDetails = true;
  		    }
  		}
  		
  	}
  });
