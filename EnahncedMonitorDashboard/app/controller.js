/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('HMZAdminApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','site.config','QueryService','$rootScope','$timeout','$location','moment'];


  function MainController($scope, SiteConfig, QueryService, $rootScope, $timeout, $location, moment) {
      $(".main-wrapper .pushable").addClass("loading");
    // 'controller as' syntax
    var self = this;
    self.DefectsStats = [];
    self.bgcolor = ["#FF6384", "#36A2EB", "#FFCE56","#21ba45","#a333c8"];
    $scope.bgcolor1 = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
	self.server = SiteConfig.SERVER;
	self.today = new Date();
	self.severityList = SiteConfig.SEVERITYLIST;
	$scope.getOOSData = function () {
	    console.log("Console log hit");
	};

	//$scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Operational', 'a', 'b', 'c'];
	//$scope.data = [300, 500, 100, 200, 200, 300, 100];
	$scope.options = { legend: { display: false } };
	$scope.rebootchartcolors = [
                  { // grey
                      backgroundColor: 'rgba(148,159,177,0.2)',
                      pointBackgroundColor: 'rgba(148,159,177,1)',
                      pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                      borderColor: 'rgba(148,159,177,1)',
                      pointBorderColor: '#fff',
                      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                  },
                  { // dark grey
                      backgroundColor: 'rgba(77,83,96,0.2)',
                      pointBackgroundColor: 'rgba(77,83,96,1)',
                      pointHoverBackgroundColor: 'rgba(77,83,96,1)',
                      borderColor: 'rgba(77,83,96,1)',
                      pointBorderColor: '#fff',
                      pointHoverBorderColor: 'rgba(77,83,96,0.8)'
                  }
	];
	
	$scope.TransactionTrendcolors = ['#45b7cd', '#ff6384', '#ff8e72'];
    $scope.TransactiondatasetOverride = [
                  {
                      label: 'Total Withdrawals',
                      borderWidth: 1,
                      type: 'bar'
                  },
                  {
                      label: 'Total Deposits',
                      borderWidth: 3,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      type: 'line'
                  }
    ];

    $scope.RebootTrendDataSetOverride = [

         {
             label: 'Total Reboots',
             borderWidth: 1,
             type: 'line'
         },
         {
             label: 'Recovery Reboots',
             borderWidth: 1,
             type: 'line'
         }
    ];
    //$scope.ExceptiondatasetOverride = [
    //           {
    //               label: 'CEH',
    //               borderWidth: 1,
    //               type: 'radar'
    //           },
    //           {
    //               label: 'BlackScreen',
    //               borderWidth: 3,
    //               hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //               hoverBorderColor: 'rgba(255,99,132,1)',
    //               type: 'radar'
    //           }
    //];
	$scope.OOSRefresh = function () {
	    QueryService.queryOOSReport().then(function (response) {
	        $scope.labels = response.data[0].labels;
	        $scope.data = response.data[0].data;
	        $scope.OOSData = {
	            labels: response.data[0].labels,
	            datasets: [
                    {
                        data: response.data[0].data,
                        backgroundColor: $scope.bgcolor1
                    }]
	        };
	    })
	}

	$scope.GetRebootMetrics = function () {
	    console.log("Get Reboot Metrics Hit");
	    QueryService.queryrebootMetrics().then(function (response) {
	        $scope.rebootlabels = response.data[0].labels;
	        $scope.rebootData = response.data[0].data;
	        //$scope.Rebootdata = response.data[0].data;
	        //$scope.RebootData = {
	        //    rebootlabels: response.data[0].labels,
            //    date : response.data[0].data
	        //    //datasets: [
            //    //    {
            //    //        data: response.data[0].data,
            //    //        backgroundColor: $scope.bgcolor1
            //    //    }]
	        //};
	        
	    })
	    console.log($scope.rebootlabels);
	    console.log($scope.rebootData);
	}

      GetRebootReport: QueryService.queryrebootMetrics().then(function (response) {
          $(".main-wrapper .pushable").removeClass("loading");
          console.log(response.data[0]);
          $scope.metricsLabels = response.data[0].DateLabelsArray;
          $scope.rebootmetricsData = [response.data[0].rebootmetrices, response.data[0].recoverymetrices];
          $scope.transactionmetrics = [response.data[0].WDLCount, response.data[0].DEPCount]
    })

      GetNoTxReport: QueryService.querynotransactionMetrics().then(function (response) {
          $scope.notransactionmetricsLabels = response.data[0].NoTXLabelsArray;
          $scope.notransactionmetricsData = [response.data[0].NoWDLMetrics, response.data[0].NoDEPMetrics];
      })

      GetATM360Report: QueryService.atm360Metrics().then(function (response) {
          $scope.atm360metricsLabels = response.data[0].ATM360labels;
          $scope.atm360metricsData = [response.data[0].WDL, response.data[0].DEP];
      })



	GetOOSReport : QueryService.queryOOSReport().then(function (response) {
	   // HMZAdminMgr.ramUsageChart(response.data[0]);
	    $scope.labels = response.data[0].labels;
	    $scope.data = response.data[0].data;
	    $scope.OOSData = {
	        labels: response.data[0].labels,
	        datasets: [
                {
                    data: response.data[0].data,
                    backgroundColor: $scope.bgcolor1
                }]
	    };
	    //console.log($scope.OOSData);
	})

      GetExceptionsReport: QueryService.queryExceptionsReport().then(function (response) {
          var ExceptiondatasetOverride = [];
          var ExceptionDatelabels = response.data[0].ExceptionDates;

          $scope.Exceptionlabels = response.data[0].ExceptionLabels;
          $scope.Exceptiondata = response.data[0].ExceptionsResponse;
         
          for (var i = 0; i < ExceptionDatelabels.length; i++) {
              var obj = {
                  label: ExceptionDatelabels[i],
                  borderWidth: 1,
                  type: 'radar'
              }
              ExceptiondatasetOverride.push(obj);
          }

          $scope.ExceptiondatasetOverride = ExceptiondatasetOverride;

          console.log($scope.ExceptiondatasetOverride);
      })

      /// Temp 
      //var dataSource = [{
      //    "date": "11/19",
      //    "CEH": 30,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}, {
      //    date: "11/18",
      //    CEH: 3,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}, {
      //    date: "11/17",
      //    CEH: 3,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}, {
      //    date: "11/16",
      //    CEH: 3,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}, {
      //    date: "11/15",
      //    CEH: 3,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}, {
      //    date: "11/14",
      //    CEH: 3,
      //    HANG: 4,
      //    BlackScreen: 1,
      //    Memory: 2,
      //    InActive: 3
      //}];

      GetRebootReasons: QueryService.queryRebootReasonsReport().then(function (response) {
          console.log(response.data);
          $scope.chartOptions = {
              dataSource: response.data,
              commonSeriesSettings: {
                  argumentField: "date",
                  type: "fullStackedBar"
              },
              series: [
                  { valueField: "OTHER", name: "OTHER" },
                  { valueField: "CEH", name: "CEH" },
                  { valueField: "HANG", name: "HANG" },
                  { valueField: "BlackScreen", name: "BlackScreen" },
                  { valueField: "Memory", name: "Memory" },
                  { valueField: "InActive", name: "InActive" }
              ],
              //legend: {
              //    verticalAlignment: "top",
              //    horizontalAlignment: "center",
              //    itemTextPosition: "right"
              //},
              tooltip: {
                  enabled: true,
                  customizeTooltip: function (arg) {
                      return {
                          text: arg.percentText + " - " + arg.valueText
                      };
                  }
              }
          }

      })

	$rootScope.$emit('onLocationChangeSuccess', $location.$$path);
	
	//QueryService.queryOOSReport().then(function (response) {
	//    HMZAdminMgr.ramUsageChart(response.data[0].OOSReport);
	//    $scope.OOSData = {
	//        labels: response.data[0].OOSReport.labels,
	//        datasets: [
    //            {
    //                data: response.data[0].OOSReport.data,
    //                backgroundColor: self.bgcolor
    //            }]
	//    };
	//})
	
	//QueryService.queryDashboardData().then(function (response) {

	//    HMZAdminMgr.ramUsageChart(response.data[0].OOSReport);
	//    $scope.OOSData = {
	//        labels: response.data[0].OOSReport.labels,
	//        datasets: [
    //            {
    //                data: response.data[0].OOSReport.data,
    //                backgroundColor: self.bgcolor
    //            }]
	//    };
	//    //$scope.OOSLables = response.data[0].OOSReport.labels;
	//    //$scope.OOSData = response.data[0].OOSReport.data;
	//	HMZAdminMgr.renderDiscUsageChart(response.data[0].discreport);
	//	HMZAdminMgr.renderBandwidthUsageChart(response.data[0].FatalAlerts);
	//	HMZAdminMgr.renderNewAccountsChart(response.data[0].TransactionReport);
	//	HMZAdminMgr.renderNewAccountsChart1(response.data[0].NoWithdrawals);
	//	HMZAdminMgr.rebootReport(response.data[0].RebootReport);
	//	$(".main-wrapper .pushable").removeClass("loading");
	//});
	
	
	
  }


})();