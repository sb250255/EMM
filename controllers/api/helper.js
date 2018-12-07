//var mongoose = require('mongoose');
var OOSAlerts = require('../../models/OOSAlerts');

function GetRebootData(date, next) {
    var RebootsCount = 0;
    var RecoveryRebootsCount = 0;
    var WDLCount = 0;
    var DEPCount = 0;

    OOSAlerts.find({
        "NAME - Alert Code": {
            $in: [
            "RBTCOUNT01",
            "RECVRRB02",
            "WDCOUNT00",
            "DPCOUNT00"
            ]

        },
        "Start Date TH": date
    }, function (err, data) {
        var response = [];
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        } else {
            for (i = 0; i < data.length; i++) {
                switch (data[i]["NAME - Alert Code"]) {

                    case "RBTCOUNT01":
                        RebootsCount = RebootsCount + parseInt(data[i]["Status Code Detail Text TH"]);
                        break;
                    case "RECVRRB02":
                        RecoveryRebootsCount = RecoveryRebootsCount + parseInt(data[i]["Status Code Detail Text TH"]);
                        break;
                    case "WDCOUNT00":
                        WDLCount = WDLCount + parseInt(data[i]["Status Code Detail Text TH"]);
                        break;
                    case "DPCOUNT00":
                        DEPCount = DEPCount + parseInt(data[i]["Status Code Detail Text TH"]);
                        break;
                    default:
                        break;
                }
            }

            // var response = [RebootsCount, RecoveryRebootsCount, WDLCount, DEPCount];

            var result = [RebootsCount, RecoveryRebootsCount, WDLCount, DEPCount];
            //console.log(result);
            response.push(result);

            next("",result);
            // var response = [{ "RebootCount": RebootsCount, "RecoveryRebootsCount": RecoveryRebootsCount, "WDLCount": WDLCount, "DEPCount": DEPCount }];
            //console.log(response);

            //       // res.send(response);

        }
       // console.log(result);
        //return result;
    }
    )
}




function GetNoTXDate(date, next) {
    var NoWDLCount = 0;
    var NoDEPCount = 0;

    OOSAlerts.find({
        "NAME - Alert Code": {
            $in: [
            "NOWDL6HR",
            "NODEP6HR",
            ]

        },
        "Start Date TH": date
    }, function (err, data) {
        var response = [];
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        } else {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                switch (data[i]["NAME - Alert Code"]) {

                    case "NOWDL6HR":
                        NoWDLCount = NoWDLCount +1 ;
                        break;
                    case "NODEP6HR":
                        NoDEPCount = NoDEPCount+1 ;
                        break;
                    default:
                        break;
                }
            }

            // var response = [RebootsCount, RecoveryRebootsCount, WDLCount, DEPCount];

            var result = [NoWDLCount, NoDEPCount];
            //console.log(result);
            response.push(result);

            next("", result);
            // var response = [{ "RebootCount": RebootsCount, "RecoveryRebootsCount": RecoveryRebootsCount, "WDLCount": WDLCount, "DEPCount": DEPCount }];
            //console.log(response);

            //       // res.send(response);

        }
        // console.log(result);
        //return result;
    }
    )
}

function GetExceptionsMetrics(currentDate, next) {

    var ExceptionsArray = [
            "APPCEXP",
            "STARTUP01",
            "STARTUP02",
            "APPHGRB01",
            "APPMEM01",
            "CXSOA02",
            "CXSOA01",
            "INACTIVE03",
            "CXCERT02",
            "CXBROWSE01",
            "CXBROWSE02",
            "CXAGENT02",
            "APPCPU01",
            "WDL00"
    ];
    
    var CEHCounter = 0;
    var BlackScreenCounter = 0;
    var HangCounter = 0;
    var MemoryIssuesCount = 0;
    var SOAIssuesCounter = 0;
    var InActivityCount = 0;
    var CxBrowserErrorCounter = 0;
    var CertificatesIssueCounter = 0;
    var HighCpuUsageCounter = 0;
    var WDLCashEmpty = 0;


    OOSAlerts.find({
        "NAME - Alert Code": {
            $in: [
            "APPCEXP",
            "STARTUP01",
            "STARTUP02",
            "APPMEM01",
            "CXSOA02",
            "CXSOA01",
            "APPHGRB01",
            "APPHGRB00",
            "INACTIVE03",
            "CXCERT02",
            "CXBROWSE01",
            "CXBROWSE02",
            "CXAGENT02",
            "APPCPU01",
            "WDL00",
            "APPHGRB00",
            ]
        },
        "Start Date TH": currentDate
    }, function (err, data) {
        var excptionsCountRes = [];
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        } else {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                switch (data[i]["NAME - Alert Code"]) {

                    case ExceptionsArray[0]:
                        CEHCounter = CEHCounter + 1;
                        break;
                    case ExceptionsArray[1]:
                    case ExceptionsArray[2]:

                        BlackScreenCounter = BlackScreenCounter + 1;
                        break;
                    case ExceptionsArray[3]:
                    case ExceptionsArray[14]:
                        HangCounter = HangCounter + 1;
                        break;
                    case ExceptionsArray[4]:
                        MemoryIssuesCount = MemoryIssuesCount + 1;
                        break;
                    case ExceptionsArray[5]:
                    case ExceptionsArray[6]:
                        SOAIssuesCounter = SOAIssuesCounter + 1;
                        break;
                    case ExceptionsArray[7]:
                        InActivityCount = InActivityCount + 1;
                        break;
                    case ExceptionsArray[8]:
                        CertificatesIssueCounter = CertificatesIssueCounter + 1;
                        break;
                    case ExceptionsArray[9]:
                    case ExceptionsArray[10]:
                    case ExceptionsArray[11]:
                        CxBrowserErrorCounter = CxBrowserErrorCounter + 1;
                        break;
                    case ExceptionsArray[12]:
                        HighCpuUsageCounter = HighCpuUsageCounter + 1;
                        break;
                    case ExceptionsArray[13]:
                        WDLCashEmpty = WDLCashEmpty + 1;
                        break;

                    default:
                        break;
                }
            }

            var ExceptionsMetricResult = [CEHCounter,BlackScreenCounter,HangCounter,MemoryIssuesCount,SOAIssuesCounter,InActivityCount,CertificatesIssueCounter,CxBrowserErrorCounter,HighCpuUsageCounter,WDLCashEmpty];
            //console.log(result);
            excptionsCountRes.push(ExceptionsMetricResult);

            next("", ExceptionsMetricResult);
           
        }
    }
    
 )
}

function GetRebootReasonsMetrics(date, next) {

    var OTHER = 0;
    var CEH = 0;
    var BlackScreen = 0;
    var Hang = 0;
    var Memory = 0;
    var InActive = 0;
    var HighCpuUsage = 0;

    OOSAlerts.find({
        "NAME - Alert Code": {
            $in: [
            "ATMRB00",
            "RECVRRB01"
            ]
        },
        "Start Date TH": date
    }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        } else {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                switch (data[i]["Status Code Detail Text TH"]) {

                    case "ATM Rebooted":
                        OTHER = OTHER + 1;
                        break;
                    case "RecoveryReboot due toCEHREBOOT":
                        CEH = CEH + 1;
                        break;
                    case "RecoveryReboot due toHANGREBOOT":
                        Hang = Hang+1;
                        break;
                    case "RecoveryReboot due toSTARTUPFAILURE":
                    case "RecoveryReboot due toSTARTUPFATAL":
                        BlackScreen = BlackScreen + 1;
                        break;
                    case "RecoveryReboot due toOUTOFMEMORYREBOOT":
                        Memory = Memory + 1;
                        break;
                    case "RecoveryReboot due toHIGHCPUUSAGE":
                        HighCpuUsage = HighCpuUsage+1;

                    default:
                        break;
                }
            }

            var RebootReasonsMetricResult = {
                "date": date.slice(5),
                "OTHER" : OTHER,
                "CEH": CEH,
                "HANG": Hang,
                "BlackScreen": BlackScreen,
                "Memory": Memory,
                "InActive": InActive,
                "HighCpuUsage" : HighCpuUsage
            };
            //console.log(result);
            //excptionsCountRes.push(ExceptionsMetricResult);

            next("", RebootReasonsMetricResult);
           
        }
    }
    )
}

module.exports = {
    getMetrics: GetRebootData,
    getNoTXMetrics: GetNoTXDate,
    getExceptionMetrics: GetExceptionsMetrics,
    getRebootReasonsMetrics: GetRebootReasonsMetrics
};