import { DriverForm } from './DriverForm.js';
import React, { Component } from 'react';
import { saveEditDriver, saveDriver, getDrivers, showNewBookingModal, hideNewBookingModal } from '../../store/action/action.js';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';



const mapDispatchToProps = (dispatch) => {

        const boundActionCreators = bindActionCreators({ 
            handleTheSubmit: saveDriver, 
            handleTheSubmitEdit: saveEditDriver
        }, dispatch);
        const allActionProps = { ...boundActionCreators, dispatch }
    return allActionProps;

}


const mapStateToProps = (state) => {
    return {
        drivers: state.drivers,
        modal: state.modal

    }
}

export const DriverFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DriverForm);