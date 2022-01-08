import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPost} from "../../actions/post";
import PostItems from "../posts/PostItems";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

let counter = 0;

const Posts = ({post:{post, loading} , getPost}) => {
    const {id} = useParams();
    useEffect(()=>{
        getPost(id)
    },[getPost,id,counter]);
    if(counter===0&&!post){
        counter++;
    }
    return (
        <>
            <Link className='btn' to='/posts'>Back</Link>
            {loading || post === null ? <Spinner/> : <>
                <PostItems post={post} showActions={false}/>
                <CommentForm postID={post._id}/>
                <div className='comments'>
                    {post.comments.map((comment => (
                        <CommentItem key={comment._id} postID={post._id} comment={comment}/>
                    )))}
                </div>
            </>}
        </>
    );
};

Posts.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
   post: state.post
});

export default connect(mapStateToProps,{getPost})(Posts);
