import axios from 'axios';
import {setAlert} from "./alert";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from "./types";

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
        await axios.delete(`/api/posts/${id}`);
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

export const addPost = formData => async dispatch =>{
    const config = {
    headers: {
        'Content-Type' : 'application/json'
    }}
    try{
        const res = await axios.post('/api/posts/',formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post created successfully', 'success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getPost = id => async dispatch =>{
    try{
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({type:GET_POST, payload: res.data});
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const addComment = ({id,formData}) => async dispatch =>{
    const config={headers:{"Content-Type":"application/json"}};
    try{
        const res = await axios.post(`/api/posts/comment/${id}`, formData, config);

        dispatch({type: ADD_COMMENT, payload: res.data});
        dispatch(setAlert('Comment added.','success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const deleteComment = ({id,commentId}) => async dispatch =>{
    try{
        await axios.delete(`/api/posts/comment/${id}/${commentId}`);

        dispatch({type: DELETE_COMMENT, payload: commentId});
        dispatch(setAlert('Comment deleted.','success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}