var mongoose = require('mongoose');

var schema = {
    Name: String,
    Mail: String,
    Password: String,
    proprties: Array,
    Favourites: Array,
    Contact : Number
}
// return the object
module.exports = mongoose.model('logins', schema);

