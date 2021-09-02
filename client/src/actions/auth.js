import {setAlert} from "./alert";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR} from "./types";
import axios from "axios";

//register user
export const register = formData => async dispatch => {
    try {
        const res = await axios.post('/api/users', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: REGISTER_SUCCESS, payload: res.data})
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: REGISTER_FAIL});
    }
}

//load user
export const loadUser = () => async dispatch =>{
    try{
        const res = await axios.get('/api/auth');

        dispatch({type: USER_LOADED, payload: res.data});
    }catch(err){
        console.log(err.response.data);
        dispatch({type: AUTH_ERROR});
        localStorage.removeItem('token');
    }

}


