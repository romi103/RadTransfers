import { DriverForm } from 'DriverForm';
import React, { Component } from 'react';
// import { saveEditDriver, saveDriver, getDrivers, showNewBookingModal, hideNewBookingModal } from 'Actions';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ConfirmEmailCustomer } from 'emailTemplates';



// const mapDispatchToProps = (dispatch) => {

// //         const boundActionCreators = bindActionCreators({ 
// //             handleTheSubmit: saveDriver, 
// //             handleTheSubmitEdit: saveEditDriver
// //         }, dispatch);
// //         const allActionProps = { ...boundActionCreators, dispatch }
// //     return allActionProps;

// // }

const getConfirmedBooking = (bookings, booking_id) => {
      return bookings.filter((booking) => {
         return booking._id == booking_id;
        })
  }


const getConfirmedDriver = (drivers, driver_id) => {
    return drivers.filter((driver) => {
         return driver._id == driver_id;
        })
  }



const mapStateToProps = (state) => {
    return {
        driver: getConfirmedDriver(state.drivers, state.confirmBokingState.driverBeingConfirmed),
        booking: getConfirmedBooking(state.bookings, state.confirmBokingState.bookingBeingConfirmed)

    }
}

export const emailTemplatesContainer = connect(
    mapStateToProps
)(ConfirmEmailCustomer);