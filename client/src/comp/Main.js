import React, { Component } from 'react';
import Navigation from './Navigation.js';
import './Main.css'
import {Loader} from './layout/Loader.js';



export const Main = (props) => {
        const {loadingStatus} = props;

        const showLoader = () => {
            if (loadingStatus.loading) {
                return (
                    <div className="overlay">
                        <div className="loader">
                            <Loader/>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div>
                <Navigation />
                <div>
                    {showLoader()}
                    {props.children}
                </div>
            </div>
        );
};

