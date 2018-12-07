
var OOSAlerts = require('../../models/OOSAlerts');
var Helper = require('./helper');

var exceptions = {

    CEHCount: function (req, res, next) {
        console.log("CEH count hit");
      
        OOSAlerts.find({
            "NAME - Alert Code": "APPCEXP"
        }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id "});
            } else {

                console.log(data);
                res.send(data);
            }

        })
    },
    HANGCount: function (req, res, next) {
        console.log("HANG count hit");
        //SB: Has to be modified to APPHANG01
        OOSAlerts.find({
            "Status Code Detail Text TH": "RecoveryReboot due toHANGREBOOT"
        }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " });
            } else {
                //console.log(data);
                //res.send(data);

                //for (i = 0; i < data.length; i++) {

                //}

                //var response = [{ "Rebootlabels": RebootLabelsArray, "TransactionLabels": TransactionLabelsArray, "rebootdata": [TotalRebootsArray, RecoveryRebootsArray], "transactiondata": [WithdrawalCount, DepositsCount] }];
                console.log(data);
                res.send(data);
            }

        })
    },
    ATM360Count: function (req, res, next) {
        console.log("HANG count hit");
        //SB: Has to be modified to APPHANG01
        OOSAlerts.find({
            "NAME - Alert Code": {
                $in: [
                "NOWDL6HR",
                "NODEP6HR"
                ]
            }
        }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " });
            } else {
                res.send(data);
            }

        })
    },

    RecoveryCount: function (req, res, next) {
        console.log("RecoveryCount hit");

        OOSAlerts.find({
            "NAME - Alert Code": "RECVRRB01"
        }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " });
            } else {
                console.log(data);

                res.send(data);
            }

        })
    },

    Notifications: function (req, res, next) {
        console.log("Notifications hit");

        OOSAlerts.find({
            "NAME - Alert Code": {
                $in: [
                "APPMEM01",
                "APPMODE08",
                "STARTUP08",
                "CARDCAP05",
                "CARDJAM01",
                "CXBROWSE01",
                "WDL01",
                "WDLXCASH01",
                "CXSOA01",
                "CXSOA02",
                "INACTIVE01",
                "INACTIVE02",
                "INACTIVE03",
                "CXCERT04"
                ]
            }}, function (err, data) {
                if (err) {
                    res.status(500).send({ message: "Could not retrieve note with id " });
                } else {
                    console.log(data);

                    res.send(data);
                }

            }
        )
    },

    DisplayByATMID: function (req, res, next) {
        var query = require('url').parse(req.url, true).query;
        var id = query.ATMID;
        //var option = query.option;
        console.log("ATM Id : " + id);

        OOSAlerts.find({
            "ATM ID": id
        }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " });
            } else {
                console.log(data);

                res.send(data);
            }

        }
        )
    }

}

module.exports = exceptions;