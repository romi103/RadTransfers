import React, { Component } from 'react';
import {setAccessToken, setIdToken, getPathName} from '../auth/auth.js'
import Loader from './layout/Loader.js'

//callback component that accepts autorization tokens
class Callback extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        setAccessToken();
        setIdToken();

        window.location.href = getPathName();
    }

    render() {
        return (
                <Loader/>
        );
    }
}

export default Callback;