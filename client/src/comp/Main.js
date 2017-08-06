import React, { Component } from 'react';
import Navigation from './Navigation.js';



export const Main = (props) => {
        return (
            <div>
                <Navigation />
                <div>
                    {props.children}
                </div>
            </div>
        );
};

