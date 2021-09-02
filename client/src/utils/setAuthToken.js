import axios from 'axios';

const setAuthToken = (token) =>{
    if(token){
        axios.defaults.headers.common['X-AUTH-TOKEN'] = token;
        localStorage.setItem('token', token);
    } else{
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['X-AUTH-TOKEN'];
    }
}

export default setAuthToken;