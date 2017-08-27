import React, { Component } from 'react';
import $ from 'jquery';
import './SelectInput.css';
export class SelectInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            valid: false,
            errorMessage: 'Input is invalid',
            showErrorMessage: false
        }
    }

    handleChange = (event) => {
        

        this.validation(event.target.value);
        //pass event object to parent component
        if (this.props.onChange) {
            this.props.onChange(event);
        }

         if (this.props.validate) {
             this.props.validate(this.props.name, this.state.valid)
        }
       

    }

    handleBlur = (event) => {


        this.validation(event.target.value);
          
        if (this.props.validate) {
             this.props.validate(this.props.name, this.state.valid)
        }
    }

    validation = (value, valid) => {
        
        var showErrorMessage;

        if(typeof valid === "undefined") {
            valid = true
        }
        
        //there is a way to make value invalid/valid by forcing it by true/false as a second argument 
        if (!valid) {
            valid = false;
            showErrorMessage = true;

        } else if  (this.props.required && $.isEmptyObject(value)) {
            valid = false;
            showErrorMessage = true;
        } else {
            valid = true;
            showErrorMessage = false;

        }

        this.setState({
            valid: valid,
            showErrorMessage: showErrorMessage,
            value: value

        })
        
    }

    render() {

        const renderLabel = () => {
            if (this.props.label) {
                return (
                   <label htmlFor={this.props.idAttr}>{this.props.label}</label> 
                )
            }
        }

        const inputStyle = {
        }

        return (
            <div>
                        <div>
                            {renderLabel()}
                            <select 
                            id={this.props.idAttr} 
                            value={this.state.value} 
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            required={this.props.required ? true : false}
                            className = {(!this.state.valid && this.state.showErrorMessage) ? 'error-input' : 'standard-input' }
                            name={this.props.name}>
                                <option value={this.props.defaultValue}>{this.props.defaultOption}</option>
                                 {this.props.options.map((option, index) => {
                                return (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ) 
                                })}  
                            </select>
                            {this.props.required ? " *" : ""}
                        </div>
                                  {/* //option in format
                            //[{option: "Text", label: "Text"}, {option: "Test", label: "Text"}, ...] */}
            </div>
        );
    }
}

//default props
SelectInput.defaultProps = {

}