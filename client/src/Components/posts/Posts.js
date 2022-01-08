import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItems from "./PostItems";
import PostForm from "./PostForm";

let count = 0;

const Posts = ({post:{posts,loading},getPosts}) => {
    useEffect(()=>{
        getPosts();
    },[getPosts, count]);
    if(count===0&&posts.length===0){
        count++;
    }
    return (
        <>
            {loading ? <Spinner/> : <>
                <h1 className='large text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa-user'/> Welcome to the hobb.Y community
                </p>
                <PostForm/>
                <div className='posts'>
                    {posts.map((post)=>(
                        <PostItems key={post._id} post={post}/>
                    ))}
                </div>
            </>}
        </>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
