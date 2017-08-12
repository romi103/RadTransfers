import {DriversTabel} from './DriversTabel.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrivers } from '../../store/action/action.js';


const  mapStateToProps = (state) => {
    return ({
        drivers: state.drivers,
        modal: state.modal
    })
}

export const DriversTabelContainer = connect(
    mapStateToProps
)(DriversTabel);
