import { NewBooking } from './NewBooking.js';
import React, { Component } from 'react';
import { saveBooking, showNewBookingModal, hideNewBookingModal, saveEditBooking} from '../../store/action/action.js';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';



const mapDispatchToProps = (dispatch) => {
            const boundActionCreators = bindActionCreators({
                handleTheSubmitEdit: saveEditBooking,
                handleTheSubmit: saveBooking,
                showTheModal: showNewBookingModal,
                hideTheModal: hideNewBookingModal
        }, dispatch);
        const allActionProps = { ...boundActionCreators, dispatch }
    return allActionProps;
}


const  mapStateToProps = (state) => {
    return {
        drivers: state.drivers,
        modal: state.modal
           
    }
}

export const NewBookingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewBooking);