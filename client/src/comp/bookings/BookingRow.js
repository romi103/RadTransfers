import React, { Component } from 'react';
import { getInitialState} from '../../store/action/action.js';
import { connect } from 'react-redux';
import { confirmBookingSave, cancelBookingSave, removeBookingSave} from '../../store/action/action.js';
// import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { DropdownButton, MenuItem, Button, Glyphicon} from 'react-bootstrap';



export class BookingRow extends Component {
     constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        props = {
            booking: {},
        }
    
    }

    handleConfirm() {
        if (this.props.booking.confirmed) {
            alert("This booking is already confirmed!");
            return;
        }

        if (window.confirm('Are you sure you want to CONFIRM this booking? This action will tigger sending a conformation email to the passanger!')) {
            this.props.dispatch(confirmBookingSave(this.props.booking));
            console.log(this.props.booking);
         
        } else {
            // Do nothing!
        }
    }

    handleCancel(booking) {
        if (window.confirm('Are you sure you want to CANCEL this booking? This action will tigger sending a cancelation email to the passanger!')) {
            this.props.dispatch(cancelBookingSave(this.props.booking))
        } else {
            // Do nothing!
        }
    }

    handleRemove(booking) {
         if (window.confirm('Are you sure you want to REMOVE this booking?')) {
            this.props.dispatch(removeBookingSave(this.props.booking))
        } else {
            // Do nothing!
        }
    }
    

    render() {
        let {booking} = this.props;

        //slect color of the row, depends on confirmed/cancel state
        let rowStyle = () => {

            if (booking.confirmed) {
                return { backgroundColor: '#DFF0D8' }
            } else if (booking.cancelled) {
                return { backgroundColor: '#F2DEDE' }
            } else {
                return { backgroundColor: 'transparent' }
            }
        }


        return(
            
            <tr style={rowStyle()} className="booking">
                                <td>
                                    <DropdownButton title="More" id="bg-vertical-dropdown-1">
                                        <MenuItem eventKey="1">
                                            <Button bsStyle="success" onClick={this.handleConfirm}><Glyphicon glyph="star" /> Confirm</Button>
                                        </MenuItem>
                                        <MenuItem eventKey="2">
                                            <Button bsStyle="warning" onClick={this.handleCancel}>Cancel</Button>
                                        </MenuItem>
                                        <MenuItem eventKey="3">
                                            <Button bsStyle="danger" onClick={this.handleRemove}>Remove</Button>
                                        </MenuItem>
                                    </DropdownButton>
                                </td>
                                <td>{booking.refno}</td>
                                <td>{booking.date}</td>
                                <td>{booking.predate}</td>
                                <td>{booking.time}</td>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.pickup}</td>
                                <td>{booking.destination}</td>
                                <td>{booking.driverId}</td>
                                <td>{booking.remarks}</td>
                                


                                {/*<button className="ttest" ref='ttest' onClick={this.handleConfirm}>Confirm</button>
                                <button onClick={this.handleCancel}>Cancel</button>
                                <button onClick={this.handleRemove}>Remove</button>*/}
                            </tr>
        );
    }
    
}