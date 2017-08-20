import React, { Component } from 'react';
import $ from 'jquery';

export class InputText extends Component {
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
             this.props.validate(this.state.valid, this.props.index)
        }
       

    }

    handleBlur = (event) => {
        if (this.props.validate) {
            var valid = this.props.validate(event.target.value)
        }

        this.validation(event.target.value, valid);
          
        if (this.props.validate) {
             this.props.validate(this.state.valid, this.props.index)
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

        const renderErrorr = () => {
             if (!this.state.valid && this.state.showErrorMessage) {
                return (<div>x</div>);
            }
        }

        const inputStyle = {
        }

        return (
            <div>
                {renderErrorr()}
                {renderLabel()}
                <input 
                style={inputStyle}
                type={this.props.type} 
                value={this.state.value} 
                className = {(!this.state.valid && this.state.showErrorMessage) ? 'error-input' : 'standard-input' }
                id={this.props.idAttr} 
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                data-additional={this.props.additinalData} />
            </div>
        );
    }
}

//default props
InputText.defaultProps = {

}