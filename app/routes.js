module.exports = function (app) {

    var Bookings = require('./models/newbooking.js')

     app.post('/newbooking', function (req, res, next) {
        
        var newBooking = new Bookings();
        console.log("accepted");
        console.log("body",req.body);
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
    // GETTING LIST OF BOOKINGS ===============
    // =====================================
    app.get('/getbookings', function (req, res) {

        var bookings = Bookings.find().exec(function (err, bookings) {
            console.log(bookings)
            res.send(bookings);
        });
    });

     // =====================================
    // REMOVING BOOKING ===============
    // =====================================
     app.get('/removebooking/:bookingId', function (req, res) {

        Bookings.find({
            "_id": req.params.bookingId
        }).remove().exec(function(err, bookings) {
            res.send(bookings)
        })
    });

      // =====================================
    // CANCEL BOOKING ===============
    // =====================================
     app.get('/cancelbooking/:bookingId', function (req, res) {

        Bookings.find({
            "_id": req.params.bookingId
        }).remove().exec(function(err, bookings) {
            res.send(bookings)
        })
    });

    
    
    // });app.post('/newpoll', function (req, res, next) {
    //     if (req.isAuthenticated()) {
    //         console.log("logged");
    //         //console.log(req.user);
    //         return next();
    //     }
    //     console.log("not loged in");
    //     //console.log(req.user);
    //     res.redirect('/');
    // }, function (req, res) {


    //     var newPoll = new Polls();

        
    //     newPoll.pollName = req.body.pollName;
    //     newPoll.labels = req.body.labels;
    //     var arrayLabel = req.body.labels;

    //     var newDataSet = [];

    //     arrayLabel.forEach(function () {
    //         newDataSet.push(0);
    //     });


    //     newPoll.dataset = newDataSet;

    //     newPoll.userId = req.user._id;
    //     newPoll.unix = Date.now();
        

    //     // save the user
    //     newPoll.save();

    //     res.send(newPoll);


}