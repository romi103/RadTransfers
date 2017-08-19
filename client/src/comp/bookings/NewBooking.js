import React, { Component } from 'react';
import { addBooking, getDrivers, hideNewBookingModal} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { Modal, Button, FieldGroup } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import {InputText} from '../layout/InputText.js';
import $ from 'jquery';




export class NewBooking extends Component {

    constructor(props) {  
        super(props);
        this.state = {
                _id: '',
                refno: '',
                date: '',
                predate: '',
                time: '',
                name: '',
                pickup: '',
                destination: '',
                driverId: '',
                remarks: `Flight No:\nNumber of Passangers:\n`,
                confirmed: '',
                cancelled: '',
                email: '',
                assignedDriver: '',
                fairNumber: ''
        }

        this.handleChangeDriver = this.handleChangeDriver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    

    handleChangeDriver(key) {
        return (event) => {
            let driverInfo = event.target.selectedOptions[0].dataset.driverinfo;
            let driverInfoArr = driverInfo.split("::");
            let driverId = driverInfoArr[0];
            let driverFairNumber = driverInfoArr[1];
            let driverName = event.target.value
            let currentSate = this.state;
            currentSate.assignedDriver = driverId;
            currentSate.driverId = driverName;
            currentSate.fairNumber = driverFairNumber;
            return this.setState(currentSate);
        };
    }

    componentWillMount() {
        const { editingBooking, bookingBeingEdited} = this.props.modal
        if (editingBooking) {
            console.log('form state', bookingBeingEdited )
            this.setState(bookingBeingEdited);
        }
    }

    // handleChangeDriver
    handleSubmit (event) {
        
        event.preventDefault();
        this.props.handleTheSubmit(this.state);
        this.hideModal();
    }

     handleSubmitEdit = (event) => {
        event.preventDefault();

        this.props.handleTheSubmitEdit(this.state);
        this.hideModal();
    }

    hideModal() {
        this.props.dispatch(hideNewBookingModal());
     }

    getDataValue = (event) => {
        let currentSate = this.state;
        let key = event.target.dataset.additional; 
            currentSate[key] = event.target.value
            return this.setState(currentSate);
    }

    validateInput = (value) => {


        
        console.log("validating from the parent component. Value: ", value)
        //it can return value to child component validation
        return false;
    }

    render(){

        const { editingBooking} = this.props.modal

        return (
            <div>
                
                <form>
                    <fieldset>
                        <legend>New Booking</legend>
                         <InputText 
                            onChange={this.getDataValue}
                            additinalData='refno'
                            idAttr='refno'
                            label="Reference Number:"
                            type="text"
                            required={true}
                            value={this.state.refno}
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='date'
                            idAttr='date'
                            label="Date:"
                            required={true}
                            type="date"
                            value={this.state.date}
                            
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='predate'
                            idAttr='PreBookedDate'
                            label="Pre Booked Date:"
                            type="date"
                            required={true}
                            value={this.state.predate}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='time'
                            idAttr='TimeOfColection'
                            label="Time of Colection:"
                            type="time"
                            required={true}
                            value={this.state.time}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='name'
                            idAttr='NameOfPassanger'
                            label="Name of Passanger:"
                            type="text"
                            required={true}
                            value={this.state.name}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='email'
                            idAttr='emailOfPassanger'
                            label="Email of Passanger:"
                            type="email"
                            required={true}
                            value={this.state.email}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='pickup'
                            idAttr='PickUp'
                            label="Pick up Address:"
                            type="text"
                            required={true}
                            value={this.state.pickup}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='destination'
                            idAttr='Destination'
                            label="Destination:"
                            type="text"
                            required={true}
                            value={this.state.destination}
                            />

                        <div>
                            <label htmlFor='DriverNumber'>Driver:</label>
                            <select id='DriverNumber' value={this.state.driverId} onChange={this.handleChangeDriver('driverId')}>
                                <option>Select driver</option>
                                {this.props.drivers.map((driver) => {
                                return (
                                    <option key={driver._id} data-driverInfo={driver._id + '::' + driver.fairNumber} value={driver.name + " " + driver.surname}>{driver.name} {driver.surname}</option>
                                ) 
                                })} 
                            </select>
                        </div>

                        {/* <div>
                            <label htmlFor='Remarks'>Remarks:</label>
                            <textarea id='Remarks' value={this.state.booking.remarks} onChange={this.handleChange('remarks')} />
                                
                        </div> */}

                    </fieldset>

                    <Button className="buttonForm" type='submit' onClick={editingBooking ? this.handleSubmitEdit : this.handleSubmit }>Submit</Button>
                    <Button className="buttonForm" onClick={this.hideModal}>Close</Button>
                </form>
                <script>
                    {console.log("test 11111")}
                </script>
            </div>
        );
    }
};


