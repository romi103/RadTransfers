import React, { Component } from 'react';
import {DriversTabelContainer} from './DriversTabelContainer.js';




export default class Drivers extends Component {

    render() {
        return (
            <div className="well">
                <h1>Drivers</h1>
                <DriversTabelContainer/>
            </div>
        );
    }
}

