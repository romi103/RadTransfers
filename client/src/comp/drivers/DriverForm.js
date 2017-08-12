import React, { Component } from 'react';
import { addBooking, getDrivers, hideDriverModal} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import fs from 'fs';
import http from 'http';
// import { DriverForm } from 'DriverForm';


export class DriverForm extends Component {

    constructor(props) {  
        super(props);
        this.state = {
                _id: '',
                driverId: '',
                name:  '',
                surname:  '',
                address:  '',
                dob:  '',
                nin: '',
                availableFrom:  '',
                availableTo:  '',
                photoPath:  '',
                licPath:  '',
                email:  '',
                carRegNo:  '',
                notes: ''

        }

        // this.props.handleTheSubmit();
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.hideModal = this.hideModal.bind(this);
       
        // this.getDrivers = this.getDrivers.bind(this);
    }

    handleChange(key) {
        return (event) => {
            let currentSate = this.state;
            currentSate[key] = event.target.value
            return this.setState(currentSate);
        };
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.handleTheSubmit(this.state);
        this.hideModal();
    }

    
    handleSubmitEdit = (event) => {
        event.preventDefault();

        this.props.handleTheSubmitEdit(this.state);
        this.hideModal();
    }

    componentDidMount() {
        const { editingDriver, driverBeingEdited} = this.props.modal
        if (editingDriver) {
            console.log('form state', driverBeingEdited )
            this.setState(driverBeingEdited);
        }
    }

    uploadPhoto = (key) => {
        return (event) => {
        let image = event.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {

                let imageEncoded = reader.result
                let currentSate = this.state;
                currentSate[key] = imageEncoded;
                return this.setState(currentSate);
            }

            reader.onerror = () => {
                alert("An error occurerd. Please contact support.");
            }
        }
    }


   

    hideModal = () => {
        this.props.dispatch(hideDriverModal())
    }
 

    render(){

      
        const { editingDriver} = this.props.modal
        

        return (
            <div>
                <form >
                    <fieldset>
                    <legend>New Driver</legend>

                        <div>
                            <label htmlFor='driverNumber'>Driver Number</label>
                            <input type="number" id='driverNumber' value={this.state.driverId} onChange={this.handleChange('driverId')} />
                        </div>

                        <div>
                            <label htmlFor='surname'>Suranme / Family Name</label>
                            <input type="text" id='surname' value={this.state.surname} onChange={this.handleChange('surname')}/>
                        </div>

                        <div>
                            <label htmlFor='fornames'>Fornames</label>
                            <input type="text" id='fornames' value={this.state.name} onChange={this.handleChange('name')}/>
                        </div>

                        <div>
                            <label htmlFor='address'>Address</label>
                            <input type="text" id='address' value={this.state.address} onChange={this.handleChange('address')}/>
                        </div>

                        <div>
                            <label htmlFor='dob'>Date of birth</label>
                            <input type="date" id='dob' value={this.state.dob} onChange={this.handleChange('dob')}/>
                        </div>

                        <div>
                            <label htmlFor='nin'>Natinal Ins. No.</label>
                            <input type="text" id='nin' value={this.state.nin} onChange={this.handleChange('nin')} />
                        </div>
                        
                            <div>
                                <label htmlFor='driver-available-from'>Driver became avaliable</label>
                                <input type="date" id='driver-available-from' value={this.state.availableFrom} onChange={this.handleChange('availableFrom')} />
                            </div>

                            <div>
                                <label htmlFor='driver-available-to'>Ceased to be avaliable</label>
                                <input type="date" id='driver-available-to' value={this.state.availableTo} 
                                onChange={this.handleChange('availableTo')} />
                            </div>
                    

                        <div>
                            <label htmlFor="driver-photo">Driver Photo</label>
                            <input type="file" accept="image/*" id='driver-photo' onChange={this.uploadPhoto('photoPath')} />
                        </div>

                        <div>
                            <label htmlFor="driver-photo">Driver Lic Photocopy</label>
                            <input type="file" accept="image/*" id='driver-lic-photo' onChange={this.uploadPhoto('licPath')}/>
                        </div>

                        <div>
                            <label htmlFor='driver-email'>Driver Email</label>
                            <input type="email" id='driver-email' value={this.state.email} onChange={this.handleChange('email')} />
                        </div>

                        <div>
                            <label htmlFor='driver-notes'>Driver Notes</label>
                            <textarea id='driver-notes' value={this.state.notes} onChange={this.handleChange('notes')} ></textarea>
                        </div>

                    </fieldset>

                
                    <Button className="buttonForm" type='submit' onClick={editingDriver ? this.handleSubmitEdit :  this.handleSubmit}>Submit</Button>
                    <Button className="buttonForm" onClick={this.hideModal}>Close</Button>
                </form>
            </div>
        );
    }
};