import React, { Component } from 'react';
import $ from 'jquery';
import './Loader.css';

export class Loader extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div id="loader">
                <p>Loading...</p>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}

//default props
Loader.defaultProps = {

}