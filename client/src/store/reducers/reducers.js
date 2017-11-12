const uuidV1 = require('uuid/v1');

const bookingsDeafult = [{
    id: 1,
    refno: 1,
    date: "01/01/2017",
    predate: "01/01/2017",
    time: "15pm",
    name: "Rom",
    pickup: "bulwer road 45",
    destination: "bulwer road 45",
    driverId: 12,
    remarks: "test",
    confirmed: false,
    cancelled: false
}, {
                id: 2,
    refno: 2,
    date: "01/01/2017",
    predate: "01/01/2017",
    time: "15pm",
    name: "Rom",
    pickup: "bulwer road 45",
    destination: "bulwer road 45",
    driverId: 17,
    remarks: "test",
    confirmed: false,
    cancelled: false
}]

export const errorStatusReducer = (state = {
    status: null,
    statusText: null,
    show: false 
}, action) => {
    switch (action.type) {
        case 'ERROR_SHOW':
            return Object.assign({}, state, {
                status: action.status,
                statusText: action.statusText,
                show: action.show });
        case 'ERROR_HIDE':
            return Object.assign({}, state, {
                status: action.status,
                statusText: action.statusText,
                show: action.show });
        default: 
            return state
    }
}

export const bookingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BOOKING':
            return [
                ...state, 
                {
                    _id: action.booking._id,
                    refno: action.booking.refno,
                    date: action.booking.date,
                    predate: action.booking.predate,
                    time: action.booking.time,
                    name: action.booking.name,
                    pickup: action.booking.pickup,
                    destination: action.booking.destination,
                    driverId: action.booking.driverId,
                    remarks: action.booking.remarks,
                    confirmed: action.booking.confirmed,
                    cancelled: action.booking.cancelled,
                    email: action.booking.email,
                    assignedDriver: action.booking.assignedDriver,
                    bookingOrederNo: action.booking.bookingOrederNo,
                    fairNumber: action.booking.fairNumber

                }
            ];
        case 'EDIT_BOOKING_STATE':
            return state.map((booking) => {
                if (booking._id == action.booking._id) {
                    return {
                        ...action.booking
                    }
                } else {
                    return booking;
                }
            });
            
        case 'CONFIRM_BOOKING':
           return state.map((booking) => {
                if (booking._id == action._id) {
                    return  {
                        ...booking,
                        confirmed: true,
                        cancelled: false
                    }
                } else {
                    return booking;
                }   
           });
        case 'CANCEL_BOOKNG':
            return state.map((booking) => {
                if (booking._id == action._id) {
                    return {
                        ...booking,
                        confirmed: false,
                        cancelled: true
                    }
                } else {
                    return booking;
                }
            });

        case 'REMOVE_BOOKNG':
            return state.filter((booking) => {
                return booking._id != action._id;
            });
        case 'SET_INITIAL_STATE':
            return action.bookings;
        default:
            return state;
    }
} 

export const driversReducer = (state = [], action) => {
    switch (action.type) {
        case 'EDIT_DRIVER_STATE':
            return state.map((driver) => {
                if (driver._id == action.driver._id) {
                    return {
                        ...action.driver
                    }
                } else {
                    return driver;
                }
            });
        case 'ADD_DRIVER':
            return [
                ...state,
                {
                    _id: action.driver._id,
                    driverId: action.driver.driverId,
                    name: action.driver.name,
                    surname: action.driver.surname,
                    address: action.driver.address,
                    dob: action.driver.dob,
                    nin: action.driver.nin,
                    availableFrom: action.driver.availableFrom,
                    availableTo: action.driver.availableTo,
                    photoPath: action.driver.photoPath,
                    licPath: action.driver.licPath,
                    email: action.driver.email,
                    notes: action.driver.notes,
                    fairNumber: action.driver.fairNumber
                }
            ];
        case 'REMOVE_DRIVER':
            return state.filter((driver) => {
                return driver._id != action._id;
            });
        case 'SET_INITIAL_DRIVERS':
            return action.drivers;
        default:
            return state;
    }
}
// state of modals
export const modalReducer = (state = {
    showNewBookingModal: false, 
    showDriverModal: false, 

    editingBooking: false, 
    editingDriver: false, 

    driverBeingEdited: null,
    bookingBeingEdited: null }, action) =>{
    switch (action.type) {
        ///Booking modal
        case 'SHOW_MODAL_BOOKING':
            return Object.assign({}, state, {showNewBookingModal: true});
        case 'HIDE_MODAL_BOOKING':
            return Object.assign({}, state, {
                showNewBookingModal: false,
                bookingBeingEdited: action.bookingBeingEdited,
                editingBooking: action.editingBooking
            });
        //Driver modal
        case 'SHOW_MODAL_DRIVERS':
            return Object.assign({}, state, {showDriverModal: action.showDriverModal});
        case 'HIDE_MODAL_DRIVERS':
            return Object.assign({}, state, {
                showDriverModal: action.showDriverModal,  
                driverBeingEdited: action.driverBeingEdited, 
                editingDriver: action.editingDriver});

        case 'EDITING_DRIVER':
            return Object.assign({}, state, {
                editingDriver: action.editingDriver, 
                driverBeingEdited: action.driver, 
                showDriverModal: action.showDriverModal} )

         case 'EDITING_BOOKING':
            return Object.assign({}, state, {
                editingBooking: action.editingBooking, 
                bookingBeingEdited: action.booking, 
                showNewBookingModal: action.showNewBookingModal} )
        default:
            return state;
    }
}

export const confimBookingReducer = (state = {driverBeingConfirmed: undefined, bookingBeingConfirmed: undefined}, action) => {
    switch (action.type) {
        case 'DRIVER_BEING_CONFIRMED':
            return Object.assign({}, state, {driverBeingConfirmed: action._id});
        case 'DRIVER_BEING_CONFIRMED_RESET':
            return Object.assign({}, state, {driverBeingConfirmed: undefined});
        case 'BOOKING_BEING_CONFIRMED':
            return Object.assign({}, state, {bookingBeingConfirmed: action._id});
        case 'BOOKING_BEING_CONFIRMED_RESET':
            return Object.assign({}, state, {bookingBeingConfirmed: undefined});
        default:
            return state;
    }
}

export const loadingReducer = (state = {loading: false}, action) => {
    switch (action.type) {
        case 'LOADING_START':
            return Object.assign({}, state, {loading: action.loading});
        case 'LOADING_STOP':
            return Object.assign({}, state, {loading: action.loading});
        default:
        
            return state;
    }
}

export const userLoginReducer = (state = {
    isFetching: false,
    isAuthenticated: false
}, action) => {
        switch (action.type) {
            case 'LOGIN_REQUEST':
                return Object.assign({}, state, {
                    isFetching: action.isFetching, isAuthenticated: action.isAuthenticated
                });
            case 'LOGIN_SUCCESS':
                return Object.assign({}, state, {
                    isFetching: action.isFetching, isAuthenticated: action.isAuthenticated
                });
        default:
            return state
        }
    }
