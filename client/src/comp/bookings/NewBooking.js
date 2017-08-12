import React, { Component } from 'react';
import { addBooking, getDrivers} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { Modal, Button, FieldGroup } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import {InputText} from '../layout/InputText.js';




export class NewBooking extends Component {

    constructor(props) {  
        super(props);
        this.state = {
            booking: {
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
                email: 'romanlorent@gmail.com',
                assignedDriver: '',
                fairNumber: ''
            }
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
            currentSate.booking.assignedDriver = driverId;
            currentSate.booking.driverId = driverName;
            currentSate.booking.fairNumber = driverFairNumber;
            return this.setState(currentSate);
        };
    }

    // handleChangeDriver
    
    handleSubmit (event) {
        event.preventDefault();
        this.props.handleTheSubmit(this.state.booking);
        this.hideModal();
    }

    hideModal() {
        this.props.hideTheModal()
    }

    getDataValue = (event) => {
        let currentSate = this.state;
        let key = event.target.dataset.additional; 
            currentSate.booking[key] = event.target.value
            return this.setState(currentSate);
    }

    validateInput = (value) => {
        
        console.log("validating from the parent component. Value: ", value)
        //it can return value to child component validation
        return false;
    }

    render(){

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
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='date'
                            idAttr='date'
                            label="Date:"
                            required={true}
                            type="date"
                            
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='predate'
                            idAttr='PreBookedDate'
                            label="Pre Booked Date:"
                            type="date"
                            required={true}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='time'
                            idAttr='TimeOfColection'
                            label="Time of Colection:"
                            type="time"
                            required={true}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='name'
                            idAttr='NameOfPassanger'
                            label="Name of Passanger:"
                            type="text"
                            required={true}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='email'
                            idAttr='emailOfPassanger'
                            label="Email of Passanger:"
                            type="email"
                            required={true}
                            value={this.state.booking.email}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='pickup'
                            idAttr='PickUp'
                            label="Pick up Address:"
                            type="text"
                            required={true}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            additinalData='destination'
                            idAttr='Destination'
                            label="Destination:"
                            type="text"
                            required={true}
                            />

                        <div>
                            <label htmlFor='DriverNumber'>Driver:</label>
                            <select id='DriverNumber' value={this.state.booking.driverId} onChange={this.handleChangeDriver('driverId')}>
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

                    <Button className="buttonForm" type='submit' onClick={this.handleSubmit}>Submit</Button>
                    <Button className="buttonForm" onClick={this.hideModal}>Close</Button>
                </form>
            </div>
        );
    }
};


