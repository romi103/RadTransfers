import React, { Component } from 'react';
import {DriversTabelContainer} from './DriversTabelContainer.js';
import {isLoggedIn,  login} from '../../auth/auth.js'




export default class Drivers extends Component {

    componentDidMount() {
        if(!isLoggedIn()) {
            login();
        }
    }

    render() {
        return (
            <div className="well">
                <h1>Drivers</h1>
                <DriversTabelContainer/>
            </div>
        );
    }
}

