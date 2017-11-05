//creates enviromental variables - looks for .env file in the root folder and set'em up so they can be accessed by process.env object
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
/* eslint-disable import/first */

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory, browserHistory } from 'react-router';
import{Provider} from 'react-redux'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import  {MainContainer} from './comp/MainContainer.js';
import  Bookings from './comp/bookings/Bookings.js';
import  Drivers from './comp/drivers/Drivers.js';
import  Vehicles from './comp/Vehicles.js';
import  Complaints from './comp/Complaints.js';
import  Home from './comp/Home.js';
import  Callback from './comp/Callback.js';
import Login from './comp/Login.js';
import { requireAuth } from './auth/auth.js';


//store - reducer - actions
import * as actions from './store/action/action.js';
import * as actionsAuth from './store/action/actionAuth.js';
import { store } from './store/configStore.js';



import 'bootstrap/dist/css/bootstrap.css';

store.subscribe(() => {
    console.log('New state', store.getState());
})

 
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={MainContainer}>
                <Route path='drivers' component={Drivers} onEnter={requireAuth}/>
                {/* <Route path='vehicles' component={Vehicles} onEnter={requireAuth}/>
                <Route path='complaints' component={Complaints} onEnter={requireAuth}/> */}
                <Route path='bookings' component={Bookings} onEnter={requireAuth}/>
                <Route path='callback' component={Callback} />
                <Route path='login' component={Login} />
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
