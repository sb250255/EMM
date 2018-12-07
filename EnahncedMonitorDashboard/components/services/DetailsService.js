; (function () {


    'use strict';
    angular
      .module('HMZAdminApp')
      .factory('DetailService', [
        '$http', '$q', 'site.config', DetailService
      ]);



    //////////////// factory



    function DetailService($http, $q, SiteConfig) {


        var service = {
            queryCEH: QueryExceptionsReport,
            queryHang: QueryHangReport,
            queryATM360: QueryATM360Report,
            queryRecovery: QueryRecoveryReboots,
            buildNotifications: BuildNotifications,
            getDetailsByID: GetDetailsByID
        };

        return service;


        //////////////// definition
        function QueryExceptionsReport(params, data) {
            return query('GET', SiteConfig.CEH_API_URL, params, data);
        }
        function QueryHangReport(params, data) {
            return query('GET', SiteConfig.HANG_API_URL, params, data);
        }
        function QueryATM360Report(params, data) {
            return query('GET', SiteConfig.ATM360_API_URL, params, data);
        }
        function QueryRecoveryReboots(params, data) {
            return query('GET', SiteConfig.RecoveryDetails_API_URL, params, data);
        }
        function BuildNotifications(params, data) {
            return query('GET', SiteConfig.BuildNotifications_API_URL, params, data);
        }

        function GetDetailsByID(params, data) {
            return query('GET', SiteConfig.GetDetailsByID_API_URL, params, data);
        }

        function query(method, url, params, data) {
           // console.log("Params :" + params.ATMID);
            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
                params: params,
                data: data
            }).then(function (data) {
                if (!data.config) {
                    console.log('Server error occured.');
                }
                console.log(data);
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

    }


})();