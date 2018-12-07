;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('HMZAdminApp')
    .constant('site.config', {
      'APP_NAME': 'BEELA_ADMIN',
	  'SERVER' : {
			'NAME': 'APTRA Enhanced Monitoring',
			'START_DATE': '2018-10-29',
			'END_DATE': '2018-10-30'
	  },
      'SEVERITYLIST':[{'name':'Very High','value':'VERY_HIGH'},{'name':'High','value':'HIGH'},{'name':'Medium','value':'MEDIUM'},{'name':'Low','value':'LOW'}],	  
      'DASHBOARD_API_URL': 'rest/EnhancedMonitorALerts.json',
      'OOS_API_URL': 'http://localhost:3000/api/OOSReport',
      'REBOOT_METRICS_URL': 'http://localhost:3000/api/metricsCount',
      'NOTX_METRICS_URL': 'http://localhost:3000/api/noTransactionsCount',
      'ATM360_URL': 'http://localhost:3000/api/ATM360Data',
      'ExceptionsURL': 'http://localhost:3000/api/ExceptionStatus',
      'RebootReasonsURL': 'http://localhost:3000/api/RebootReasons',
      'CEH_API_URL': 'http://localhost:3000//api/CEHCount',
      'HANG_API_URL': 'http://localhost:3000//api/HANGCount',
      'ATM360_API_URL': 'http://localhost:3000//api/ATM360Count',
      'RecoveryDetails_API_URL': 'http://localhost:3000//api/RecoveryCount',
      'BuildNotifications_API_URL': 'http://localhost:3000//api/Notifications',
      'GetDetailsByID_API_URL': 'http://localhost:3000//api/DisplayByATMID',
	  'SYSTEMHEALTH_API_URL' : 'rest/system_health_report_response.json',
	  'PROJECTS' : [{'name': 'Project A','url':'http://somename.com/projects/projectA'},
					{'name': 'Project B','url':'http://somename.com/projects/projectB'},
					{'name': 'Project C','url':'http://somename.com/projects/projectC'},
					{'name': 'Project D','url':'http://somename.com/projects/projectD'},
					{'name': 'Project E','url':'http://somename.com/projects/projectE'},
					{'name': 'Project F','url':'http://somename.com/projects/projectF'}]
    });

})();
