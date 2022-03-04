import axios from 'axios'
import {
    LOCATION_LIST_REQUEST,
    LOCATION_LIST_SUCCESS,
    LOCATION_LIST_FAIL,

    LOCATION_CREATE_REQUEST,
    LOCATION_CREATE_SUCCESS,
    LOCATION_CREATE_FAIL,

    LOCATION_EDIT_REQUEST,
    LOCATION_EDIT_SUCCESS,
    LOCATION_EDIT_FAIL,

    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAIL,
    LOCATION_LIST_RESET,

    LOCATION_EDIT_UPLOAD_IMAGE_REQUEST,
    LOCATION_EDIT_UPLOAD_IMAGE_SUCCESS,
    LOCATION_EDIT_UPLOAD_IMAGE_FAIL,

    LOCATION_CREATE_UPLOAD_IMAGE_REQUEST,
    LOCATION_CREATE_UPLOAD_IMAGE_SUCCESS,
    LOCATION_CREATE_UPLOAD_IMAGE_FAIL,
} from '../constants/LocationConstans'


export const editLocationUploadImage = (formData) => async (dispatch) => {

    try{
        dispatch({
            type: LOCATION_EDIT_UPLOAD_IMAGE_REQUEST
        })

        const config = {
        headers: {
            'Content-Type':'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/location/upload/', formData, config)

        dispatch({
            type: LOCATION_EDIT_UPLOAD_IMAGE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: LOCATION_EDIT_UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listLocation = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOCATION_LIST_REQUEST
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
            `/api/locations/`,
            config
        )
        
        dispatch({
            type: LOCATION_LIST_SUCCESS,
            payload: data,
        })

        localStorage.setItem('listLocation', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: LOCATION_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const resetLocations = () => (dispatch) =>{
    dispatch({type: LOCATION_LIST_RESET})
}

export const getLocationDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOCATION_DETAILS_REQUEST
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
            `/api/location/${id}`,
            config
        )

        dispatch({
            type: LOCATION_DETAILS_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: LOCATION_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createLocation = (location) => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOCATION_CREATE_REQUEST
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
            '/api/locations/create/',
            location,
            config
        )

        dispatch({
            type: LOCATION_CREATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: LOCATION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateLocation = (location) => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOCATION_EDIT_REQUEST
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
            `/api/location/update/${location.id}/`,
            location,
            config
        )

        dispatch({
            type: LOCATION_EDIT_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: LOCATION_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createLocatisationUploadImage = (formData) => async (dispatch) => {

    try{
        dispatch({
            type: LOCATION_CREATE_UPLOAD_IMAGE_REQUEST
        })

        const config = {
        headers: {
            'Content-Type':'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/new/location/upload/', formData, config)

        dispatch({
            type: LOCATION_CREATE_UPLOAD_IMAGE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: LOCATION_CREATE_UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

