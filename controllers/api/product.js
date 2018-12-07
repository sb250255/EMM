//Step 1:

//go here https://myaccount.google.com/lesssecureapps and enable for less secure apps. If this does not work then

//Step 2

//go here https://accounts.google.com/DisplayUnlockCaptcha and enable/continue and then try.

var Products = require('../../models/products');
var logins = require('../../models/loginModel');
//var alerts = require('../../models/Alerts');
var OOSAlerts = require('../../models/OOSAlerts');
var Helper = require('./helper');
// injecting node mailer and mailer smtp transport.
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// Wrap all the methods in an object
var DateLabelsArray = [
                     "2018-12-04",
                     "2018-12-03",
                     "2018-12-02",
                     "2018-12-01",
                     "2018-11-30",
                    "2018-11-29",
                    "2018-11-28"
];
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'montrealcollege18@gmail.com',
        pass: 'montreal123'
    }
}));

var product = {

	OOSReport : function (req, res, next) {
	   
	    let settelement = 0;
	    let supervisor = 0;
	    let unknown = 0;
	    let disabled = 0;
	    let keyexchange = 0;

			let Diagnostics = 0;
			let HWError = 0;
			
			OOSAlerts.find(
                {
                    "NAME - Alert Code":
                    { $regex: /APPMODE*/, $options: "si" },

                    "NAME - Alert Code":
                        { $ne: "APPMODE00" }
                },function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                //console.log(OOSData);
				for(i = 0; i< data.length; i++)
				{
				    switch (data[i]["Status Code Detail Text TH"])
				    {
				        case "AppOOSInSupervisor":
				            supervisor++;
				            break;
				        case "ATMOOSInSettlement":
						    settelement ++;
						    break;
				        case "AppOOSUnknown":
						    unknown ++;
						    break;
				        case "AppOOSDisabled":
				            disabled++;
				            break;
				        case "AppOOSPendingHostGIS":
				            keyexchange++;
				            break;
				       
						default : 
						break;
						
					} 
				}
				//console.log(settelement+" " +Diagnostics+" " +HWError);
				var response = [{ "labels": ["Settelement", "Supervisor", "Unknown", "Disabled", "keyexchange"], "data": [settelement, supervisor, unknown, disabled, keyexchange] }]
				console.log(response);
				//console.log(data);
				res.send(response);
            }
        });
	},
	rebootTrend : function(req, res, next){
	    
	    //var LabelsArray = ["Total Reboots", "RecoveryReboots", "WDLCount", "DEPCount"];
	    var RebootLabelsArray = [];
	    var TransactionLabelsArray = [];
	    var TotalRebootsArray = [];
	    var RecoveryRebootsArray = [];
	    var WithdrawalCount = [];
	    var DepositsCount = [];
	   
	    //RBTCOUNT01
	    OOSAlerts.find({
	        "NAME - Alert Code": {
	            $in: [
                "RBTCOUNT01",
                "RECVRRB02",
                "WDCOUNT00",
                "DPCOUNT00"
	            ]

	        }
	    }, function (err, data) {
	        if (err) {
	            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
	        } else {
	            //console.log(data);
	            //res.send(data);

	            for (i = 0; i < data.length; i++) {
	                switch (data[i]["NAME - Alert Code"]) {

	                    case "RBTCOUNT01":
	                        TotalRebootsArray.push(data[i]["Status Code Detail Text TH"]);
	                        RebootLabelsArray.push(data[i]["Start Date - Local TH"]);
	                        break;
	                    case "RECVRRB02":
	                        RecoveryRebootsArray.push(data[i]["Status Code Detail Text TH"]);
	                        break;
	                    case "WDCOUNT00":
	                        WithdrawalCount.push(data[i]["Status Code Detail Text TH"]);
	                        TransactionLabelsArray.push(data[i]["Start Date - Local TH"]);
	                        break;
	                    case "DPCOUNT00":
	                        DepositsCount.push(data[i]["Status Code Detail Text TH"]);
	                        break;
	                    default:
	                        break;
	                }
	            }

	            var response = [{ "Rebootlabels": RebootLabelsArray , "TransactionLabels": TransactionLabelsArray, "rebootdata": [TotalRebootsArray, RecoveryRebootsArray], "transactiondata": [ WithdrawalCount, DepositsCount] }];
	            console.log(response);
	            res.send(response);
	        }
	        
	    })

	},
	metricsCount: function (req, res, next) {
	    console.log("metrics count hit");
	    //var DateLabelsArray = [
        //            "2018-11-14",
        //            "2018-11-13",
        //            "2018-11-12",
        //            "2018-11-11",
        //            "2018-11-10",
        //            "2018-11-09",
        //            "2018-11-08"
                    
	    //];
	    var rebootmetrices = [];
	    var recoverymetrices = [];
	    var WDLmetrices = [];
	    var DEPmetrices = [];
	    var dates = [];
	    var RebootsCount = [];
	    var RecoveryRebootsCount = [];
	    var WDLCount = 0;
	    var DEPCount = 0;

	    DateLabelsArray.sort().forEach(function (date) {
	        Helper.getMetrics(date, function (err, data) {
	            dates.push(date);
	            rebootmetrices.push(data[0]);
	            recoverymetrices.push(data[1]);
	            WDLmetrices.push(data[2]);
	            DEPmetrices.push(data[3]);
	        });
	    })

	    setTimeout(function () {
	       //console.log(response);
	        res.send([{ "DateLabelsArray": dates, "rebootmetrices": rebootmetrices, "recoverymetrices": recoverymetrices, "WDLCount": WDLmetrices, "DEPCount": DEPmetrices }]);
	    },1000)
	},
    noTransactionsCount: function (req, res, next) {
	    //var DateLabelsArray = [
        //             "2018-11-14",
        //            "2018-11-13",
        //            "2018-11-12",
        //            "2018-11-11",
        //            "2018-11-10",
        //            "2018-11-09",
        //            "2018-11-08"

	    //];
	    var noWDLData = [];
	    var noDEPData = [];
	    var dates = [];


	    var RebootsCount = [];
	    var RecoveryRebootsCount = [];
	    var WDLCount = 0;
	    var DEPCount = 0;

	    DateLabelsArray.sort().forEach(function (date) {
	        Helper.getNoTXMetrics(date, function (err, data) {
	            dates.push(date);
	            noWDLData.push(data[0]);
	            noDEPData.push(data[1]);
	        });
	    })

	    setTimeout(function () {
	        //console.log(response);
	        res.send([{ "NoTXLabelsArray": dates, "NoWDLMetrics": noWDLData, "NoDEPMetrics": noDEPData }]);
	    }, 1000)
    },
    
    ATM360Data : function(req,res,next){
    
        var first = 0;
        var second = 0;
        var third = 0;
        var fourth = 0;
        var fifth = 0;
        var sixth = 0;

        var first1 = 0;
        var second1 = 0;
        var third1 = 0;
        var fourth1 = 0;
        var fifth1 = 0;
        var sixth1 = 0;
        //var date = new Date();

        var date = new Date();
        date.setDate(date.getDate() - 2);
        var customisedDate = date.getFullYear() + '-' + leadingZero((date.getMonth() + 1)) + '-' + leadingZero(date.getDate());

        console.log(customisedDate);
        OOSAlerts.find({
            "NAME - Alert Code": {
                $in: [
                "NOWDL6HR",
                "NODEP6HR"
                ]
            },
            "Start Date TH": customisedDate
        }, function (err,data) {

            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                for (i = 0; i < data.length; i++) {
                    if (data[i]["NAME - Alert Code"] == "NOWDL6HR") {

                       let indexWDLVal = parseInt(data[i]["Start Time TH"])

                       if (indexWDLVal <= 4) {
                           first = first + 1;
                       } else if (indexWDLVal > 4 && indexWDLVal < 8) {
                           second = second + 1;
                       }else if(indexWDLVal > 8 && indexWDLVal < 12){
                           third = third + 1;
                       } else if (indexWDLVal > 12 && indexWDLVal < 16) {
                           fourth = fourth + 1;
                       } else if (indexWDLVal > 16 && indexWDLVal < 20) {
                           fifth = fifth + 1;
                       } else {
                           sixth = sixth + 1;
                       }

                    } else {

                        let indexDEPVal = parseInt(data[i]["Start Time TH"])
                        // console.log(indexWDLVal);

                        if (indexDEPVal <= 4) {
                            first1 = first1 + 1;
                        } else if (indexDEPVal > 4 && indexDEPVal < 8) {
                            second1 = second1 + 1;
                        } else if (indexDEPVal > 8 && indexDEPVal < 12) {
                            third1 = third1 + 1;
                        } else if (indexDEPVal > 12 && indexDEPVal < 16) {
                            fourth1 = fourth1 + 1;
                        } else if (indexDEPVal > 16 && indexDEPVal < 20) {
                            fifth1 = fifth1 + 1;
                        } else {
                            sixth1 = sixth1 + 1;
                        }
                    }


                    
                }
                res.send([{ "ATM360labels": ["12-04AM", "04-08AM", "8-12PM", "12-16PM", "16-20PM", "20-24PM"], "WDL": [first, second, third, fourth, fifth, sixth], "DEP": [first1, second1, third1, fourth1, fifth1, sixth1] }])
               // console.log([first, second, third, fourth, fifth, sixth] + "--" + [first1, second1, third1, fourth1, fifth1, sixth1]);


            }
        })
    },
    // get the exception , hang, black screen, certificates.. etc on daily basis. 
    ExceptionStatus : function(req,res,next){
    
        //var rebootmetrices = [];
        //var recoverymetrices = [];
        //var WDLmetrices = [];
        //var DEPmetrices = [];
        //var dates = [];
        //var RebootsCount = [];
        //var RecoveryRebootsCount = [];
        //var WDLCount = 0;
        //var DEPCount = 0;

        var ExceptionsResponse = [];
        var ExceptionDates = [];
        var ExcpetionLabels = ["Exceptions", "BlackScreen", "Hang", "Memory", "SOAIssues", "InActive", "Certificate", "CxBrowserErrors", "HighCpuUsage", "WDLCashEmpty"];
        var LastSevenDays = ["2018-11-14", "2018-11-13", "2018-11-12", "2018-11-11", "2018-11-10", "2018-11-09", "2018-11-08"];

        DateLabelsArray.forEach(function (curentDate) {
            Helper.getExceptionMetrics(curentDate, function (err, data) {
                //dates.push(curentDate);
                //rebootmetrices.push(data[0]);
                //recoverymetrices.push(data[1]);
                //WDLmetrices.push(data[2]);
                //DEPmetrices.push(data[3]);
                ExceptionDates.push(curentDate);
                ExceptionsResponse.push(data);

            });


        })

        setTimeout(function () {
            //console.log(response);
            res.send([{ "ExceptionLabels": ExcpetionLabels, "ExceptionDates" : ExceptionDates, "ExceptionsResponse": ExceptionsResponse }]);

        }, 1000)

        //console.log(ExceptionsResponse);


        
    },

    RebootReasons : function(req,res,next){
        var rebootReasonsArray = [];
        DateLabelsArray.forEach(function (curentDate) {
            Helper.getRebootReasonsMetrics(curentDate, function (err, data) {
                rebootReasonsArray.push(data);
            });
        })

        setTimeout(function () {
            //console.log(response);
            res.send(rebootReasonsArray);
        }, 1000)
    },

    read: function (req, res, next) {
        //console.log('Read'+req.params.fname);
        //var obj = res.json({ type: "Read", fname: req.params.fname });
        //console.log(obj.data);
        console.log(req.params.email + ' ' + req.params.password);
        Products.find({ email: req.params.email, password: req.params.password }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                console.log(data)
                res.send(data);
            }
        });
        console.log("read hit");
        //Products.find({ email: "beelasuresh8@gmail.com", password : "temppp" }, function (err, data) {
        //    if (err) {
        //        res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        //    } else {
        //        console.log(data);
        //        res.send(data);
        //    }
        //});
    },
    getPassword: function (req, res, next) {
        //console.log('Read'+req.params.fname);
        //var obj = res.json({ type: "Read", fname: req.params.fname });
        //console.log(obj.data);
        console.log(req.params.password);
        Products.find({ email: req.params.email }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                console.log(data)
                res.send(data);
            }
        });
        console.log("getPassword hit");
        //Products.find({ email: "beelasuresh8@gmail.com", password : "temppp" }, function (err, data) {
        //    if (err) {
        //        res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        //    } else {
        //        console.log(data);
        //        res.send(data);
        //    }
        //});
    },
    //create: function (req, res, next) {
    //    console.log('Create');
    //res.send(req.body);
    //},
    create: function (req, res, next) {

        console.log("Create hit");
        var product = new Products({
            Address: req.body.Address,
            AgentAddress: req.body.AgentAddress,
            AgentContact: req.body.AgentContact,
            AgentDetails: req.body.AgentDetails,
            AgentMail: req.body.AgentMail,
            AgentName: req.body.AgentName,
            Amenities: req.body.Amenities,
            AdditionalDetails: req.body.AdditionalDetails,
            Area: req.body.Area,
            Availability: req.body.Availability,
            Balcony: req.body.Balcony,
            Bath: req.body.Bath,
            Bed: req.body.Bed,
            Builtin: req.body.Builtin,
            CarGarages: req.body.CarGarages,
            City: req.body.City,
            Description: req.body.Description,
            Facing: req.body.Facing,
            Gated: req.body.Gated,
            Id: req.body.Id,
            Kitchen: req.body.Kitchen,
            Parking: req.body.Parking,
            posted: req.body.posted,
            Price: req.body.Price,
            Propimages: req.body.Propimages,
            State: req.body.State,
            Summary: req.body.Summary,
            Status: req.body.Status,
            Type: req.body.Type,
            Password: req.body.Password

        });

        product.save(function (err, data) {
            console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error ocuured while creating the Note." });
            } else {
                res.send(data);
                console.log(data);
            }
        });
    },
    update: function (req, res) {
        // Update a note identified by the noteId in the request
        Products.findOne({ fname: "Beela" }, function (err, note) {
            if (err) {
                res.status(500).send({ message: "Could not find a note with id " + req.params.fname });
            }

            /* note.title = req.body.title;
             note.content = req.body.content;*/
            note.password = "temppp";
            //console.log(note[0]);
            //Object.assign(note[0].password, "temppp");
            note.save(function (err, data) {
                if (err) {
                    res.status(500).send({ message: "Could not update note with id " + req.params.fname });
                } else {
                    res.send(data);
                }
            });
        });
    },
    storeEmail: function (req, res) {

    },
    delete: function (req, res) {
        // Delete a note with the specified noteId in the request
        Products.remove({ lname: req.params.fname }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not delete note with id " + req.params.id });
            } else {
                res.send({ message: "Note deleted successfully!" })
            }
        });
        //Products.save();
    },
    getAll: function (req, res) {
       // console.log("get ALL initited");
        Products.find(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
               // console.log(data);
                res.json(data);
            }
            //console.log("getAll" + res.json(data));
            //if(err) console.error;
            //res.json(data);
        })
    },
    getLocations: function (req, res) {
        console.log("get Location initited" + req.params.location);
        // query to get the locations based on start with letter.
        var query = { City: { $regex: '^' + req.params.location, $options: "i" } };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    // get property by location.
    getPropertiesByLocation: function (req, res) {
        console.log("get Property by location initited" + req.params.location);

        var query = { City: req.params.location, Type: req.params.type };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    getPropertyById: function (req, res) {
        console.log("get Property by Id initited" + req.params.id);

        var query = { _id: req.params.id };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },

    sendEmail: function (req, res) {
        var query = { _id: req.body.id };
        var to = req.body.mail;
        var propDesc = {};
        console.log("To mail : " + to);
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                //console.log(data);
                propDesc.des = data[0].Description;
                console.log(data[0].Description);

                var mailOptions = {
                    from: 'beelasuresh8@gmail.com',
                    to: to,
                    subject: propDesc.des,
                    text: propDesc.des,
                    html: '<b>Hello, <strong>' + to + '</strong>,<br/>' + propDesc.des + '</b></p>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("Subject-" + mailOptions.subject);
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.json(data);
            }

        })

    },

    getPropertiesByTypeLocationStaus: function (req, res) {
        console.log("get PropertiesByTypeLocationStaus initited");
        // query to get the locations based on start with letter.
        if (req.params.status == 'All') {
            var query = { City: req.params.location, Type: req.params.type };
        } else {
            var query = { City: req.params.location, Type: req.params.type, Status: req.params.status };
        }
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    registerUser: function (req, res) {
        //console.log("Register User hit");
        var login = new logins({
            Name: req.body.Name,
            Mail: req.body.Mail,
            Password: req.body.Password,
            Properties: req.body.Properties,
            Favourites: req.body.Favourites,
            Contact: req.body.Contact
        })
        login.save(function (err, data) {
            //console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error ocuured while creating the user." });
            } else {
                res.send(data);
                console.log(data);
            }
        });
    },
    logIn: function (req, res) {
        console.log("Log in User hit");
       
          var query = { Mail: req.params.mail, Password: req.params.pwd};
          console.log(query);
        logins.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }
        })
    },
	//storeAlert: function (req, res) {
    //    console.log("storeAlert hit");
    //    var alert = new alerts({
    //        Name: req.body.Name,
	//		Details: req.body.Details,
	//		Time: req.body.Time
    //    })
    //    alert.save(function (err, data) {
    //        //console.log(data);
    //        if (err) {
    //            console.log(err);
    //            res.status(500).send({ message: "Some error ocuured while creating the user." });
    //        } else {
    //            res.send(data);
    //            console.log(data);
    //        }
    //    });
    //}

}

function leadingZero(value) {
    if (value < 10) {
        return "0" + value.toString();
    }
    return value.toString();
}

//function GetRebootData(date) {
//    var RebootsCount = 0;
//    var RecoveryRebootsCount = 0;
//    var WDLCount = 0;
//    var DEPCount = 0;

//    OOSAlerts.find({
//        "NAME - Alert Code": {
//            $in: [
//            "RBTCOUNT01",
//            "RECVRRB02",
//            "WDCOUNT00",
//            "DPCOUNT00"
//            ]

//        },
//        "Start Date - Local TH": date
//    }, function (err, data) {
//        var response = [];
//        if (err) {
//            res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
//        } else {
//            for (i = 0; i < data.length; i++) {
//                switch (data[i]["NAME - Alert Code"]) {

//                    case "RBTCOUNT01":
//                        RebootsCount = RebootsCount + parseInt(data[i]["Status Code Detail Text TH"]);
//                        break;
//                    case "RECVRRB02":
//                        RecoveryRebootsCount = RecoveryRebootsCount + parseInt(data[i]["Status Code Detail Text TH"]);
//                        break;
//                    case "WDCOUNT00":
//                        WDLCount = WDLCount + parseInt(data[i]["Status Code Detail Text TH"]);
//                        break;
//                    case "DPCOUNT00":
//                        DEPCount = DEPCount + parseInt(data[i]["Status Code Detail Text TH"]);
//                        break;
//                    default:
//                        break;
//                }
//            }

//            // var response = [RebootsCount, RecoveryRebootsCount, WDLCount, DEPCount];

//            var result = { "RebootCount": RebootsCount, "RecoveryRebootsCount": RecoveryRebootsCount, "WDLCount": WDLCount, "DEPCount": DEPCount };
//            //console.log(result);
//            response.push(result);
//           // var response = [{ "RebootCount": RebootsCount, "RecoveryRebootsCount": RecoveryRebootsCount, "WDLCount": WDLCount, "DEPCount": DEPCount }];
//            //console.log(response);
           
//            //       // res.send(response);
           
//        }
//        console.log(result);
//        return result;
//    }
//    )
//};
module.exports = product;


