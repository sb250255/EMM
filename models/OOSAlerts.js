var mongoose = require('mongoose');

var schema = {

    'Location Type': String,
    'ATM ID': String,
    'Serial Number': String,
    'Ticket ID': String,
    'Address 1': String,
    'City': String,
    'Object Type Description': String,
    'Start Date TH': String,
    'Start Time TH': String,
    'Status Code Key': String,
    'Category': String,
    'NAME - Alert Code': String,
    'Status Description TH': String,
    'Status Code Detail Text TH': String,
    'Recovery Action Info': String,
    'End Date - Local TH': String,
    'End Time - Local TH': String,
    'Total Ticket Duration': String,
    'Reference Number TH': String

	//'ATM ID' : String,
	//'Ticket ID' : String,
	//'Address 1' : String,
    //'City': String,
    //'Object Type Description' : String,
    //'Status Code Key' : String,
    //'NAME - Alert Code' : String,
    //'Status Description TH' : String,
    //'Status Code Detail Text TH' : String,
    //'Start Date - Local TH' : String,
    //'Start Time - Local TH' : String,
    //'End Date - Local TH'	:String,
    //'End Time - Local TH'	:String,
    //'Total Ticket Duration' : String,
    //'Reference Number TH': String

    //ATMID: String,
    //TicketID: String,
    //Address1: String,
    //City: String,
    //ObjectTypeDescription: String,
    //StatusCodeKey: String,
    //NAMEAlertCode: String,
    //StatusDescriptionTH: String,
    //StatusCodeDetailTextTH: String,
    //StartDateLocalTH: String,
    //StartTimeLocalTH: String,
    //EndDateLocalTH: String,
    //EndTimeLocalTH: String,
    //TotalTicketDuration: String,
    //ReferenceNumberTH: String
  }
// return the object
module.exports = mongoose.model('EMAlerts', schema);

