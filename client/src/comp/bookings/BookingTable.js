import React, { Component } from 'react';
import { getInitialState, showNewBookingModal} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { BookingRow }  from './BookingRow.js';
import { NewBookingContainer} from './NewBookingContainer.js';
// import  { Search }  from 'Search';

// import { , ButModalton, Table } from 'react-bootstrap';
import { DropdownButton, MenuItem, Button, Glyphicon, Table, Modal} from 'react-bootstrap';

//exporting data
import json2csv from 'json2csv';
import fs from 'fs';
// const {dialog} = require('electron').remote;
// import Button from 'react-bootstrap/lib/Button';
// import pdfMake from 'pdfmake/build/pdfmake';
// require('pdfmake/build/vfs_fonts.js');

const now = new Date();

const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear()+"-"+(month)+"-"+(day) ;



export default class BookingTable extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.state = {
            searchString: '',
            filteredTable: [],
            searchByDate: 'hide',
            searchByPreDate: 'hide',
            searchFrom: '',
            searchTo: today,
            advancedSearch: false,
            searchDateNow: true,

        }
    
    }

    showModal() {
          this.props.dispatch(showNewBookingModal())
    }

    saveFile = () => {
        const bookingData = this.props.bookings;

        

        // const path = dialog.showSaveDialog({
        //     title: 'Booking Export',
        //     filters: [
        //     {name: 'CSV', extensions: ['csv']}
        //     ]});

        // const csv = json2csv({ data: bookingData});
 
        //     fs.writeFile(path, csv, function(err) {
        //         if (err) throw err;
        //             console.log('file saved');
        //     });



    } 

    toggleNow = () => {
        let {searchDateNow} = this.state;
        
        this.setState({
            searchDateNow: searchDateNow ?  false : true,
            searchTo: searchDateNow ?  '' : today
        });
    }

    filterDateFrom = (event) => {
            if(event.target.value) {
                console.log(event.target.value)
                this.setState({
                    searchFrom: event.target.value
                })
                
            }
    }
        
    filterDateTo = (event) => {
            if(event.target.value) {
                console.log(event.target.value)
                this.setState({
                    searchTo: event.target.value
                })
            }
    }

    toggleAdvancedSearch = (searchBy) => {
        console.log(this.state.advancedSearch);
       var { searchByDate, searchByPreDate } = this.state;

       switch(searchBy) {
           case 'searchByDate':
             this.setState({
                searchByPreDate: 'hide',
                searchByDate: (searchByDate === 'show') ? 'hide' : 'show',
                advancedSearch: (searchByDate === 'show') ? false : true
                });
            break;

            case 'searchByPreDate':
                this.setState({
                searchByPreDate: (searchByPreDate === 'show') ? 'hide' : 'show',
                searchByDate: 'hide',
                advancedSearch: (searchByPreDate === 'show') ? false : true
            })
            break;
            default:
                this.setState({
                searchByPreDate: 'hide',
                searchByDate: 'hide'
            })

       } 
    }


        

    render() {

        var { bookings, dispatch, modal} = this.props;
        var { searchByDate, searchByPreDate, advancedSearch} = this.state;
        var searchString = this.state.searchString;
        searchString = searchString.toLowerCase().trim();

        //sorting bookings so that newest goes at the top of the booking table 
        const sortedBookings = bookings.sort((a, b) => {
          return b.bookingOrederNo - a.bookingOrederNo;
        })


        const basicfilteredBookings = sortedBookings.filter(booking => {
            
            if (searchString == '') {
                return true;
            } else if (booking.refno.toLowerCase().indexOf(searchString) != -1 || booking.name.toLowerCase().indexOf(searchString) != -1 || booking.date.toLowerCase().indexOf(searchString) != -1 || booking.destination.toLowerCase().indexOf(searchString) != -1 || booking.driverId.toLowerCase().indexOf(searchString) != -1 || booking.email.toLowerCase().indexOf(searchString) != -1 || booking.pickup.toLowerCase().indexOf(searchString) != -1 || booking.remarks.toLowerCase().indexOf(searchString) != -1) {
                return  true;
            }
        }).map(booking => {
            return <BookingRow key={booking._id} booking={booking} dispatch={dispatch} /> 
        })

         const datefilteredBookings = sortedBookings.filter(booking => {
            let bookingDate = new Date(booking.date).getTime();
            let from = new Date(this.state.searchFrom).getTime();
            let to = new Date(this.state.searchTo).getTime();

            if ( from <= bookingDate && bookingDate <= to) {
                return true;
            } else {
                return false;
            }
        }).map(booking => {
            return <BookingRow key={booking._id} booking={booking} dispatch={dispatch} /> 
        })

        
        //decides whether to apply advanced search or basic one. 
        var filteredBookings = () => {
            if (this.state.advancedSearch) {
                return datefilteredBookings;
             } else {
                return basicfilteredBookings;
             }
        }
        
        
        return (

            <div>
                <div>
                    <Button bsStyle="primary" bsSize="large" onClick={this.saveFile}>Export Booking</Button>
                </div>
        
                 <Modal show={modal.showNewBookingModal}>
                     <NewBookingContainer/>
                </Modal> 
               
                <Button bsStyle="primary" bsSize="large" className="actionButton" onClick={this.showModal}>New Booking</Button>
                <hr/>
                
                <input type="text" id='searchTable' disabled={this.state.advancedSearch} placeholder={this.state.advancedSearch ? "Search by date active" : "Search"} value={this.state.searchString} onChange={(e) => {this.setState({ searchString: e.target.value})}} />
                
                 <Table bordered condensed>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reference No.</th>
                            <th>
                                    <div>
                                        <Glyphicon glyph={(searchByDate === 'hide')  ? "chevron-down" : "chevron-up"} onClick={() => {
                                        this.toggleAdvancedSearch("searchByDate")
                                        }}/>
                                    </div>
                                    <div className={this.state.searchByDate}>
                                        <div>From <input type="date" value={this.state.searchFrom} onChange={this.filterDateFrom}/></div>
                                        <div>To <input type="date" value={this.state.searchTo} disabled={this.state.searchDateNow} onChange={this.filterDateTo}/> Now <input type="checkbox" checked={this.state.searchDateNow} onChange={this.toggleNow}/></div>
                                    </div>
                                Date</th>
                            <th>
                                <div>
                                    <Glyphicon glyph={(searchByPreDate === 'hide')  ? "chevron-down" : "chevron-up"} onClick={() => {
                                        this.toggleAdvancedSearch("searchByPreDate")
                                    }}/>
                                </div>

                                    <div className={this.state.searchByPreDate}>
                                        <div>From <input type="date" value={this.state.searchFrom} onChange={this.filterDateFrom}/></div>
                                        <div>To <input type="date" value={this.state.searchTo} disabled={this.state.searchDateNow} onChange={this.filterDateTo}/> Now <input type="checkbox" checked={this.state.searchDateNow} onChange={this.toggleNow}/></div>
                                    </div>
                                Pre booked date</th>
                            <th>Time of colection</th>
                            <th>Name of passenger</th>
                            <th>Passenger Email</th>
                            <th>Pick-up address</th>
                            <th>Destination</th>
                            <th>Driver number</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings()}
                    </tbody>
                 </Table>
            </div>
        );
    }
};



