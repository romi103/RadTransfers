
import { bookingsReducer, driversReducer, modalReducer, confimBookingReducer, loadingReducer, userLoginReducer,errorStatusReducer } from './reducers/reducers.js'; 
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const reducer = combineReducers({
        bookings: bookingsReducer,
        drivers: driversReducer,
        modal: modalReducer, 
        confirmBokingState: confimBookingReducer,
        loadingStatus: loadingReducer,
        userLogin: userLoginReducer,
        errorStatus: errorStatusReducer

    });

export const store = createStore(reducer, applyMiddleware(thunk));

   
