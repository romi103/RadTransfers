import {Main} from './Main.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';


const  mapStateToProps = (state) => {
    return ({
        loadingStatus: state.loadingStatus

    })
}

export const MainContainer = connect(
    mapStateToProps
)(Main);