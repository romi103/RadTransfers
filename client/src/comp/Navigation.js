import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Glyphicon} from 'react-bootstrap';
import { login, logout, isLoggedIn } from '../auth/auth.js';

var Navbar = (props) => {

    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    return (
        <div className="well">
            <div className='horizontal-list'>

                <div>
                    <ul>
                        <li>
                            <Link to="/bookings" activeClassName='active' className='link'><Glyphicon glyph="book" /> Bookings</Link>
                        </li>
                        <li>
                            <Link to="/drivers" activeClassName='active' className='link'><Glyphicon glyph="user" /> Drivers</Link>
                        </li>
                        <li>
                            <Link to="/vehicles" activeClassName='active' className='link'><Glyphicon glyph="road" /> Vehicles</Link>
                        </li>
                        <li>
                            <Link to="/complaints" activeClassName='active' className='link'><Glyphicon glyph="exclamation-sign" /> Complaints</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {
                            (isLoggedIn()) ? <li><button className="btn btn-danger log" onClick={() => logout()}>Log out </button></li> :  <li><button className="btn btn-info log" onClick={() => login()}>Log In</button></li>
                        }
                       
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;