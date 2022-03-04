import axios from 'axios'
import {
    CARS_LIST_REQUEST,
    CARS_LIST_SUCCESS,
    CARS_LIST_FAIL,

    CARS_CREATE_REQUEST,
    CARS_CREATE_SUCCESS,
    CARS_CREATE_FAIL,

    CARS_DETAILS_REQUEST,
    CARS_DETAILS_SUCCESS,
    CARS_DETAILS_FAIL,

    CAR_EDIT_REQUEST,
    CAR_EDIT_SUCCESS,
    CAR_EDIT_FAIL,

    CARS_CREATE_UPLOAD_IMAGE_REQUEST,
    CARS_CREATE_UPLOAD_IMAGE_SUCCESS,
    CARS_CREATE_UPLOAD_IMAGE_FAIL,

    CARS_EDIT_UPLOAD_IMAGE_REQUEST,
    CARS_EDIT_UPLOAD_IMAGE_SUCCESS,
    CARS_EDIT_UPLOAD_IMAGE_FAIL,

    CAR_LIST_BY_LOCATION_REQUEST,
    CAR_LIST_BY_LOCATION_SUCCESS,
    CAR_LIST_BY_LOCATION_FAIL,

    CAR_RESERVATION_REQUEST,
    CAR_RESERVATION_SUCCESS,
    CAR_RESERVATION_FAIL,

    CAR_LIST_RESERVATION_REQUEST,
    CAR_LIST_RESERVATION_SUCCESS,
    CAR_LIST_RESERVATION_FAIL,

    CAR_LIST_RENTS_REQUEST,
    CAR_LIST_RENTS_SUCCESS,
    CAR_LIST_RENTS_FAIL,

    CAR_RESERVATION_DELETE_REQUEST,
    CAR_RESERVATION_DELETE_SUCCESS,
    CAR_RESERVATION_DELETE_FAIL,

    CAR_SINGLE_RESERVATION_REQUEST,
    CAR_SINGLE_RESERVATION_SUCCESS,
    CAR_SINGLE_RESERVATION_FAIL,

    CAR_SINGLE_EDIT_RESERVATION_REQUEST,
    CAR_SINGLE_EDIT_RESERVATION_SUCCESS,
    CAR_SINGLE_EDIT_RESERVATION_FAIL,

    CAR_RENT_CREATE_REQUEST,
    CAR_RENT_CREATE_SUCCESS,
    CAR_RENT_CREATE_FAIL,
    
    CAR_RENT_DETAILS_REQUEST,
    CAR_RENT_DETAILS_SUCCESS,
    CAR_RENT_DETAILS_FAIL,

    CAR_RENT_UPDATE_REQUEST,
    CAR_RENT_UPDATE_SUCCESS,
    CAR_RENT_UPDATE_FAIL,

    CAR_RENT_EDIT_REQUEST,
    CAR_RENT_EDIT_SUCCESS,
    CAR_RENT_EDIT_FAIL,    

} from '../constants/CarsConstans'

export const updateCarRent = (rent) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RENT_EDIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/rent/edit/${rent.id}/`,
            rent,
            config
        )

        dispatch({
            type: CAR_RENT_EDIT_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RENT_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const carUpdateRentbyId = (ren) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RENT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/rent/update/${ren.id}/`,
            ren,
            config
        )

        dispatch({
            type: CAR_RENT_UPDATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getRentDetailsByCarId = (carId) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RENT_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/${carId}/rent-details`,
            config
        )

        dispatch({
            type: CAR_RENT_DETAILS_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RENT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createRent = (rent) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RENT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/rent/car/create/',
            rent,
            config
        )

        dispatch({
            type: CAR_RENT_CREATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}





export const updateCarReservation = (res) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_SINGLE_EDIT_RESERVATION_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/reservation/update/${res.id}/`,
            res,
            config
        )

        dispatch({
            type: CAR_SINGLE_EDIT_RESERVATION_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_SINGLE_EDIT_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const getCarSingleReservation = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_SINGLE_RESERVATION_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/car/single/reservation/${id}/edit`,
            config
        )

        dispatch({
            type: CAR_SINGLE_RESERVATION_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_SINGLE_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteReservation = (delReserv) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RESERVATION_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/reservation/delete/${delReserv.id}/`,
            delReserv,
            config
        )

        dispatch({
            type: CAR_RESERVATION_DELETE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RESERVATION_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createReservation = (car) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_RESERVATION_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/reservation/car/create/',
            car,
            config
        )

        dispatch({
            type: CAR_RESERVATION_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const getCarsListByLocation = (obj) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_LIST_BY_LOCATION_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/mainpage/${obj.locationId}/car-list/${obj.listName}`,
            config
        )

        dispatch({
            type: CAR_LIST_BY_LOCATION_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_LIST_BY_LOCATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const updateCar = (car) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_EDIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/car/update/${car.id}/`,
            car,
            config
        )

        dispatch({
            type: CAR_EDIT_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: CAR_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const getCarDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CARS_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/car/${id}`,
            config
        )

        dispatch({
            type: CARS_DETAILS_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CARS_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listOfCarOfReservations = (car) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_LIST_RESERVATION_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/reservation/list/car/${car.carId}/${car.locationId}`,
            config
        )

        dispatch({
            type: CAR_LIST_RESERVATION_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CAR_LIST_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listOfCarOfRents = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CAR_LIST_RENTS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/rents/list/car/${id}`,
            config
        )

        dispatch({
            type: CAR_LIST_RENTS_SUCCESS,
            payload: data,
        })
        
        console.log('data list Rents', data)

    }catch(error){
        dispatch({
            type: CAR_LIST_RENTS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listOfCars = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: CARS_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/cars/`,
            config
        )

        dispatch({
            type: CARS_LIST_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CARS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createCar = (car) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CARS_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/car/create/',
            car,
            config
        )

        dispatch({
            type: CARS_CREATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CARS_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createCarUploadImage = (formData) => async (dispatch) => {

    try{
        dispatch({
            type: CARS_CREATE_UPLOAD_IMAGE_REQUEST
        })

        const config = {
        headers: {
            'Content-Type':'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/new/cars/upload/', formData, config)

        dispatch({
            type: CARS_CREATE_UPLOAD_IMAGE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CARS_CREATE_UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const editCarUploadImage = (formData) => async (dispatch) => {

    try{
        dispatch({
            type: CARS_EDIT_UPLOAD_IMAGE_REQUEST
        })

        const config = {
        headers: {
            'Content-Type':'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/cars/image/upload/', formData, config)

        dispatch({
            type: CARS_EDIT_UPLOAD_IMAGE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: CARS_EDIT_UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}




