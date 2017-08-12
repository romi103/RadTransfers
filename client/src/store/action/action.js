import uuidV1 from 'uuid/v1';
// import sentEmail from 'SendConf';
 
import React, { Component } from 'react';
import $ from 'jquery';
// import { pdfCreator } from '../../emailAPI/pdfCreator.js';
// import mailcomposer from 'mailcomposer';
// var pdfMake = require("pdfmake");
// import mailgun from 'mailgun-js';


export const saveBooking = (booking) => {

    return (dispatch, getState) => {

        let currentState = getState();
        let bookingsNumber = currentState.bookings.length + 1;
        let bookingOrederNo = bookingsNumber++;
        // booking order to keep them in chronological order
        let bookingMod = {...booking, 
            confirmed: false,
            cancelled: false,
            _id: uuidV1(),
            bookingOrederNo: bookingOrederNo
        }

       $.post('/newbooking', bookingMod)
       .done(() =>{
           dispatch(addBooking(bookingMod))
            })
        .fail(() => {
                alert("An error occured. Please contact support")
            })
    
    }
}


export const addBooking = (booking) => {
     return {
                type: 'ADD_BOOKING',
                booking: booking
            }
}
// -----------Booking confiration
export const confirmBookingSave = (booking) => {
    return (dispatch, getState) => {
           $.get('/confirm/' + booking.email)
       .done(() =>{
            dispatch(confirmBooking(booking._id));
       })
        .fail((err) => {
            alert("An error occured. Please contact support", err);
        })
        // let confirm = new Promise((resolve, reject) => {

        //     //getting assigned driver data
        //     let assignedDriverId = booking.assignedDriver
        //     let driversState = getState().drivers; 
        //     let driverData = driversState.filter((driver) => {
        //         return driver._id == assignedDriverId
        //     })
            
        //     dispatch(driverBeingConfirmedId(booking.assignedDriver));
        //     dispatch(bookingBeingConfirmedId(booking._id));

        
        //         // var pdf = pdfMake.createPdf(pdfCreator(booking, driverData));
        //         // var pdf = pdfMake.createPdf(pdfCreator(booking, driverData));
        //         // pdf.getBase64((data) => {
        //         //     {/*fs.writeFile('test.pdf', buffer, function (err) {
        //         //     if (err) throw err;
        //         //     console.log('file saved');
        //         //     });*/}
                
        //         //     //console.log('file saved', pdf);
        //         //     if(data) {
        //                 resolve();
        //         //     }
        //         // });
           
        // }).then(() => {
        //     //FIXME: ERROR in ./~/react-html-email/lib/injectReactEmailAttributes.js Module not found: Error: Cannot resolve module 'react/lib/DOMProperty' 
        //     // const emailHTML =  renderEmail(<ConfirmEmailCustomer booking={data.booking} driver={data.driverData} />)

 
        //     var mailgun = require('mailgun-js')({apiKey: keys.apiKey, domain: keys.domain});
            
        //     var data = {
        //     from: 'Excited User <me@samples.mailgun.org>',
        //     to: 'romaan.lorent@gmail.com',
        //     subject: 'Hello',
        //     text: 'Testing some Mailgun awesomness!'
        //     };
            
        //     mailgun.messages().send(data, function (error, body) {
        //     console.log(body);
        //     });

            // const mailgunConfig = mailgun({
            //     apiKey: keys.apiKey,
            //     domain: keys.domain
            // });

            // const mail = mailcomposer({
            //     from: 'you@samples.mailgun.org',
            //     to: 'romaan.lorent@gmail.com',
            //     subject: 'Booking conforamtion. Reference No. ',
            //     text: 'Test email text',
            //     html: "<p>Test</p>",
            //     // attachments: [{
            //     //     filename: 'booking' + data.booking.refn +'.pdf',
            //     //     content: data.data,
            //     //     encoding: 'base64'
            //     // }]
            // });

            // mail.build(function (mailBuildError, message) {

            //     var dataToSend = {
            //         to: 'romaan.lorent@gmail.com',
            //         message: message.toString('ascii')
            //     };

            //     mailgunConfig.messages().sendMime(dataToSend, function (sendError, body) {
            //         if (sendError) {
            //             alert('An error occured', sendError)
            //             console.log(sendError);
            //             return;
            //         } else {
            //             dispatch(driverConfirmedEmailReset());
            //             dispatch(bookingConfirmedEmailReset());
            //             alert("The email has been sent!");
                        
            //         }
            //     });
            // });


            //ipcRenderer.send('confirmBooking', booking);
           
            }
    
}

export const confirmBooking = (id) => {
    
    return {
        type: 'CONFIRM_BOOKING',
        _id: id
    }
}

export const driverBeingConfirmedId = (assigned_driver_Id) => {
    return {
        type: 'DRIVER_BEING_CONFIRMED',
        _id: assigned_driver_Id
    }
}

export const driverConfirmedEmailReset= () => {
    return {
        type: 'DRIVER_BEING_CONFIRMED_RESET'

    }
}

export const bookingBeingConfirmedId = (booking_Id) => {
    return {
        type: 'BOOKING_BEING_CONFIRMED',
        _id: booking_Id
    }
}


export const bookingConfirmedEmailReset= () => {
    return {
        type: 'BOOKING_BEING_CONFIRMED_RESET'

    }
}


// ---------- Booking cancelation
export const cancelBookingSave = (booking) => {
    return (dispatch, getState) => {
         $.get('/cancelbooking/' + booking._id)
       .done(() =>{
           dispatch(cancelBooking(booking._id));
       })
        .fail(() => {
            alert("An error occured. Please contact support");
        })
    }
}

export const cancelBooking = (id) => {
    return {
        type: 'CANCEL_BOOKNG',
        _id: id
    }
}

// ---------- Booking removal
export const removeBookingSave = (booking) => {
    return (dispatch, getState) => {
        $.get('/removebooking/' + booking._id)
       .done(() =>{
           dispatch(removeBooking(booking._id));
       })
        .fail(() => {
            alert("An error occured. Please contact support");
        })
        
    }
}

export const removeBooking = (id) => {
    return {
        type: 'REMOVE_BOOKNG',
        _id: id
    }
}


// -----------initiating booking load from database
export const getInitialState = () => {
    return (dispatch, getState) => {

        let fetchData = new Promise((resolve, reject) => {
        $.get("/getbookings", (bookings) =>{
            console.log(bookings);
            resolve(bookings);
        })
        }).then((bookings) => {
            dispatch(setInitialState(bookings));
        })
    }
}

export const setInitialState = (bookings) => {
    return {
        type: 'SET_INITIAL_STATE',
        bookings
    }
} 

// ---- hiding new booking modal
export const showNewBookingModal = () => {
    return {
        type: 'SHOW_MODAL_BOOKING',
        showNewBookingModal: true 
    }
}

export const hideNewBookingModal = () => {
    return {
        type: 'HIDE_MODAL_BOOKING',
        showNewBookingModal: false
    }
}

export const showDriverModal = () => {
    return {
        type: 'SHOW_MODAL_DRIVERS',
        showDriverModal: true 
    }
}

export const hideDriverModal = () => {
    return {
        type: 'HIDE_MODAL_DRIVERS',
        showDriverModal: false,
        editingDriver: false,
        driverBeingEdited: null
    }
}



//--------- drivers - action
export const fetchDrivers = () => {
    return (dispatch, getState) => {
            $.get('/getdrivers')
            .done((drivers) => {
                    dispatch(setInitialDrivers(drivers));
                })
            .fail(() => {
            alert("An error occured. Please contact support");
        })
    }
}

export const setInitialDrivers = (drivers) => {
    return {
        type: 'SET_INITIAL_DRIVERS',
        drivers
    }
} 



export const saveDriver = (driver) => {

    return (dispatch, getState) => {
        var driverMod = {
            ...driver,
            _id: uuidV1()
        }
        $.post('/savedriver', driverMod)
            .done(() =>{
                dispatch(addDriver(driverMod))
            })
            .fail(() => {
                alert("An error occured. Please contact support")
            })
    }

}

export const saveEditDriver = (driver) => {

    return (dispatch, getState) => {
         $.post('/saveeditdriver', driver)
            .done(() =>{
                dispatch(editDriver(driver));
            })
            .fail(() => {
                alert("An error occured. Please contact support")
            })
    }

}

export const editDriver = (driver) => {
    return {
        type: 'EDIT_DRIVER_STATE',
        driver
    }
}

export const addDriver = (driver) => {
    return {
        type: 'ADD_DRIVER',
        driver
    }
}

export const startEditDriver = (driver) => {
    return {
        type: 'EDITING_DRIVER',
        editingDriver: true,
        showDriverModal: true,
        driver
    }
}

export const removeDriverSave = (driver) => {
    return (dispatch, getState) => {
        // ipcRenderer.send('removeDriver', driver);
        dispatch(removeDriver(driver._id));
    }
}

export const removeDriver = (id) => {
    return {
        type: 'REMOVE_DRIVER',
        _id: id
    }
}




