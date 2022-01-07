import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from "../../actions/post";

const Posts = ({post:{posts,loading},getPosts}) => {
    useEffect(()=>{
        getPosts();
    },[]);
    return (
        <div>
            Hello world
        </div>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
