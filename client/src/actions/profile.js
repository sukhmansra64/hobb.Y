import {setAlert} from './alert';
import {ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR} from "./types";
import axios from 'axios';

//get profile
export const getCurrentProfile = () => async dispatch =>{
    try{
        const res = await axios.get("/api/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(err){
        dispatch({
           type: PROFILE_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//get all profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    try{
        const res = await axios.get('/api/profile/user');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(err){
        dispatch({
           type: PROFILE_ERROR,
           payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

//get a user's profile by ID
export const getProfileByID = userID => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    try{
        const res = await axios.get(`/api/profile/user/${userID}`);

        dispatch({type: GET_PROFILE, payload: res.data});
    }catch(err){
        dispatch({
           type: PROFILE_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//create or update a profile

export const createProfile = (formData, history, edit = false) => async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile',formData,config);

        dispatch({type: GET_PROFILE, payload: res.data});

        dispatch(setAlert(edit ? 'Profile Updated.' : 'Profile Created.','success'));

        if(!edit){
            history.push('/dashboard');
        }
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type: PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

//delete your profile

export const deleteProfile = () => async dispatch =>{
    if(window.confirm("Are you sure? This action CANNOT be undone.")){
        try {
            await axios.delete('/api/profile');

            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETED});

            dispatch(setAlert('Your account has been permanently deleted.'));
        }catch (err){
            dispatch({
               type: PROFILE_ERROR,
               payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}