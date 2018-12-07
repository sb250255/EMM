var mongoose = require('mongoose'),
	dbname = "Enhanced";

var Product = mongoose.model("EMAlerts", {
		
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


    //'ATM ID': String,
    //'Ticket ID': String,
    //'Address 1': String,
    //'City': String,
    //'Object Type Description': String,
    //'Status Code Key': String,
    //'NAME - Alert Code': String,
    //'Status Description TH': String,
    //'Status Code Detail Text TH': String,
    //'Start Date - Local TH': String,
    //'Start Time - Local TH': String,
    //'End Date - Local TH': String,
    //'End Time - Local TH': String,
    //'Total Ticket Duration': String,
    //'Reference Number TH': String

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


});

mongoose.connect("mongodb://localhost/" + dbname);


var db = mongoose.connection;
db.on("error", console.error);
db.once("open", deleteProducts);

function deleteProducts(){
	/*Product.remove({}, function(err){
		if(err) console.log(err);
		insertProducts();
	});*/
	insertProducts();
}
function insertProducts(){

		var products = new Product({
		    "ATM ID": "1234",
		    "Ticket ID": "1234",
		    "Address 1": "1234",
		    "City": "Montreal",
		    "Object Type Description": "abc",
		    "Status Code Key": "abc",
		    'NAME - Alert Code': "abc",
		    "Status Description TH": "abc",
		    "Status Code Detail Text TH": "abc",
		    'Start Date - Local TH': "abc",
		    "Start Time - Local TH": "abc",
		    "End Date - Local TH": "abc",
		   "End Time - Local TH": "abc",
		    "Total Ticket Duration": "abc",
		    "Reference Number TH": "abc"
});
products.save(function(err){
		if(err) console.log(err);
});

Product.find(function (err, data) {
    if (err) { console.log(err); }
    else {
        console.log(data);
    }
});

};



