import React, { Component } from 'react';
import { getInitialState, showDriverModal} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { DriversRow } from './DriversRow.js';
import { DriverFormContainer } from './DriverFormContainer.js';

import { Modal, Button, Table } from 'react-bootstrap';



export class DriversTabel extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    
    }

    showModal() {
        this.props.dispatch(showDriverModal())
        // this.props.showTheModal()
    }

    render() {

        let { drivers, dispatch, modal} = this.props;      
        return (
            <div>

                <Modal show={modal.showDriverModal} >
                    <DriverFormContainer />
                </Modal>

                <Button bsStyle="primary" bsSize="large" className="actionButton" onClick={this.showModal}>New Driver</Button>
                <hr />
                <input type="text" id='searchTable' placeholder="Search" />
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Driver Number</th>
                            <th>Surname / Family Name</th>
                            <th>Forenames</th>
                            <th>Address</th>
                            <th>Date of Birth</th>
                            <th>Natinal Ins. No.</th>
                            <th>Avaliability From</th>
                            <th>Avaliability To</th>
                            <th>Driver Phote </th>
                            <th>Driver's' Lic Photocopy </th>
                            <th>Driver Email</th>
                            <th>Driver Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <DriversRow key={driver._id} driver={driver} dispatch={dispatch} modal={modal}/>
                            )
                        })}
                        
                    </tbody>
                </Table>
            </div>
        );
    }
};