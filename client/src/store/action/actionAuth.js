// import Auth from '../../auth/auth.js';


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const requestLogin = () => {
    
        return {
            type: LOGIN_REQUEST,
            isFetching: true,
            isAuthenticated: false
        }
        //     let currentState = getState();
        //     let bookingsNumber = currentState.bookings.length + 1;
        //     let bookingOrederNo = bookingsNumber++;
        //     // booking order to keep them in chronological order
        //     let bookingMod = {...booking, 
        //         confirmed: false,
        //         cancelled: false,
        //         _id: uuidV1(),
        //         bookingOrederNo: bookingOrederNo
        //     }
        //     dispatch(loadingStart());
        //    $.post('/newbooking', bookingMod)
        //    .done(() =>{
        //        dispatch(addBooking(bookingMod))
        //        dispatch(loadingStop());
        //         })
        //     .fail(() => {
        //             dispatch(loadingStop());
        //             alert("An error occured. Please contact support")
        //         })
        

    }

    export const receiveLogin = (booking) => {
        
            return {
                type: LOGIN_SUCCESS,
                isFetching: false,
                isAuthenticated: true
            }
        }

        

    export const errorLogin = (booking) => {
            
            return (dispatch, getState) => {
                
            }
    }

    

    export const userLogin = (auth) => {
        
            return (dispatch, getState) => {
                dispatch(requestLogin());
                
                auth.handleAuthentication();
                if (auth.isAuthenticated()) {
                    dispatch(receiveLogin())
                } 
            }
        }
