;(function() {


  'use strict';
  angular
    .module('HMZAdminApp')
    .factory('QueryService', [
      '$http', '$q', 'site.config', QueryService
    ]);



  //////////////// factory



  function QueryService($http, $q, SiteConfig) {


    var service = {
	  queryDashboardData : loadDashboardData,
	  querySystemData: loadSystemData,
	  queryOOSReport: OOSReport,
	  queryrebootMetrics: RebootTrend,
	  querynotransactionMetrics: NoTransactionMetrics,
	  atm360Metrics: ATM360Metrics,
	  queryExceptionsReport: QueryExceptionsReport,
	  queryRebootReasonsReport: QueryRebootReasonsReport
    };

    return service;


    //////////////// definition
    function OOSReport(params, data) {
        return query('GET', SiteConfig.OOS_API_URL, params, data);
    }

    function RebootTrend(params, data) {
        return query('GET', SiteConfig.REBOOT_METRICS_URL, params, data);
    }

    function NoTransactionMetrics(params, data) {
        return query('GET', SiteConfig.NOTX_METRICS_URL, params, data);
    }

    function ATM360Metrics(params, data) {
        return query('GET', SiteConfig.ATM360_URL, params, data);
    }

    function QueryExceptionsReport(params, data) {
        return query('GET', SiteConfig.ExceptionsURL, params, data);
    }
    function QueryRebootReasonsReport(params, data) {
        return query('GET', SiteConfig.RebootReasonsURL, params, data);
    }

	function loadDashboardData(params, data){
		return query('GET', SiteConfig.DASHBOARD_API_URL, params, data);
	}
	
	function loadSystemData(params, data){
		return query('GET', SiteConfig.SYSTEMHEALTH_API_URL, params, data);
	}
		
    function query(method, url, params, data) {

      var deferred = $q.defer();

      $http({
        method: method,
        url: url,
        params: params,
        data: data
      }).then(function(data) {
        if (!data.config) {
          console.log('Server error occured.');
        }
       // console.log(data);
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  }


})();
