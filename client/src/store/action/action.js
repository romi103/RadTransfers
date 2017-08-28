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
             //getting assigned driver data
            let assignedDriverId = booking.assignedDriver
            let driversState = getState().drivers; 
            let driverData = driversState.filter((driver) => {
                return driver._id == assignedDriverId
            })

           $.post('/confirm/', { booking: booking, driver: driverData })
                .done(() =>{
                    dispatch(confirmBooking(booking._id));
                    dispatch(driverConfirmedEmailReset());
                    dispatch(bookingConfirmedEmailReset());
                    alert("Conformation email sent.")
            })
                .fail((err) => {
                    alert("An error occured. Please contact support", err);
            })           
            }
    
}

export const confirmBooking = (id) => {
    
    return {
        type: 'CONFIRM_BOOKING',
        _id: id
    }
}

export const saveEditBooking = (booking) => {

    return (dispatch, getState) => {
         $.post('/saveeditbooking', booking)
            .done(() =>{
                dispatch(editBooking(booking));
            })
            .fail(() => {
                alert("An error occured. Please contact support")
            })
    }

}

export const editBooking = (booking) => {
    return {
        type: 'EDIT_BOOKING_STATE',
        booking
    }
}

//sart editing booking
 export const startEditBooking = (booking) => {
    return {
        type: 'EDITING_BOOKING',
        editingBooking: true,
        showNewBookingModal: true,
        booking
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

          //getting assigned driver data
            let assignedDriverId = booking.assignedDriver
            let driversState = getState().drivers; 
            let driverData = driversState.filter((driver) => {
                return driver._id == assignedDriverId
            })


         $.post('/cancelbooking', { booking: booking, driver: driverData  })
            .done(() =>{
           dispatch(cancelBooking(booking._id));
           alert("Cancelation email sent.");
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
        showNewBookingModal: false, 
        editingBooking: false,
        bookingBeingEdited: null
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
            $.get('/removedriver/' + driver._id)
                .done(() =>{
                dispatch(removeDriver(driver._id));
            })
                .fail(() => {
                alert("An error occured. Please contact support");
            })
       
    }
}

export const removeDriver = (id) => {
    return {
        type: 'REMOVE_DRIVER',
        _id: id
    }
}




