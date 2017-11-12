import Main from './Main.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { errorHide } from '../../store/action/action.js';


const  mapStateToProps = (state) => {
    return ({
        loadingStatus: state.loadingStatus,
        errorStatus: state.errorStatus

    })
}

export const MainContainer = connect(
    mapStateToProps
)(Main);