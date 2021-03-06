import axios from 'axios'
import {setAlert} from '../actions/alert'
import{
    GET_PROFILE,
    PROFILE_ERROR,
    SET_PROFILE_IMAGE,
    GET_PROFILE_BY_ID

} from '../actions/constants'


// Get current users profile

export const getProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        // dispatch(setAlert(edit ? 'Profile Updated' : "Profile Created"))
        // if(!edit){
        //     history.push('/dashboard')
        // }
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addProfileImage = (data) => async dispatch =>{

    
    
    try {

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dnf1divya/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        console.log(file)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put('/api/profile/upload', {file: file.secure_url}, config)
        console.log(response.data)
        dispatch({
            type: SET_PROFILE_IMAGE,
            payload: file.secure_url
        })
      
        dispatch(setAlert("Profile Image Added",'success'))
   
            
        
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Get profile by ID
export const getProfileById = (userID) => async dispatch =>{
    
    try {
        const res = await axios.get(`/api/profile/user/${userID}`);
        dispatch({
            type: GET_PROFILE_BY_ID,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}