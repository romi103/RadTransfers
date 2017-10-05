import React, {Component} from 'react';


export default class Configuration extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                 <ul>
                     <p>Config</p>
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