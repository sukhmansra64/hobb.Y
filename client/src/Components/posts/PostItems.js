import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {likePost,unlikePost, deletePost} from "../../actions/post";

const PostItems = ({auth, post:{_id, text, name, avatar, user, likes, comments, date}, likePost, unlikePost, deletePost, showActions}) => {
    return (
        <div>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/user/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {showActions && <>
                        <button type="button" className="btn btn-light" onClick={e=> likePost(_id)}>
                            <i className="fas fa-thumbs-up"></i>
                            <span>{likes.length>0 ? likes.length : ''}</span>
                        </button>
                        <button type="button" className="btn btn-light" onClick={e=> unlikePost(_id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary">
                            Discussion {comments.length>0 ? <span className='comment-count'>{comments.length}</span> : null}
                        </Link>
                        {!auth.loading && user === auth.user._id && <button
                            type="button"
                            className="btn btn-danger"
                            onClick={e => {deletePost(_id);}}
                        >
                            <i className="fas fa-times"></i>
                        </button>}
                    </>}
                </div>
        </div>
        </div>
    );
};

PostItems.defaultProps = {
    showActions: true
}

PostItems.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps, {likePost, unlikePost, deletePost})(PostItems);
