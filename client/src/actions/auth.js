import {setAlert} from "./alert";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//register user
export const register = formData => async dispatch => {
    try {
        const res = await axios.post('/api/users', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: REGISTER_SUCCESS, payload: res.data})
        setAuthToken(res.data.token);
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: REGISTER_FAIL});
        setAuthToken();
    }
}

//load user
export const loadUser = () => async dispatch =>{
    try{
        const res = await axios.get('/api/auth');

        dispatch({type: USER_LOADED, payload: res.data});
    }catch(err){
        dispatch({type: AUTH_ERROR});
    }
}

//login user
export const login = (email,password) => async dispatch => {
    try {
        const res = await axios.post('/api/auth', {email, password}, {headers: {'Content-Type': 'application/json'}});
        setAuthToken(res.data.token)
        dispatch({type: LOGIN_SUCCESS, payload: res.data})
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        setAuthToken();
        dispatch({type: LOGIN_FAIL});
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE});
};


