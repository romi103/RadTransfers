// load the things we need
var mongoose = require('mongoose');


// define the schema for new bookin model
var newbooking = mongoose.Schema({
    
// pollName : String,
// labels : [],
// dataset : [],
// userId: String,
// unix: String
    _id: String,
    refno: String,
   date: String,
   predate: String,
   time: String,
   name: String,
   pickup: String,
   destination: String,
   driverId: String,
   remarks: String,
   confirmed: Boolean,
   cancelled: Boolean,
   email: String,
   assignedDriver: String,
   fairNumber: String,
   bookingOrederNo: String

});


// create the model for new booking and expose it to our app
module.exports = mongoose.model('Bookings', newbooking);