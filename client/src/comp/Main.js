import React, { Component } from 'react';
import Navigation from './Navigation.js';
import './Main.css'
import Loader from './layout/Loader.js';
import ErrorPage from './error/ErrorPage.js';
import { errorHide } from '../store/action/action.js';
// import Auth from '../auth/auth.js';


// const auth = new Auth();


class Main extends Component {
    constructor(props) {  
        super(props);
    }
     

    
        showLoader = () => {
            if (this.props.loadingStatus.loading) {
                return (
                        <Loader/>
                )
            }
        }

        showError = () => {
            return <h1>Unauthorized 401</h1>;
        }

        render() {
            const {errorStatus, dispatch} = this.props;
            return (
                <div>
                    <Navigation/>

                    <div>
                        {this.showLoader()}
                        {(!errorStatus.show) ? this.props.children : <ErrorPage errorStatus={errorStatus} {...this.props}/>}
                    </div>
                </div>
            );
        }
    };

    // const errorHandler = (Component) => {
    //     return class CheckError extends React.Component {
    //         render() {
    //             const {errorStatus} = this.props;
    
    //              if (!errorStatus.show) {
    //                 return <Component {...this.props}/>;
    //              }
                
    //             if (errorStatus.show) {
    //                return <h1>Unauthorized 401</h1>
    //             }
    //         }
    //     }
    // } 

    export default Main;