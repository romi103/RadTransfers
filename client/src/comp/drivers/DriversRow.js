import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmBookingSave, cancelBookingSave, startEditDriver, removeDriverSave, getInitialState} from '../../store/action/action.js';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { Button, Modal, Grid, Col, Image, Row, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';
import './DriverRow.css';



export class DriversRow extends Component {
     constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            previewImg: ''
        }
        // this.handleConfirm = this.handleConfirm.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
        // this.handleRemove = this.handleRemove.bind(this);
        // props = {
        //     booking: {},
        // }
    
    }

    handleEdit = () => {
        this.props.dispatch(startEditDriver(this.props.driver))
        console.log('driver being edited',this.props.driver )
    }

    close = () => {
        this.setState({
             modalOpen: false
        })
    }

    openLicPhoto = () => {
        this.setState({
             modalOpen: true,
             previewImg: this.props.driver.licPath

        })
    }

    openDriverPhoto = () => {
        this.setState({
             modalOpen: true,
             previewImg:  this.props.driver.photoPath

        })
    }

    removeDriver = () => {
        if (window.confirm('Are you sure you want to REMOVE this driver?')) {
            this.props.dispatch(removeDriverSave(this.props.driver));
        } else {
            // Do nothing!
        }
        
    }


    render() {
        const {driver, modal, dispatch} = this.props;

        return(
            <tr>            
                <Modal show={this.state.modalOpen} bsSize="lg" dialogClassName="modal-photo">

                        <Image src={this.state.previewImg} rounded responsive={true} />
                    {/*<img src={this.state.previewImg} />*/}
                    <button className="btn btn-primary" onClick={this.close}>Ok</button>
                </Modal>
                 <td>
                    <DropdownButton title="More" id="bg-vertical-dropdown-1">
                        <MenuItem eventKey="1">
                            <Button bsStyle="primary" onClick={this.handleEdit}>Edit</Button>
                        </MenuItem>
                        <MenuItem eventKey="2">
                            <Button bsStyle="danger" onClick={this.removeDriver}>Remove</Button>
                        </MenuItem>
                    </DropdownButton>
                    </td>
                    <td>{driver.driverId}</td>
                    <td>{driver.name}</td>
                    <td>{driver.surname}</td>
                    <td>{driver.address}</td>
                    <td>{driver.dob}</td>
                    <td>{driver.nin}</td>
                    <td>{driver.availableFrom}</td>
                    <td>{driver.availableTo }</td>
                    <td>{driver.photoPath ? <Button bsSize="xsmall" onClick={this.openDriverPhoto}>Preview</Button> : <Glyphicon glyph="remove" />}</td>
                    <td>{driver.licPath ? <Button bsSize="xsmall" onClick={this.openLicPhoto}>Preview</Button> : <Glyphicon glyph="remove" />}</td>
                    <td>{driver.email}</td>
                    <td>{driver.notes}</td>
                    {/*<Button className="ttest" ref='ttest' onClick={this.handleEdit}>Edit</Button>
                    <Button onClick={this.removeDriver}>Remove</Button>*/}
                    {/*<Button onClick={() => { $(findDOMNode(this.refs.ttest)).slideToggle(); }}>Remove</Button>*/}
            </tr>
        );
    }
    
}