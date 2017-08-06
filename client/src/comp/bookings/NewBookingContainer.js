import { NewBooking } from './NewBooking.js';
import React, { Component } from 'react';
import { saveBooking, showNewBookingModal, hideNewBookingModal} from '../../store/action/action.js';
import { connect } from 'react-redux'



const mapDispatchToProps = (dispatch) => {
    return ({
        handleTheSubmit: (booking) => {
            dispatch(saveBooking(booking));
            

        }, 

        showTheModal: () => {
            dispatch(showNewBookingModal());
        },

        hideTheModal: () => {
            dispatch(hideNewBookingModal());
        }
    })
}


const  mapStateToProps = (state) => {
    return {drivers: state.drivers
           
        }
}

export const NewBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewBooking);