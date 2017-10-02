import React, { Component } from 'react';
import Navigation from './Navigation.js';
import './Main.css'
import {Loader} from './layout/Loader.js';
// import Auth from '../auth/auth.js';


// const auth = new Auth();


export default class Main extends Component {
    constructor(props) {  
        super(props);
    }
      
        

        showLoader = () => {
            if (this.props.loadingStatus.loading) {
                return (
                    <div className="overlay">
                        <div className="loader">
                            <Loader/>
                        </div>
                    </div>
                )
            }
        }

        // componentWillMount() {
        //     
        //     auth.login();
        //     auth.handleAuthentication();
        // }

        render() {

            return (
                <div>
                    <Navigation/>

                    <div>
                        {this.showLoader()}
                        {this.props.children}
                    </div>
                </div>
            );
        }
    };


