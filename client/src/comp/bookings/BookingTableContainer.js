import  BookingTable from './BookingTable.js';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { addBooking, showNewBookingModal } from '../../store/action/action.js';
import { connect} from 'react-redux'


const mapDispatchToProps = (dispatch) => {
    // const boundActionCreators = bindActionCreators(showNewBookingModal, dispatch);
    // const allActionProps = { ...boundActionCreators, dispatch }
    // return allActionProps;

    const boundActionCreators = bindActionCreators({ showTheModal: showNewBookingModal }, dispatch);
    const allActionProps = { ...boundActionCreators, dispatch }
    return allActionProps;

    // return (
    //     bindActionCreators(
    //         { showTheModal: showNewBookingModal},
    //         dispatch
    //     )
    // );

    // return ({
    //     showTheModal: () => {
    //         dispatch(showNewBookingModal());

    //     }
    // })
}


const  mapStateToProps = (state) => {
    return ({
        bookings: state.bookings,
        modal: state.modal
    })
}

export const BookingTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingTable);