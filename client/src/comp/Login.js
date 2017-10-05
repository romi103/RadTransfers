import React, {Component} from 'react';
import { login, logout, isLoggedIn } from '../auth/auth.js';

export default class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                 <ul>
                     <p>Please login.</p>
                {/* {
                (isLoggedIn()) ? 
                <li><button className="btn btn-danger log" onClick={() => logout()}>Log out </button></li> : 
                <li><button className="btn btn-info log" onClick={() => login()}>Log In</button></li>
                } */}
                </ul> 
            </div>
        ) 
    }
}