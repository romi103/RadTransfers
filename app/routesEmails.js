module.exports = function (app, jwtCheck) {

//const keys = require('./keys/emailKeys.js');
const mailgun = require('mailgun-js');
const ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var pdfCreator = require('./emailAPI/pdfCreator.js');
var PdfPrinter = require('pdfmake/src/printer');
var mailcomposer = require('mailcomposer');
var juice = require('juice');

var Bookings = require('./models/newbooking.js')
    
// Send a message to the specified email address 
app.post('/confirm', jwtCheck, function(req,res,next) {

var fonts = {
	Roboto: {
		normal: './Roboto-Regular.ttf',
		bold: './Roboto-Medium.ttf'
	}
};

    var bookingObj = req.body.booking;
    var driverObj = req.body.driver;
    
    
    var booking = {
            bookingOrederNo: bookingObj.bookingOrederNo,
            fairNumber: bookingObj.fairNumber,
            assignedDriver: bookingObj.assignedDriver,
            email: bookingObj.email,
            cancelled: bookingObj.cancelled,
            confirmed: bookingObj.confirmed,
            remarks: bookingObj.remarks,
            driverId: bookingObj.driverId,
            destination: bookingObj.destination,
            pickup: bookingObj.pickup,
            name: bookingObj.name,
            time: bookingObj.time,
            predate: bookingObj.predate,
            date: bookingObj.date,
            refno: bookingObj.refno
    }

//creates pdf attachment
    var printer = new PdfPrinter(fonts);
    var pdfDoc = printer.createPdfKitDocument(pdfCreator(bookingObj, driverObj));
    pdfDoc.end();

    //reads email template
    var templateString = null;
    var templateString = fs.readFileSync(__dirname + '/emailAPI/emailConfirm.ejs', 'utf-8');
    
    
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    const mailgunConfig = mailgun({apiKey: process.env.EMAIL_KEY, domain: process.env.EMAIL_DOMAIN});

     const mail = mailcomposer({
                from: 'you@samples.mailgun.org',
                to: bookingObj.email,
                subject: 'Booking conforamtion. Reference No. ',
                text:  'Rad\'sTansfers',
                html: juice(ejs.render(templateString, booking)),
                attachments: [{
                    filename: 'booking' + bookingObj.refno + '.pdf',
                    content: pdfDoc
                    // encoding: 'base64'
                }]
            });

     mail.build(function (mailBuildError, message) {

                var dataToSend = {
                    to: bookingObj.email,
                    message: message.toString('ascii')
                };

                mailgunConfig.messages().sendMime(dataToSend, function (sendError, body) {
                    if (sendError) {
                        alert('An error occured', sendError)
                        console.log(sendError);
                        return;
                    } else {


                         Bookings.findByIdAndUpdate({
                            "_id": bookingObj._id
                            }, { $set: {confirmed: true, cancelled: false}}, { new: true }, function (err, booking) {
                                if (err) return handleError(err);
                                res.send(booking);
                         });
                        console.log("The email has been sent!");
                    }
                });
            });
});

      // =====================================
    // CANCEL BOOKING ===============
    // =====================================
     app.post('/cancelbooking', jwtCheck, function (req, res) {

        var fonts = {
            Roboto: {
            normal: './Roboto-Regular.ttf',
            bold: './Roboto-Medium.ttf'
            }
        };

    var bookingObj = req.body.booking;
    var driverObj = req.body.driver;

    var booking = {
            bookingOrederNo: bookingObj.bookingOrederNo,
            fairNumber: bookingObj.fairNumber,
            assignedDriver: bookingObj.assignedDriver,
            email: bookingObj.email,
            cancelled: bookingObj.cancelled,
            confirmed: bookingObj.confirmed,
            remarks: bookingObj.remarks,
            driverId: bookingObj.driverId,
            destination: bookingObj.destination,
            pickup: bookingObj.pickup,
            name: bookingObj.name,
            time: bookingObj.time,
            predate: bookingObj.predate,
            date: bookingObj.date,
            refno: bookingObj.refno
    }
    

    //reads email template
    var templateString = null;
    var templateString = fs.readFileSync(__dirname + '/emailAPI/emailCancel.ejs', 'utf-8');
    
    
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    const mailgunConfig = mailgun({apiKey: keys.apiKey, domain: keys.domain});

     const mail = mailcomposer({
                from: 'you@samples.mailgun.org',
                to: bookingObj.email,
                subject: 'Booking cancelation',
                text:  'Rad\'sTansfers',
                html: juice(ejs.render(templateString, booking)),
            });

     mail.build(function (mailBuildError, message) {

                var dataToSend = {
                    to: bookingObj.email,
                    message: message.toString('ascii')
                };

                mailgunConfig.messages().sendMime(dataToSend, function (sendError, body) {
                    if (sendError) {
                        alert('An error occured', sendError)
                        console.log(sendError);
                        return;
                    } else {

                         Bookings.findByIdAndUpdate({
                            "_id": bookingObj._id
                         }, { $set: {confirmed: false, cancelled: true}}, { new: true }, function (err, booking) {
                            if (err) return handleError(err);
                                 res.send(booking);
                            });
                        console.log("Cancel email has been sent!");
                    }
                });
            });

        // ----
    
        
    });



}