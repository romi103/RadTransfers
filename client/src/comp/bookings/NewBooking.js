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
                fairNumber: '',
        }
        
        //*******************************/
        //error object
        //*******************************/
        this.errors = {
                
                _id: null,
                refno: null,
                date: null,
                predate: null,
                time: null,
                name: null,
                pickup: null,
                destination: null,
                driverId: null,
                remarks: null,
                confirmed: null,
                cancelled: null,
                email: null,
                assignedDriver: null,
                fairNumber: null
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
            this.setState(bookingBeingEdited);
        }
    }

    canBeSubmitted = () => {
        const errors = this.errors;
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled
    }

    // handleChangeDriver
    handleSubmit (event) {
        event.preventDefault();
        if (this.canBeSubmitted()) {
            return;
        }
        console.log('disabled',this.canBeSubmitted());

        this.props.handleTheSubmit({
                _id: this.state._id,
                refno: this.state.refno,
                date: this.state.date,
                predate: this.state.predate,
                time: this.state.time,
                name: this.state.name,
                pickup: this.state.pickup,
                destination: this.state.destination,
                driverId: this.state.driverId,
                remarks: this.state.remarks,
                confirmed: this.state.confirmed,
                cancelled: this.state.cancelled,
                email: this.state.email,
                assignedDriver: this.state.assignedDriver,
                fairNumber: this.state.fairNumber,
        });
        this.hideModal();
    }

     handleSubmitEdit = (event) => {
        event.preventDefault();
        this.props.handleTheSubmitEdit({
                _id: this.state._id,
                refno: this.state.refno,
                date: this.state.date,
                predate: this.state.predate,
                time: this.state.time,
                name: this.state.name,
                pickup: this.state.pickup,
                destination: this.state.destination,
                driverId: this.state.driverId,
                remarks: this.state.remarks,
                confirmed: this.state.confirmed,
                cancelled: this.state.cancelled,
                email: this.state.email,
                assignedDriver: this.state.assignedDriver,
                fairNumber: this.state.fairNumber
        });
        this.hideModal();
    }

    hideModal() {
        this.props.dispatch(hideNewBookingModal());
     }

    getDataValue = (event) => {
        let key = event.target.dataset.additional; 
        this.setState({
                [key] : event.target.value
            });
    }
    //collects errors from inputs to this,error obj
    validateInput = (additinalData, isValid) => {
        this.errors[additinalData] = isValid
        console.log(this.errors);
    }

    render(){
        // const errors = this.errors;
        // const isDisabled = Object.keys(errors).some(x => errors[x])

        const { editingBooking} = this.props.modal

        return (
            <div>
                
                <form onSubmit={editingBooking ? this.handleSubmitEdit : this.handleSubmit }>
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
                            index={0}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='date'
                            idAttr='date'
                            label="Date:"
                            required={true}
                            type="date"
                            value={this.state.date}
                            index={1}
                            
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='predate'
                            idAttr='PreBookedDate'
                            label="Pre Booked Date:"
                            type="date"
                            required={true}
                            value={this.state.predate}
                            index={2}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='time'
                            idAttr='TimeOfColection'
                            label="Time of Colection:"
                            type="time"
                            required={true}
                            value={this.state.time}
                            index={3}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='name'
                            idAttr='NameOfPassanger'
                            label="Name of Passanger:"
                            type="text"
                            required={true}
                            value={this.state.name}
                            index={4}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='email'
                            idAttr='emailOfPassanger'
                            label="Email of Passanger:"
                            type="email"
                            required={true}
                            value={this.state.email}
                            index={5}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='pickup'
                            idAttr='PickUp'
                            label="Pick up Address:"
                            type="text"
                            required={true}
                            value={this.state.pickup}
                            index={6}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='destination'
                            idAttr='Destination'
                            label="Destination:"
                            type="text"
                            required={true}
                            value={this.state.destination}
                            index={7}
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

                    <Button className="buttonForm" type='submit'>Submit</Button>
                    <Button className="buttonForm"  onClick={this.hideModal}>Close</Button>
                </form>
            </div>
        );
    }
};


