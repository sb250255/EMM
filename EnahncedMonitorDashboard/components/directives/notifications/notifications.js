'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('HMZAdminApp')
	.directive('notifications',function(){
		return {
		    templateUrl: 'components/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


