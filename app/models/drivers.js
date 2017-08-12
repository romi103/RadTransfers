// load the things we need
var mongoose = require('mongoose');


// define the schema for new bookin model
var drivers = mongoose.Schema({
    _id: String,
   driverId: String,
   name: String,
   surname: String,
   address: String,
   dob: String,
   nin: String,
   availableFrom: String,
   availableTo: String,
   photoPath: String,
   licPath: String,
   email: String,
   carRegNo: String,
   notes: String

});


// create the model for new booking and expose it to our 
module.exports = mongoose.model('Drivers', drivers);