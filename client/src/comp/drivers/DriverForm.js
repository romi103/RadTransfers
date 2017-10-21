import React, { Component } from 'react';
import { hideDriverModal} from '../../store/action/action.js';
import { Button } from 'react-bootstrap';
import {InputText} from '../layout/InputText.js';
import {SelectInput} from '../layout/SelectInput.js';
import {TextArea} from '../layout/TextArea.js';
import {InputFile} from '../layout/InputFile.js';



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
              //*******************************/
        //error object
        //*******************************/
        this.validInputs = {
            
                name: null,
                surname: null,
                address: null,
                dob: null,
                nin: null,
                availableFrom: null,
                availableTo: null,
                photoPath: null,
                licPath: null,
                email: null,
                carRegNo: null,
                not: null
        }
    }

    handleChange = (event) => {
            let key = event.target.name; 
                this.setState({
                [key] : event.target.value
            });

        
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.handleTheSubmit({
                _id: this.state._id,
                driverId: this.state.driverId,
                name:  this.state.name,
                surname:  this.state.surname,
                address:  this.state.address,
                dob:  this.state.dob,
                nin: this.state.nin,
                availableFrom:  this.state.availableFrom,
                availableTo:  this.state.availableTo,
                photoPath:  this.state.photoPath,
                licPath:  this.state.licPath,
                email:  this.state.email,
                carRegNo:  this.state.carRegNo,
                notes:this.state.notes
        });
        this.hideModal();
    }

    
    handleSubmitEdit = (event) => {
        event.preventDefault();

        this.props.handleTheSubmitEdit({
                _id: this.state._id,
                driverId: this.state.driverId,
                name:  this.state.name,
                surname:  this.state.surname,
                address:  this.state.address,
                dob:  this.state.dob,
                nin: this.state.nin,
                availableFrom:  this.state.availableFrom,
                availableTo:  this.state.availableTo,
                photoPath:  this.state.photoPath,
                licPath:  this.state.licPath,
                email:  this.state.email,
                carRegNo:  this.state.carRegNo,
                notes:this.state.notes
        });
        this.hideModal();
    }

    componentWillMount() {
        const { editingDriver, driverBeingEdited} = this.props.modal
        if (editingDriver) {
            console.log('form state', driverBeingEdited )
            this.setState(driverBeingEdited);
        }
    }

    uploadPhoto = (event) => {
        let key = event.target.name; 
        let image = event.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {

                let imageEncoded = reader.result
                this.setState({
                    [key] : imageEncoded
                });
            }

            reader.onerror = () => {
                alert("An error occurerd. Please contact support.");
            }
    }

    hideModal = () => {
        this.props.dispatch(hideDriverModal())
    }

       //collects errors from inputs to this,error obj
    validateInput = (name, isValid) => {
        this.validInputs[name] = isValid
        console.log(this.validInputs);
    }
 

    render(){

      
        const { editingDriver} = this.props.modal
        

        return (
            <div>
                <form  onSubmit={editingDriver ? this.handleSubmitEdit : this.handleSubmit}>
                    <fieldset>
                    <legend>New Driver</legend>
                        <InputText 
                            onChange={this.handleChange}
                            name='driverId'
                            idAttr='driverId'
                            label="Driver Number"
                            type="number"
                            required={true}
                            value={this.state.driverId}
                            validate={this.validateInput}
                            /> 

                     

                        <InputText 
                            onChange={this.handleChange}
                            name='surname'
                            idAttr='surname'
                            label="Suranme / Family Name"
                            type="text"
                            required={true}
                            value={this.state.surname}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='name'
                            idAttr='name'
                            label="Fornames"
                            type="text"
                            required={true}
                            value={this.state.name}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='address'
                            idAttr='address'
                            label="Address"
                            type="text"
                            required={true}
                            value={this.state.address}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='dob'
                            idAttr='dob'
                            label="Date of birth"
                            type="date"
                            required={true}
                            value={this.state.dob}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='nin'
                            idAttr='nin'
                            label="Natinal Ins. No."
                            type="text"
                            required={true}
                            value={this.state.nin}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='availableFrom'
                            idAttr='availableFrom'
                            label="Driver became avaliable"
                            type="date"
                            required={true}
                            value={this.state.availableFrom}
                            validate={this.validateInput}
                            /> 

                        <InputText 
                            onChange={this.handleChange}
                            name='availableTo'
                            idAttr='availableTo'
                            label="Ceased to be avaliable"
                            type="date"
                            required={true}
                            value={this.state.availableTo}
                            validate={this.validateInput}
                            /> 
                    
                        <InputFile 
                            onChange={this.uploadPhoto}
                            name='photoPath'
                            idAttr='photoPath'
                            label="Driver Photo"
                            required={editingDriver ? false : true}
                            validate={this.validateInput}
                            /> 

                        <InputFile 
                            onChange={this.uploadPhoto}
                            name='licPath'
                            idAttr='licPath'
                            label="Driver Lic Photocopy"
                            required={editingDriver ? false : true}
                            validate={this.validateInput}
                            />  

                     

                        <InputText 
                            onChange={this.handleChange}
                            name='email'
                            idAttr='email'
                            label="Driver Email"
                            type="email"
                            required={true}
                            value={this.state.email}
                            validate={this.validateInput}
                            /> 

                        <TextArea
                            onChange={this.getDataValue}
                            name='notes'
                            idAttr='notes'
                            label="Driver Notes:"
                            value={this.state.notes}
                            />

                    </fieldset>

                
                    <Button className="buttonForm" type='submit'>Submit</Button>
                    <Button className="buttonForm" onClick={this.hideModal}>Close</Button>
                </form>
            </div>
        );
    }
};