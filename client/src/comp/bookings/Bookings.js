import React, { Component } from 'react';
// import BookingTable from 'BookingTable';
import { BookingTableContainer } from './BookingTableContainer.js';
import {isLoggedIn,  login} from '../../auth/auth.js'

export default class Bookings extends Component {

    componentDidMount() {
        if(!isLoggedIn()) {
            login();
        }
    }


    render() {
    
    
        return (
            <div className="well">
                <h1>Bookings</h1>
                 <BookingTableContainer/> 
            </div>
        );
    }
};