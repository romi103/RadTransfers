module.exports = function (app, jwtCheck) {

    var Bookings = require('./models/newbooking.js')
    var Drivers = require('./models/drivers.js')

     app.post('/newbooking', jwtCheck, function (req, res, next) {
        
        var newBooking = new Bookings();
        console.log(req.body);
        newBooking._id = req.body._id
        newBooking.refno =  req.body.refno
        newBooking.date =  req.body.date
        newBooking.predate =  req.body.predate
        newBooking.time =  req.body.time
        newBooking.name =  req.body.name
        newBooking.pickup =  req.body.pickup
        newBooking.destination =  req.body.destination
        newBooking.driverId =  req.body.driverId
        newBooking.remarks =  req.body.remarks
        newBooking.confirmed =  req.body.confirmed
        newBooking.cancelled =  req.body.cancelled
        newBooking.email =  req.body.email
        newBooking.assignedDriver =  req.body.assignedDriver
        newBooking.fairNumber =  req.body.fairNumber
        newBooking.bookingOrederNo =  req.body.bookingOrederNo
        newBooking.save();
        res.end();
        
    });
    // =====================================
    // SAVING DRIVER ===============
    // =====================================
      app.post('/savedriver', jwtCheck, function (req, res, next) {
        var newDriver = new Drivers();
        newDriver._id = req.body._id,
        newDriver.driverId = req.body.driverId,
        newDriver.name = req.body.name,
        newDriver.surname = req.body.surname,
        newDriver.address = req.body.address,
        newDriver.dob = req.body.dob,
        newDriver.nin = req.body.nin,
        newDriver.availableFrom = req.body.availableFrom,
        newDriver.availableTo = req.body.availableTo,
        newDriver.photoPath = req.body.photoPath,
        newDriver.licPath = req.body.licPath,
        newDriver.email = req.body.email,
        newDriver.carRegNo = req.body.carRegNo,
        newDriver.notes = req.body.notes
        newDriver.save();
        res.end();
        
    });
    // =====================================
    // EDIT-SAVING DRIVER ===============
    // =====================================
      app.post('/saveeditdriver', jwtCheck, function (req, res, next) {
        
        Drivers.update({ _id: req.body._id }, { $set: { 
                _id: req.body._id,
                driverId: req.body.driverId,
                name: req.body.name,
                surname: req.body.surname,
                address: req.body.address,
                dob: req.body.dob,
                nin: req.body.nin,
                availableFrom: req.body.availableFrom,
                availableTo: req.body.availableTo,
                photoPath: req.body.photoPath,
                licPath: req.body.licPath,
                email: req.body.email,
                carRegNo: req.body.carRegNo,
                notes: req.body.notes } }, (err, numUpdate) => {
                    if (err) throw "An error occured."
                    console.log("updated");
                    res.end();
        })
    });

    // =====================================
    // EDIT-SAVING DRIVER ===============
    // =====================================
      app.post('/saveeditbooking',jwtCheck, function (req, res, next) {
        
        Bookings.update({ _id: req.body._id }, { $set: { 
                  _id: req.body._id,
                refno: req.body.refno,
                date: req.body.date,
                predate: req.body.predate,
                time: req.body.time,
                name: req.body.name,
                pickup: req.body.pickup,
                destination: req.body.destination,
                driverId: req.body.driverId,
                remarks: req.body.remarks,
                confirmed: req.body.confirmed,
                cancelled: req.body.cancelled,
                email: req.body.email,
                assignedDriver: req.body.assignedDriver,
                fairNumber:  req.body.fairNumber
            
            } }, (err, numUpdate) => {
                    if (err) throw "An error occured."
                    console.log("updated");
                    res.end();
        })
    });
  


       // =====================================
    // GETTING LIST OF BOOKINGS ===============
    // =====================================
    app.get('/getbookings',jwtCheck, function (req, res) {

        var bookings = Bookings.find().exec(function (err, bookings) {
            // console.log(bookings)
             if (err) return handleError(err);
            res.send(bookings);
        });
    });

          // =====================================
    // GETTING LIST OF DRIVERS ===============
    // =====================================
    app.get('/getdrivers', jwtCheck, function (req, res) {

        var drivers = Drivers.find().exec(function (err, drivers) {
            // console.log(drivers)
             if (err) return handleError(err);
            res.send(drivers);
        });
    });

        // =====================================
    // REMOVING DRIVER ===============
    // =====================================
     app.get('/removedriver/:driverId', jwtCheck,function (req, res) {

        Drivers.find({
            "_id": req.params.driverId
        }).remove().exec(function(err, drivers) {
            if (err) return handleError(err);
            res.send(drivers)
        })
    });

     // =====================================
    // REMOVING BOOKING ===============
    // =====================================
     app.get('/removebooking/:bookingId',jwtCheck, function (req, res) {

        Bookings.find({
            "_id": req.params.bookingId
        }).remove().exec(function(err, bookings) {
            if (err) return handleError(err);
            res.send(bookings)
        })
    });

}