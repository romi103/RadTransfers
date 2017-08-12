module.exports = function (app) {

const keys = require('./keys/emailKeys.js');
const Mailgun = require('mailgun-js');
    
// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
app.get('/confirm/:email', function(req,res,next) {

    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: keys.apiKey, domain: keys.domain});

    var data = {
    //Specify email data
      from: 'romaan.lorent@gmail.com',
    //The email to contact
      to: req.params.email,
    //Subject and text data  
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.email + '">Click here to add your email address to a mailing list</a>'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        } else {
            console.log("email sent");
        }
        
    });

});

}