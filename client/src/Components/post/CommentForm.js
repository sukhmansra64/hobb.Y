import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addComment} from "../../actions/post";
import PropTypes from 'prop-types';

const CommentForm = ({addComment, postID}) => {
    const [text, setTextForm] = useState('');
    const onSubmit = (e) =>{
        e.preventDefault();
        addComment({id: postID, formData: {text}});
        setTextForm('');
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Add a comment</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>onSubmit(e)}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
              value={text}
              onChange={(e)=>setTextForm(e.target.value.toString())}
          />
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired
};

export default connect(null,{addComment})(CommentForm);
