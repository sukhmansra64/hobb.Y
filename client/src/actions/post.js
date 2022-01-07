import axios from 'axios';
import {setAlert} from "./alert";
import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST} from "./types";

export const getPosts = () => async dispatch =>{
    try{
        const res = await axios.get('/api/posts/all');
        dispatch({type:GET_POSTS, payload: res.data});
    }catch(err){
        dispatch({type: POST_ERROR,payload:{msg:err.response.statusText, type:err.response.status}});
    }
}

export const likePost = id => async dispatch =>{
    try{
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
           type: UPDATE_LIKES,
           payload: {id,likes: res.data}
        });
    }catch(err){
        dispatch({
           type: POST_ERROR,
           payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const unlikePost = id => async dispatch =>{
    try{
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id,likes: res.data}
        });
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const deletePost = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: {id}
        });
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}