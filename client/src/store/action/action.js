import uuidV1 from 'uuid/v1';
// import sentEmail from 'SendConf';
 
import React, { Component } from 'react';
import $ from 'jquery';
import { getAccessToken } from '../../auth/auth.js';
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
        dispatch(loadingStart());
       $.post(
        {
            url: '/newbooking',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, bookingMod)
       .done(() =>{
           dispatch(addBooking(bookingMod))
           dispatch(loadingStop());
            })
        .fail((err) => {
                dispatch(loadingStop());
                dispatch(errorShow(err.status, err.statusText));
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
            dispatch(loadingStart());
           $.post({
            url: '/confirm/',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, { booking: booking, driver: driverData })
                .done(() =>{
                    dispatch(confirmBooking(booking._id));
                    dispatch(driverConfirmedEmailReset());
                    dispatch(bookingConfirmedEmailReset());
                    dispatch(loadingStop());
                    alert("Conformation email sent.")
            })
                .fail((err) => {
                    dispatch(loadingStop());
                    dispatch(errorShow(err.status, err.statusText));
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
        dispatch(loadingStart());
         $.post({
            url: '/saveeditbooking',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, booking)
            .done(() =>{
                dispatch(editBooking(booking));
                dispatch(loadingStop());
            })
            .fail((err) => {
                dispatch(loadingStop());
                dispatch(errorShow(err.status, err.statusText));
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
            


            dispatch(loadingStart());
         $.post({
            url: '/cancelbooking/',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, { booking: booking, driver: driverData  })
            .done(() =>{
                dispatch(cancelBooking(booking._id));
                dispatch(loadingStop());
                alert("Cancelation email sent.");
        })
        .fail((err) => {
            dispatch(loadingStop());
            dispatch(errorShow(err.status, err.statusText));
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
        dispatch(loadingStart());
        $.get({
            url: '/removebooking/' + booking._id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        })
       .done(() =>{
           dispatch(removeBooking(booking._id));
           dispatch(loadingStop());
       })
        .fail((err) => {
            dispatch(loadingStop());
            dispatch(errorShow(err.status, err.statusText));
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

        dispatch(loadingStart());
        $.get({
            url: '/getbookings',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        })
        .done((bookings) => {
            dispatch(loadingStop());
            dispatch(setInitialState(bookings));
            
        })
        .fail((err) => {
            dispatch(loadingStop());
            dispatch(errorShow(err.status, err.statusText));
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
            dispatch(loadingStart());
            $.get({
                url: '/getdrivers',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
                }
            })
            .done((drivers) => {
                    dispatch(setInitialDrivers(drivers));
                    dispatch(loadingStop());
                    
                })
            .fail((err) => {
            dispatch(loadingStop());
            dispatch(errorShow(err.status, err.statusText));
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
        dispatch(loadingStart());
        $.post({
            url: '/savedriver',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, driverMod)
            .done(() =>{
                dispatch(addDriver(driverMod))
                dispatch(loadingStop());
            })
            .fail((err) => {
                dispatch(loadingStop());
                dispatch(errorShow(err.status, err.statusText));
            })
    }

}

export const saveEditDriver = (driver) => {

    return (dispatch, getState) => {
        dispatch(loadingStart());
         $.post({
            url: '/saveeditdriver',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`);
            }
        }, driver)
            .done(() =>{
                dispatch(editDriver(driver));
                dispatch(loadingStop());
            })
            .fail((err) => {
                dispatch(loadingStop());
                dispatch(errorShow(err.status, err.statusText));
            })
    }

}

export const errorShow = (status, statusText) => {
    return {
        type: 'ERROR_SHOW',
        status,
        statusText,
        show: true
    }
}

export const errorHide = () => {
    return {
        type: 'ERROR_HIDE',
        status: null,
        statusText: null,
        show: false 
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
            dispatch(loadingStart());
            $.get('/removedriver/' + driver._id)
                .done(() =>{
                dispatch(removeDriver(driver._id));
                dispatch(loadingStop());
            })
                .fail((err) => {
                dispatch(loadingStop());
                dispatch(errorShow(err.status, err.statusText));
            })
       
    }
}

export const removeDriver = (id) => {
    return {
        type: 'REMOVE_DRIVER',
        _id: id
    }
}

export const loadingStart = () => {
    return {
        type: 'LOADING_START',
        loading: true
    }
}

export const loadingStop = () => {
    return {
        type: 'LOADING_STOP',
        loading: false
    }
}


