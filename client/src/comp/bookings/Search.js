import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export class Search extends Component {

    constructor() {
        super();
    
    }

    render () {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor='DateFrom'>Date From</label>
                        <input type="date" id='DateFrom' pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>

                        <label htmlFor='DateTo'>Date To</label>
                        <input type="date" id='DateTo' pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
                    </div>
                </form>
            </div>
        );
    }
}