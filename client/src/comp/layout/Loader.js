import React, { Component } from 'react';
import $ from 'jquery';
import './Loader.css';

export default class Loader extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="overlay">
                <div className="loader">
                    <div id="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                {/* <p>Loading...</p> */}
                    </div>
                </div>
            </div>
            
        )
    }
}

//default props
Loader.defaultProps = {

}