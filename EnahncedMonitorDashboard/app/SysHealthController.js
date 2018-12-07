/**
 * System health application controller
 * 
 */
;(function() {

  angular
    .module('HMZAdminApp')
    .controller('SysHealthController', SysHealthController);

  SysHealthController.$inject = ['site.config','QueryService','DetailService','$rootScope','$timeout','$location', '$scope', 'NgTableParams'];


  function SysHealthController(SiteConfig, QueryService, DetailService, $rootScope, $timeout, $location, $scope, NgTableParams) {

    // 'controller as' syntax
    var self = this;
    var CEHDetails = [];
    var HANGDetails = [];
    var ATM360Details = [];
    var RecoveryDetails = [];
    var DetailsbyATMId = [];

    $scope.ExceptionDetails = [];

    $scope.displayNotificationsCount = 3;
    $scope.notifications = [];

    $scope.ATMID = "NBC7712";

    var OOMNotifications = [];
    var CriticalDeviceNotifications = [];
    var CxAlertsNotifications = [];
    var CertificatesNotifications = [];
    var SOANotifications = [];
    var WDLUnavailableNotifications = [];
    var WDLNOCashNotifications = [];
    var InActiveNotifications = [];
    var CardCaptureNotifications = [];
    var CardJamNotifications = [];

	$rootScope.$emit('onLocationChangeSuccess', $location.$$path);
	$(".main-wrapper .pushable").addClass("loading");
	QueryService.querySystemData().then(function(response){
	    var data = response.data;
		self.timestamp = data.timestamp;
		self.processReportInDetail = data.processReportInDetail;
		HMZAdminMgr.renderProcessWiseChart(data.processReport);
		$(".main-wrapper .pushable").removeClass("loading");
		 
	});


      CEHReport: DetailService.queryCEH().then(function (response) {
          // HMZAdminMgr.ramUsageChart(response.data[0]);
          $scope.CEHCount = response.data.length;

          CEHDetails.push(response.data);
      })

      HangReport: DetailService.queryHang().then(function (response) {

          $scope.HANGCount = response.data.length;
          HANGDetails.push(response.data);

      })

      ATM360Report: DetailService.queryATM360().then(function (response) {

          $scope.ATM360Count = response.data.length;
          ATM360Details.push(response.data);
      })

      RecoveryReport: DetailService.queryRecovery().then(function (response) {

          $scope.RecoveryCount = response.data.length;
          RecoveryDetails.push(response.data);
      })
      //"APPMEM01",
      //"APPMODE08",
      //"STARTUP08",
      //"CARDCAP05",
      //"CARDJAM01",
      //"CXBROWSE01",
      //"WDL01",
      //"WDLXCASH01",
      //"CXSOA01",
      //"INACTIVE03",
      //"CXCERT04"
      BuildNotifications: DetailService.buildNotifications().then(function (response) {
          //var notificationsResponse = [];
          //notificationsResponse = response.data;
          console.log(response.data);

          for (let i = 0; i < response.data.length; i++) {
              switch (response.data[i]['NAME - Alert Code']) {

                  case 'APPMEM01':
                      BuildOutOfMemoryNotification(response.data[i]);
                      break;
                  case 'APPMODE08':
                  case 'STARTUP08':
                      BuildOOSDeviceNotification(response.data[i]);
                      break;
                  case 'CARDCAP05':
                  case 'CARDJAM01':
                      BuildCardErrorNotification(response.data[i]);
                      break;
                  case 'CXSOA01':
                  case 'CXSOA02':
                      BuildSOAErrorNotification(response.data[i]);
                      break;
                  case 'WDL01':
                      BuildWDLNoCashNotification(response.data[i]);
                      break;
                  case 'WDLXCASH01':
                      BuildWDLRebootNotification(response.data[i]);
                      break;
                  case 'CXBROWSE01':
                  case 'CXCERT04':
                      BuildCXErrorNotification(response.data[i]);
                      break;
                  case 'INACTIVE01':
                  case 'INACTIVE02':
                  case 'INACTIVE03':
                      BuildInActiveNotification(response.data[i]);
                      break;
                  default:
                      break;
              }
          }

          ConstructNotification();
      })

      GetDetailsByID();

     function GetDetailsByID(){
          DetailsbyATMId.length = 0;

          DetailService.getDetailsByID({ 'ATMID': $scope.ATMID }).then(function (response) {
              console.log("RESPONSE: " + response.data);
              DetailsbyATMId.push(response.data);
              $scope.detailsbyidParams = new NgTableParams({}, { dataset: DetailsbyATMId[0] });

          })

      }

       // Private method to build notification messages - Better to handle at directive 
      function BuildOutOfMemoryNotification(element) {
          OOMNotifications.push(element);
      }
      function BuildOOSDeviceNotification(element) {
          CriticalDeviceNotifications.push(element);
      }
      function BuildCardErrorNotification(element) {
          CardCaptureNotifications.push(element);
      }
      function BuildSOAErrorNotification(element) {
          SOANotifications.push(element);
      }
      function BuildWDLNoCashNotification(element) {
          WDLUnavailableNotifications.push(element);
      }
      function BuildWDLRebootNotification(element) {
          WDLNOCashNotifications.push(element);
      }
      function BuildCXErrorNotification(element) {
          CxAlertsNotifications.push(element);
      }
      function BuildInActiveNotification(element) {
          InActiveNotifications.push(element);
      }
      

      function ConstructNotification() {
          console.log(OOMNotifications);
          if (OOMNotifications.length > 0) {
              var OOMobj = {
                  "type" : "OutOfMemory",
                  "message": 'OutOfMemory exception Recovered for ' + OOMNotifications.length + ' times',
                  "lastrecovered" : OOMNotifications[0]['Start Date TH'] +" on ATM#"+OOMNotifications[0]['ATM ID'],
                  "details": OOMNotifications
              };
              $scope.notifications.push(OOMobj);
          }
          if (CriticalDeviceNotifications.length > 0) {
              var OOSobj = {
                  "type": "OutOfService",
                  "message": 'OutOfService Due to Device HW Error for ' + CriticalDeviceNotifications.length + ' times',
                  "lastrecovered": CriticalDeviceNotifications[0]['Start Date TH'] + " on ATM#" + CriticalDeviceNotifications[0]['ATM ID'],
                  "details": CriticalDeviceNotifications
              };
              $scope.notifications.push(OOSobj);
          }
          if (CardCaptureNotifications.length > 0) {
              var Cardobj = {
                  "type": "CardCapture",
                  "message": 'Cards Captured / Jammed for ' + CardCaptureNotifications.length + ' times',
                  "lastrecovered": CardCaptureNotifications[0]['Start Date TH'] + " on ATM#" + CardCaptureNotifications[0]['ATM ID'],
                  "details": CardCaptureNotifications
              };
              $scope.notifications.push(Cardobj);
          }
          if (SOANotifications.length > 0) {
              var SOAobj = {
                  "type": "SOA",
                  "message": 'SOA related errors reported for ' + SOANotifications.length + ' times',
                  "lastrecovered": SOANotifications[0]['Start Date TH'] + " on ATM#" + SOANotifications[0]['ATM ID'],
                  "details": SOANotifications
              };
              $scope.notifications.push(SOAobj);
          }
          if (WDLUnavailableNotifications.length > 0) {
              var WDLUnavailobj = {
                  "type": "WDLNoCash",
                  "message": 'WDL unavaialble due to no cash for' + WDLUnavailableNotifications.length + ' times',
                  "lastrecovered": WDLUnavailableNotifications[0]['Start Date TH'] + " on ATM#" + WDLUnavailableNotifications[0]['ATM ID'],
                  "details": WDLUnavailableNotifications
              };
              $scope.notifications.push(WDLUnavailobj);
          }
          if (WDLNOCashNotifications.length > 0) {
              var WDLRebootobj = {
                  "type": "WDLReboot",
                  "message": 'Reboot during WDL transaction for ' + WDLNOCashNotifications.length + ' times',
                  "lastrecovered": WDLNOCashNotifications[0]['Start Date TH'] + " on ATM#" + WDLNOCashNotifications[0]['ATM ID'],
                  "details": WDLNOCashNotifications
              };
              $scope.notifications.push(WDLRebootobj);
          }
          if (CxAlertsNotifications.length > 0) {
              var CXAlertsobj = {
                  "type": "CX",
                  "message": 'Browser / Certificate error reported for ' + CxAlertsNotifications.length + ' times',
                  "lastrecovered": CxAlertsNotifications[0]['Start Date TH'] + " on ATM#" + CxAlertsNotifications[0]['ATM ID'],
                  "details": CxAlertsNotifications
              };
              $scope.notifications.push(CXAlertsobj);
          } 
          if (InActiveNotifications.length > 0) {
              var InActiveobj = {
                  "type": "InActive",
                  "message": 'InActive during buisness hours for ' + InActiveNotifications.length + ' times',
                  "lastrecovered": InActiveNotifications[0]['Start Date TH'] + " on ATM#" + InActiveNotifications[0]['ATM ID'],
                  "details": InActiveNotifications
              };
              $scope.notifications.push(InActiveobj);
          }
      }

      $scope.GetCEHDetails = function () {
          $('.ui.modal').modal('show');
          $scope.displayDescription = false;
          $scope.ExceptionDetails = CEHDetails[0];
          $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
      }
	
      $scope.GetHANGDetails = function () {
          $('.ui.modal').modal('show');
          $scope.displayDescription = false;
          $scope.ExceptionDetails = HANGDetails[0];
          $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
      }

      $scope.GetATM360Details = function () {
          $('.ui.modal').modal('show');
          $scope.displayDescription = true;
          $scope.ExceptionDetails = ATM360Details[0];
          $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
      }

      $scope.GetRecoveryDetails = function () {
          $('.ui.modal').modal('show');
          $scope.displayDescription = false;
          $scope.ExceptionDetails = RecoveryDetails[0];
          $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
      }

      $scope.GetNotificationDetails = function (type) {
          $('.ui.modal').modal('show');
          $scope.displayDescription = false;
          $scope.active = true;
          if (type == "OutOfMemory") {
              $scope.ExceptionDetails = OOMNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "OutOfService") {
              $scope.ExceptionDetails = CriticalDeviceNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "CardCapture") {
              $scope.ExceptionDetails = CardCaptureNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "SOA") {
              $scope.ExceptionDetails = SOANotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "WDLNoCash") {
              $scope.ExceptionDetails = WDLUnavailableNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "WDLReboot") {
              $scope.ExceptionDetails = WDLNOCashNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "CX") {
              $scope.ExceptionDetails = CxAlertsNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          if (type == "InActive") {
              $scope.displayDescription = true;
              $scope.ExceptionDetails = InActiveNotifications;
              $scope.tableParams = new NgTableParams({}, { dataset: $scope.ExceptionDetails });
          }
          
      }

      $scope.viewMore = function () {
          $scope.displayNotificationsCount = 10;
      }

      $scope.GetDetailsByID = function () {
          DetailsbyATMId.length = 0;

          DetailService.getDetailsByID({'ATMID' : $scope.ATMID}).then(function (response) {
              console.log("RESPONSE: " + response.data);
              if (response.data.length > 0) {
                  DetailsbyATMId.push(response.data);
                  $scope.detailsbyidParams = new NgTableParams({}, { dataset: DetailsbyATMId[0] });
              } else {
                  $scope.displayWrongIdMessage = true;
                  $scope.ATMID = "NBC7712";
              }
            

          })

      }

      
  }


})();