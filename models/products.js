var mongoose = require('mongoose');

var schema = {
    Address: String,
    AgentAddress: String,
    AgentContact: String,
    AgentDetails: String,
    AgentMail: String,
    AgentName: String,
    Amenities: Array,
    AdditionalDetails: Object,
    Area: String,
    Availability: String,
    Balcony: String,
    Bath: String,
    Bed: String,
    Builtin: String,
    CarGarages: String,
    City: String,
    Description: String,
    Facing: String,
    Gated: String,
    Id: String,
    Kitchen: String,
    Parking: String,
    posted: String,
    Price: String,
    Propimages: String,
    State: String,
    Summary: String,
    Status: String,
    Type: String,
    Password: String
}

module.exports = mongoose.model('Property', schema);

