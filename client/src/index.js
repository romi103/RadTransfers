import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
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


//store - reducer - actions
import * as actions from './store/action/action.js';
import { store } from './store/configStore.js';

import 'bootstrap/dist/css/bootstrap.css';

store.subscribe(() => {
    console.log('New state', store.getState());
})

store.dispatch(actions.getInitialState());
store.dispatch(actions.fetchDrivers());
 
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={MainContainer}>
                <Route path='drivers' component={Drivers}/>
                <Route path='vehicles' component={Vehicles}/>
                <Route path='complaints' component={Complaints}/>
                <Route path='bookings' component={Bookings} />
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
