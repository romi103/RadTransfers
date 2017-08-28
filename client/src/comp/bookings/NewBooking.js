import React, { Component } from 'react';
import { addBooking, getDrivers, hideNewBookingModal} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { Modal, Button, FieldGroup } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import {InputText} from '../layout/InputText.js';
import {SelectInput} from '../layout/SelectInput.js';
import {TextArea} from '../layout/TextArea.js';


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
        this.validInputs = {
            
                refno: null,
                date: null,
                predate: null,
                time: null,
                name: null,
                pickup: null,
                destination: null,
                email: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillMount() {
        const { editingBooking, bookingBeingEdited} = this.props.modal
        if (editingBooking) {
            this.setState(bookingBeingEdited);
        }
    }

    cannotBeSubmitted = () => {
        var validInputs = this.validInputs;
        var isDisabled = Object.keys(validInputs).some(x => validInputs[x])
        return !isDisabled
    }

    // handleChangeDriver
    handleSubmit (event) {
        event.preventDefault();
        if (this.cannotBeSubmitted()) {
            return;
        }

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
        let key = event.target.name; 
        this.setState({
                [key] : event.target.value
            });
    }

    getDataValueSelect = (event) => {
        //keys (properties to be updated) comes from name attribute of the selectInput component
        let selectInput = event.target;//
        let value = selectInput.value;//value of driverId
        let selectedOption = selectInput.options[selectInput.selectedIndex].innerHTML;//value of assignedDriver
        let keys = event.target.name.split('::');//assignedDriver::driverId
        let assignedDriver = keys[0];
        let driverId = keys[1];

        this.setState({
                assignedDriver : value,
                driverId: selectedOption
            });
    }
    //collects errors from inputs to this,error obj
    validateInput = (name, isValid) => {
        this.validInputs[name] = isValid
        console.log(this.validInputs);
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
                            name='refno'
                            idAttr='refno'
                            label="Reference Number:"
                            type="text"
                            required={true}
                            value={this.state.refno}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.getDataValue}
                            name='date'
                            idAttr='date'
                            label="Date:"
                            required={true}
                            type="date"
                            value={this.state.date}
                             validate={this.validateInput}
                        /> 

                        <InputText 
                            onChange={this.getDataValue}
                            name='predate'
                            idAttr='PreBookedDate'
                            label="Pre Booked Date:"
                            type="date"
                            required={true}
                            value={this.state.predate}
                             validate={this.validateInput}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            name='time'
                            idAttr='TimeOfColection'
                            label="Time of Colection:"
                            type="time"
                            required={true}
                            value={this.state.time}
                             validate={this.validateInput}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            name='name'
                            idAttr='NameOfPassanger'
                            label="Name of Passanger:"
                            type="text"
                            required={true}
                            value={this.state.name}
                             validate={this.validateInput}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            name='email'
                            idAttr='emailOfPassanger'
                            label="Email of Passanger:"
                            type="email"
                            required={true}
                            value={this.state.email}
                             validate={this.validateInput}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            name='pickup'
                            idAttr='PickUp'
                            label="Pick up Address:"
                            type="text"
                            required={true}
                            value={this.state.pickup}
                             validate={this.validateInput}
                            />

                        <InputText 
                            onChange={this.getDataValue}
                            name='destination'
                            idAttr='Destination'
                            label="Destination:"
                            type="text"
                            value={this.state.destination}
                            />

              
                        <SelectInput
                            //when select is reqiered the default value as empty string
                            defaultValue={editingBooking ? this.state.assignedDriver : ""}
                            defaultOption={editingBooking ? this.state.driverId : "Select driver"}
                            required={true}
                            onChange={this.getDataValueSelect}
                            value={this.props.driverId}
                            idAttr="assignedDriver"
                            name="assignedDriver::driverId"
                            options={this.props.drivers.filter((driver) => {
                                //if booking is being edited display only not selected one, selected one are provided with defaultValue and defaultOption prop
                                if(editingBooking) {
                                    return driver._id != this.state.assignedDriver
                                } else {
                                    return true;
                                }
                               
                            }).map((driver) => {
                                    return ({
                                        value: driver._id,
                                        label: driver.name + " " + driver.surname
                                    }) 
                            })}
                            //option in format
                            //[{value: "Text", label: "Text"}, {value: "Test", label: "Text"}, ...]
                                                    
                        />
                           <TextArea
                            onChange={this.getDataValue}
                            name='remarks'
                            idAttr='remarks'
                            label="Remarks:"
                            value={this.state.remarks}
                            />

                    </fieldset>

                    <Button className="buttonForm" type='submit'>Submit</Button>
                    <Button className="buttonForm"  onClick={this.hideModal}>Close</Button>
                </form>
            </div>
        );
    }
};


