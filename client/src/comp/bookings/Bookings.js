import React, { Component } from 'react';
// import BookingTable from 'BookingTable';
import { BookingTableContainer } from './BookingTableContainer.js';

export default class Bookings extends Component {

    render() {

    
        return (
            <div className="well">
                <h1>Bookings</h1>
                 <BookingTableContainer/> 
            </div>
        );
    }
};