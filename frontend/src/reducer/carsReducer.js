import {
    CARS_LIST_REQUEST,
    CARS_LIST_SUCCESS,
    CARS_LIST_FAIL,
    CARS_LIST_RESET,

    CARS_CREATE_REQUEST,
    CARS_CREATE_SUCCESS,
    CARS_CREATE_FAIL,
    CARS_CREATE_RESET,

    CARS_DETAILS_REQUEST,
    CARS_DETAILS_SUCCESS,
    CARS_DETAILS_FAIL,
    CARS_DETAILS_RESET,

    CAR_EDIT_REQUEST,
    CAR_EDIT_SUCCESS,
    CAR_EDIT_FAIL,
    CAR_EDIT_RESET,

    CARS_CREATE_UPLOAD_IMAGE_REQUEST,
    CARS_CREATE_UPLOAD_IMAGE_SUCCESS,
    CARS_CREATE_UPLOAD_IMAGE_FAIL,
    CARS_CREATE_UPLOAD_IMAGE_RESET,

    CARS_EDIT_UPLOAD_IMAGE_REQUEST,
    CARS_EDIT_UPLOAD_IMAGE_SUCCESS,
    CARS_EDIT_UPLOAD_IMAGE_FAIL,
    CARS_EDIT_UPLOAD_IMAGE_RESET,

    CAR_LIST_BY_LOCATION_REQUEST,
    CAR_LIST_BY_LOCATION_SUCCESS,
    CAR_LIST_BY_LOCATION_FAIL,
    CAR_LIST_BY_LOCATION_RESET,

    CAR_RESERVATION_REQUEST,
    CAR_RESERVATION_SUCCESS,
    CAR_RESERVATION_FAIL,
    CAR_RESERVATION_RESET,

    CAR_LIST_RESERVATION_REQUEST,
    CAR_LIST_RESERVATION_SUCCESS,
    CAR_LIST_RESERVATION_FAIL,
    CAR_LIST_RESERVATION_RESET,

    CAR_RESERVATION_DELETE_REQUEST,
    CAR_RESERVATION_DELETE_SUCCESS,
    CAR_RESERVATION_DELETE_FAIL,

    CAR_SINGLE_RESERVATION_REQUEST,
    CAR_SINGLE_RESERVATION_SUCCESS,
    CAR_SINGLE_RESERVATION_FAIL,
    CAR_SINGLE_RESERVATION_RESET,

    CAR_SINGLE_EDIT_RESERVATION_REQUEST,
    CAR_SINGLE_EDIT_RESERVATION_SUCCESS,
    CAR_SINGLE_EDIT_RESERVATION_FAIL,
    CAR_SINGLE_EDIT_RESERVATION_RESET,

    CAR_RENT_CREATE_REQUEST,
    CAR_RENT_CREATE_SUCCESS,
    CAR_RENT_CREATE_FAIL,
    CAR_RENT_CREATE_RESET,
    
    CAR_LIST_RENTS_REQUEST,
    CAR_LIST_RENTS_SUCCESS,
    CAR_LIST_RENTS_FAIL,
    CAR_LIST_RENTS_RESET,

    CAR_RENT_DETAILS_REQUEST,
    CAR_RENT_DETAILS_SUCCESS,
    CAR_RENT_DETAILS_FAIL,
    CAR_RENT_DETAILS_RESET,

    CAR_RENT_UPDATE_REQUEST,
    CAR_RENT_UPDATE_SUCCESS,
    CAR_RENT_UPDATE_FAIL,
    CAR_RENT_UPDATE_RESET,

    CAR_RENT_EDIT_REQUEST,
    CAR_RENT_EDIT_SUCCESS,
    CAR_RENT_EDIT_FAIL,
    CAR_RENT_EDIT_RESET


} from '../constants/CarsConstans'

export const carEditRentReducers = (state = { rent:{} }, action) =>{
    switch(action.type){
        case CAR_RENT_EDIT_REQUEST:
            return { loading: true}

        case CAR_RENT_EDIT_SUCCESS:
            return { loading: false, rent: action.payload}

        case CAR_RENT_EDIT_FAIL:
            return { loading: false, error: action.payload }

        case CAR_RENT_EDIT_RESET:
            return { rent:{} }

        default:
            return state
    }
}


export const carUpdateRentReducers = (state = { rent:{} }, action) =>{
    switch(action.type){
        case CAR_RENT_UPDATE_REQUEST:
            return { loading: true}

        case CAR_RENT_UPDATE_SUCCESS:
            return { loading: false, success: true, rent: action.payload}

        case CAR_RENT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case CAR_RENT_UPDATE_RESET:
            return { rent:{} }

        default:
            return state
    }
}

export const carRentDetailsReducers = (state = {rent:{}}, action) =>{
    switch(action.type){
        case CAR_RENT_DETAILS_REQUEST:
            return { ...state, loading: true}

        case CAR_RENT_DETAILS_SUCCESS:
            return { loading: false, rent: action.payload }

        case CAR_RENT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case CAR_RENT_DETAILS_RESET:
            return { rent: {} }        

        default:
            return state
    }
}


export const carsListRentsReducers = (state = {rents:[]}, action) =>{
    switch(action.type){
        case CAR_LIST_RENTS_REQUEST:
            return { loading: true}

        case CAR_LIST_RENTS_SUCCESS:
            return { loading: false, rents: action.payload }

        case CAR_LIST_RENTS_FAIL:
            return { loading: false, error: action.payload }

        case CAR_LIST_RENTS_RESET:
            return {rents: []}

        default:
            return state
    }
}

export const carRentCreateReducers = (state = {}, action) =>{

    switch(action.type){
        case CAR_RENT_CREATE_REQUEST:
            return { loading: true, success: false }

        case CAR_RENT_CREATE_SUCCESS:
            return { loading: false, success: true, rent: action.payload}

        case CAR_RENT_CREATE_FAIL:
            return { loading: false, success: false, error: action.payload }

        case CAR_RENT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const carUpdateReservationReducers = (state = { reservation:{} }, action) =>{
    switch(action.type){
        case CAR_SINGLE_EDIT_RESERVATION_REQUEST:
            return { loading: true}

        case CAR_SINGLE_EDIT_RESERVATION_SUCCESS:
            return { loading: false, success: true, reservation: action.payload}

        case CAR_SINGLE_EDIT_RESERVATION_FAIL:
            return { loading: false, error: action.payload }

        case CAR_SINGLE_EDIT_RESERVATION_RESET:
            return { reservation:{} }

        default:
            return state
    }
}

export const carSingleReservationReducer = (state = {reservation:{}}, action) =>{
    switch(action.type){
        case CAR_SINGLE_RESERVATION_REQUEST:
            return { ...state, loading: true}

        case CAR_SINGLE_RESERVATION_SUCCESS:
            return { loading: false, reservation: action.payload }

        case CAR_SINGLE_RESERVATION_FAIL:
            return { loading: false, error: action.payload }

        case CAR_SINGLE_RESERVATION_RESET:
            return { reservation: {} }        

        default:
            return state
    }
}


export const ReservationDeleteReducers = (state = {}, action) =>{
    switch(action.type){
        case CAR_RESERVATION_DELETE_REQUEST:
            return { loading: true}

        case CAR_RESERVATION_DELETE_SUCCESS:
            return { loading: false, success: true}

        case CAR_RESERVATION_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const carsListReservationReducers = (state = {reservations:[]}, action) =>{
    switch(action.type){
        case CAR_LIST_RESERVATION_REQUEST:
            return { loading: true}

        case CAR_LIST_RESERVATION_SUCCESS:
            return { loading: false, reservations: action.payload }

        case CAR_LIST_RESERVATION_FAIL:
            return { loading: false, error: action.payload }

        case CAR_LIST_RESERVATION_RESET:
            return {reservations: []}

        default:
            return state
    }
}

export const carReservationCreateReducers = (state = {}, action) =>{

    switch(action.type){
        case CAR_RESERVATION_REQUEST:
            return { loading: true, success: false }

        case CAR_RESERVATION_SUCCESS:
            return { loading: false, success: true, car: action.payload}

        case CAR_RESERVATION_FAIL:
            return { loading: false, success: false, error: action.payload }

        case CAR_RESERVATION_RESET:
            return {}

        default:
            return state
    }
}

export const carsListByLocationReducers = (state = {cars:[]}, action) =>{
    switch(action.type){
        case CAR_LIST_BY_LOCATION_REQUEST:
            return { loading: true}

        case CAR_LIST_BY_LOCATION_SUCCESS:
            return { loading: false, cars: action.payload }

        case CAR_LIST_BY_LOCATION_FAIL:
            return { loading: false, error: action.payload }

        case CAR_LIST_BY_LOCATION_RESET:
            return {cars: []}

        default:
            return state
    }
}

export const carEditUploadImageReducers = (state = {}, action) =>{

    switch(action.type){
        case CARS_EDIT_UPLOAD_IMAGE_REQUEST:
            return { loading: true }

        case CARS_EDIT_UPLOAD_IMAGE_SUCCESS:
            return { loading: false, car: action.payload}

        case CARS_EDIT_UPLOAD_IMAGE_FAIL:
            return { loading: false, error: action.payload }

        case CARS_EDIT_UPLOAD_IMAGE_RESET:
            return {}

        default:
            return state
    }
}

export const carCreateUploadImageReducers = (state = {}, action) =>{

    switch(action.type){
        case CARS_CREATE_UPLOAD_IMAGE_REQUEST:
            return { loading: true }

        case CARS_CREATE_UPLOAD_IMAGE_SUCCESS:
            return { loading: false, car: action.payload}

        case CARS_CREATE_UPLOAD_IMAGE_FAIL:
            return { loading: false, error: action.payload }

        case CARS_CREATE_UPLOAD_IMAGE_RESET:
            return {}

        default:
            return state
    }
}

export const carUpdateReducers = (state = { car:{} }, action) =>{
    switch(action.type){
        case CAR_EDIT_REQUEST:
            return { loading: true}

        case CAR_EDIT_SUCCESS:
            return { loading: false, success: true}

        case CAR_EDIT_FAIL:
            return { loading: false, error: action.payload }

        case CAR_EDIT_RESET:
            return { car:{} }

        default:
            return state
    }
}

export const carDetailsReducers = (state = {car:{}}, action) =>{
    switch(action.type){
        case CARS_DETAILS_REQUEST:
            return { ...state, loading: true}

        case CARS_DETAILS_SUCCESS:
            return { loading: false, car: action.payload }

        case CARS_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case CARS_DETAILS_RESET:
            return { car: {} }        

        default:
            return state
    }
}

export const carsListReducers = (state = {cars:[]}, action) =>{
    switch(action.type){
        case CARS_LIST_REQUEST:
            return { loading: true}

        case CARS_LIST_SUCCESS:
            return { loading: false, cars: action.payload }

        case CARS_LIST_FAIL:
            return { loading: false, error: action.payload }

        case CARS_LIST_RESET:
            return {cars: []}

        default:
            return state
    }
}

export const carCreateReducers = (state = {}, action) =>{

    switch(action.type){
        case CARS_CREATE_REQUEST:
            return { loading: true, success: false }

        case CARS_CREATE_SUCCESS:
            return { loading: false, success: true, car: action.payload}

        case CARS_CREATE_FAIL:
            return { loading: false, success: false, error: action.payload }

        case CARS_CREATE_RESET:
            return {}

        default:
            return state
    }
}

